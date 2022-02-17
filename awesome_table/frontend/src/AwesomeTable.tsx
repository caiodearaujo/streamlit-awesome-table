import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { ReactNode } from "react"

interface State {
  selected_row: any
}

/**
 * This is a React-based component template. The `render()` function is called
 * automatically when your component should be re-rendered.
 */
class AwesomeTable extends StreamlitComponentBase<State> {
  public state = { selected_row: {} }

  public render = (): ReactNode => {
    // Arguments that are passed to the plugin in Python are accessible
    // via `this.props.args`. Here, we access the "name" arg.
    const data = JSON.parse(this.props.args["data"])
    const columns = this.props.args["columns"]
    console.log(columns)

    // Streamlit sends us a theme object via props that we can use to ensure
    // that our component has visuals that match the active theme in a
    // streamlit app.
    const { theme } = this.props
    const style: React.CSSProperties = {}

    return (
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            {columns.map((column: any) => {
              console.log(column)
              if(column.show){
                return <th scope="col">{column.label}</th>
              }
            })}
          </thead>
          <tbody>
            {data.data.map((data: any) => {
              const ICONBUTTON = {
                display: "inline-block",
                "font-size": "1.25rem",
                color: "#212529",
                cursor: "pointer",
                "user-select": "none",
                padding: "0.5rem 1rem",
              }

              const ICONBUTTON_DISABLED = {
                display: "inline-block",
                "font-size": "1.25rem",
                color: "#dddddd",
                cursor: "default",
                "user-select": "none",
                padding: "0.5rem 1rem",
              }

              const IMAGE = {
                height: 50,
              }
              return (
                <tr>
                  {columns.map((column: any) => {
                    if (column.show) {
                      if (column.dtype === "STRING") {
                        if (column.switchcase) {
                          return <td>{column.switchcase[data[column.name]]}</td>
                        }else{
                          return <td>{data[column.name]}</td>
                        }
                      }
                      if (column.dtype === "ICONBUTTON") {
                        return !data[column.name] ||
                          data[column.name] === "" ? (
                          <td className="align-middle text-center">
                            <i
                              style={ICONBUTTON_DISABLED}
                              className={column.icon}
                            ></i>
                          </td>
                        ) : (
                          <td className="align-middle text-center">
                            <a
                              href={data[column.name]}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i style={ICONBUTTON} className={column.icon}></i>
                            </a>
                          </td>
                        )
                      } else if (column.dtype === "DOWNLOAD") {
                        return !data[column.name] ||
                          data[column.name] === "" ? (
                          <td className="align-middle text-center">
                            <i
                              style={ICONBUTTON_DISABLED}
                              className="fa-solid fa-cloud-arrow-down"
                            ></i>
                          </td>
                        ) : (
                          <td className="align-middle text-center">
                            <a
                              href={data[column.name]}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i
                                style={ICONBUTTON}
                                className="fa-solid fa-cloud-arrow-down"
                              ></i>
                            </a>
                          </td>
                        )
                      } else if (column.dtype === "LINK") {
                        return !data[column.name] ||
                          data[column.name] === "" ? (
                          <td className="align-middle text-center">
                            <i
                              style={ICONBUTTON_DISABLED}
                              className="fa-solid fa-up-right-from-square"
                            ></i>
                          </td>
                        ) : (
                          <td className="align-middle text-center">
                            <a
                              href={data[column.name]}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i
                                style={ICONBUTTON}
                                className="fa-solid fa-up-right-from-square"
                              ></i>
                            </a>
                          </td>
                        )
                      } else if (column.dtype === "IMAGE") {
                        return !data[column.name] ||
                          data[column.name] === "" ? (
                          <td className="align-middle text-center"></td>
                        ) : (
                          <td className="align-middle text-center">
                            <img
                              style={IMAGE}
                              src={data[column.name]}
                              alt={column.name}
                            />
                          </td>
                        )
                      } else if (column.dtype === "SET_STATE") {
                        const icon =
                          !data[column.icon] || data[column.icon] === ""
                            ? "fa-solid fa-eye"
                            : data[column.icon]
                        return (
                          <td className="align-middle text-center">
                            <i
                              style={ICONBUTTON}
                              className={icon}
                              onClick={() => this.onClicked(data)}
                            ></i>
                          </td>
                        )
                      }
                      return <td></td>
                    }
                  }, this)}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  private onClicked = (data: any): void => {
    this.setState(
      (prevState) => ({ selected_row: data }),
      () => Streamlit.setComponentValue(this.state.selected_row)
    )
  }
}

// "withStreamlitConnection" is a wrapper function. It bootstraps the
// connection between your component and the Streamlit app, and handles
// passing arguments from Python -> Component.
//
// You don't need to edit withStreamlitConnection (but you're welcome to!).
export default withStreamlitConnection(AwesomeTable)
