# Awesome Table for Streamlit

---

Awesome table is a component to use with (Streamlit)[https://github.com/streamlit/streamlit] with order and search components.

### **AwesomeTable**

| Parameter                               | Type                      | Default          | Description                                                                                   |
| --------------------------------------- | ------------------------- | ---------------- | --------------------------------------------------------------------------------------------- |
| data                                    | Pandas DataFrame          |                  | For JSON nested, use pandas.json_normalize(JSON))                                             |
| columns (optional)                      | list[Column] or list[str] | []               | List of Columns or List of str with columns that will be get to dataframe and show in table[] |
| show_order (optional)                   | Bool                      | False            | If True a component with order will be displayed                                              |
| show_search (optional)                  | Bool                      | False            | If True a component with search will be displayed                                             |
| show_search_order_in_sidebar (optional) | Bool                      | False            | If True the search and orders components are will be displayed in sidebar                     |
| key (optional)                          | str                       | 'awesome_table'' | Key of the component.                                                                         |

### Column

name, label=None, switchcase=None, dtype: ColumnDType = ColumnDType.STRING, icon=None, show=True

| Parameter             | Type        | Default            | Description                                                                                                                                                                                                                        |
| --------------------- | ----------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name                  | str         |                    | Name of the column (index pandas)                                                                                                                                                                                                  |
| label (optional)      | str         | None               | Name for the header on table                                                                                                                                                                                                       |
| switchcase (optional) | {key:value} | None               | If you want change the value.<br />Example: {'IN_PROGRESS':'In Progress', 'WAIT_PROCESSING':'Wait Processing'}                                                                                                                     |
| dtype (optional)      | ColumnDType | ColumnDType.STRING | Type of the column for change in table.<br />ColumnDType have these options:<br />ColumnDType.STRING<br />ColumnDType.ICONBUTTON<br />ColumnDType.DOWNLOAD<br />ColumnDType.IMAGE<br />ColumnDType.LINK<br />ColumnDType.SET_STATE |
| icon (optional)       | str         | None               | Icon from font-awesome; Example: ''fa-solid fa-eye''                                                                                                                                                                               |
| show (optional)       | Bool        | True               | If you want show this column or not                                                                                                                                                                                                |

**Create a simple table**

```
import pandas as pd
from awesome_table import AwesomeTable

sample_data = {...}

AwesomeTable(pd.json_normalize(sample_data))
```

![Simple Table w/ AwesomeTable](/samples/simple_table/awesome-table-simple.png)

## **Create a table with columns**

```
import pandas as pd
from awesome_table import AwesomeTable
from awesome_table.columns import Column

sample_data = {...}

AwesomeTable(pd.json_normalize(sample_data), columns=[
    Column(name='id', label='ID'),
    Column(name='name', label='Name'),
    Column(name='job_title', label='Job Title'),
    Column(name='avatar', label='Avatar'),
    Column(name='_url.social_media', label='Social Media'),
    Column(name='_url.document', label='Document'),
])
```

![Simple Table w/ AwesomeTable](/samples/with_columns/awesome-table-with-columns.png)

## **Create a table with icon button**

```
import pandas as pd
from awesome_table import AwesomeTable
from awesome_table.columns import (Column, ColumnDType)

sample_data = {...}

AwesomeTable(pd.json_normalize(sample_data), columns=[
    Column(name='id', label='ID'),
    Column(name='name', label='Name'),
    Column(name='job_title', label='Job Title'),
    Column(name='avatar', label='Avatar'),
    Column(name='_url.social_media', label='Social Media', dtype=ColumnDType.ICONBUTTON, icon='fa-solid fa-share-nodes'), ## From FontAwesome v6.0.0
    Column(name='_url.document', label='Document', dtype=ColumnDType.DOWNLOAD),
])
```

![Simple Table w/ AwesomeTable](/samples/with_iconbutton/awesome-table-with-iconbutton.png)

## **Create a table with order**

```
import pandas as pd
from awesome_table import AwesomeTable
from awesome_table.columns import (Column, ColumnDType)

sample_data = {...}

AwesomeTable(pd.json_normalize(sample_data), columns=[
    Column(name='id', label='ID'),
    Column(name='name', label='Name'),
    Column(name='job_title', label='Job Title'),
    Column(name='avatar', label='Avatar'),
    Column(name='_url.social_media', label='Social Media', dtype=ColumnDType.ICONBUTTON, icon='fa-solid fa-share-nodes'), ## From FontAwesome v6.0.0
    Column(name='_url.document', label='Document', dtype=ColumnDType.DOWNLOAD),
], show_order=True)
```

![Simple Table w/ AwesomeTable](/samples/with_order/awesome-table-with-order.png)

## **Create a table with search**

```
import pandas as pd
from awesome_table import AwesomeTable
from awesome_table.columns import (Column, ColumnDType)

sample_data = {...}

AwesomeTable(pd.json_normalize(sample_data), columns=[
    Column(name='id', label='ID'),
    Column(name='name', label='Name'),
    Column(name='job_title', label='Job Title'),
    Column(name='avatar', label='Avatar'),
    Column(name='_url.social_media', label='Social Media', dtype=ColumnDType.ICONBUTTON, icon='fa-solid fa-share-nodes'), ## From FontAwesome v6.0.0
    Column(name='_url.document', label='Document', dtype=ColumnDType.DOWNLOAD),
], show_search=True)
```

![Simple Table w/ AwesomeTable](/samples/with_search/awesome-table-with-search.png)

## **Create a table with sidebar**

```
import pandas as pd
from awesome_table import AwesomeTable
from awesome_table.columns import (Column, ColumnDType)

sample_data = {...}

AwesomeTable(pd.json_normalize(sample_data), columns=[
    Column(name='id', label='ID'),
    Column(name='name', label='Name'),
    Column(name='job_title', label='Job Title'),
    Column(name='avatar', label='Avatar'),
    Column(name='_url.social_media', label='Social Media', dtype=ColumnDType.ICONBUTTON, icon='fa-solid fa-share-nodes'), ## From FontAwesome v6.0.0
    Column(name='_url.document', label='Document', dtype=ColumnDType.DOWNLOAD),
], show_order=True, show_search=True, show_search_order_in_sidebar=True)
```

![Simple Table w/ AwesomeTable](/samples/with_sidebar/awesome-table-with-sidebar.png)

## **Create a table with image**

```
import pandas as pd
from awesome_table import AwesomeTable
from awesome_table.columns import (Column, ColumnDType)

sample_data = {...}

AwesomeTable(pd.json_normalize(sample_data), columns=[
    Column(name='id', label='ID'),
    Column(name='name', label='Name'),
    Column(name='job_title', label='Job Title'),
    Column(name='avatar', label='Avatar', dtype=ColumnDType.IMAGE),
    Column(name='_url.social_media', label='Social Media', dtype=ColumnDType.ICONBUTTON, icon='fa-solid fa-share-nodes'), ## From FontAwesome v6.0.0
    Column(name='_url.document', label='Document', dtype=ColumnDType.DOWNLOAD),
], show_search=True, show_order=True)
```

![Simple Table w/ AwesomeTable](/samples/with_image/awesome-table-with-image.png)
