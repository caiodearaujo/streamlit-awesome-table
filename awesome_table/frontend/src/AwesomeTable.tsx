import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { ReactNode } from "react"

interface State {
  numClicks: number
  isFocused: boolean
}

/**
 * This is a React-based component template. The `render()` function is called
 * automatically when your component should be re-rendered.
 */
class AwesomeTable extends StreamlitComponentBase<State> {
  public state = { numClicks: 0, isFocused: false }

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

    // Maintain compatibility with older versions of Streamlit that don't send
    // a theme object.
    if (theme) {
      // Use the theme object to style our button border. Alternatively, the
      // theme style is defined in CSS vars.
      const borderStyling = `1px solid ${
        this.state.isFocused ? theme.primaryColor : "gray"
      }`
      style.border = borderStyling
      style.outline = borderStyling
    }

    // Show a button and some text.
    // When the button is clicked, we'll increment our "numClicks" state
    // variable, and send its new value back to Streamlit, where it'll
    // be available to the Python program.
    return (
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            {
              columns.map((column: any) => {
                return(
                <th scope="col">{column.label}</th>
              )
            })}
          </thead>
          <tbody>
            {data.data.map((data: any) => {
              const ICONBUTTON = {
                  "display": "inline-block",
                  "font-size": "1.25rem",
                  "color": "#212529",
                  "cursor": "pointer",
                  "user-select": "none",
                  "padding": "0.5rem 1rem"
              }
              const IMAGE = {
                "height": 50,
              }
              return (
                <tr>{
                    columns.map((column: any) => {
                      if(column.dtype === "STRING") {
                        return (
                          <td>{data[column.name]}</td>
                        )
                      }
                      if(column.dtype === "ICONBUTTON") {
                        return (
                          <td>
                            <a href={data[column.name]} target="_blank" rel="noopener noreferrer"><i style={ICONBUTTON} className={column.icon}></i></a>
                          </td>
                        )
                      }
                      if(column.dtype === "DOWNLOAD") {
                        return (
                          <td className="align-middle text-center"><a href={data[column.name]} target="_blank" rel="noopener noreferrer"><i style={ICONBUTTON} className="fa-solid fa-cloud-arrow-down"></i></a></td>
                        )
                      }
                      if(column.dtype === "LINK") {
                        return (
                          <td className="align-middle text-center"><a href={data[column.name]} target="_blank" rel="noopener noreferrer"><i style={ICONBUTTON} className="fa-solid fa-up-right-from-square"></i></a></td>
                        )
                      }
                      if(column.dtype === "IMAGE") {
                        return(
                          <td className="align-middle text-center"><img style={IMAGE} src={data[column.name]} alt={column.name}/></td>
                        )
                    }
                    return (<td></td>)
                  }, this)}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
  }

  /** Click handler for our "Click Me!" button. */
  private onClicked = (): void => {
    // Increment state.numClicks, and pass the new value back to
    // Streamlit via `Streamlit.setComponentValue`.
    this.setState(
      prevState => ({ numClicks: prevState.numClicks + 1 }),
      () => Streamlit.setComponentValue(this.state.numClicks)
    )
  }

  /** Focus handler for our "Click Me!" button. */
  private _onFocus = (): void => {
    this.setState({ isFocused: true })
  }

  /** Blur handler for our "Click Me!" button. */
  private _onBlur = (): void => {
    this.setState({ isFocused: false })
  }
}

// "withStreamlitConnection" is a wrapper function. It bootstraps the
// connection between your component and the Streamlit app, and handles
// passing arguments from Python -> Component.
//
// You don't need to edit withStreamlitConnection (but you're welcome to!).
export default withStreamlitConnection(AwesomeTable)
