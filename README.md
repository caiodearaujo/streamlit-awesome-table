# Awesome Table for Streamlit

---

Awesome table is a component to use with (Streamlit)[https://github.com/streamlit/streamlit] with order and search components.


## **Create a simple table**

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