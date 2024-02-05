# Awesome Table for Streamlit

---

Awesome table is a component to use with [Streamlit](https://github.com/streamlit/streamlit) with order and search components.

## Installing AwesomeTable using PiP
```
pip install streamlit-awesome-table
```

## Examples
### **Create a simple table**
[View complete source here](/samples/simple_table/__init__.py)

```
import pandas as pd
from awesome_table import AwesomeTable

sample_data = {...}

AwesomeTable(pd.json_normalize(sample_data))
```
![Simple Table w/ AwesomeTable](/samples/simple_table/awesome-table-simple.png)

### **Create a table with columns**
[View complete source here](/samples/with_columns/__init__.py)

```
import pandas as pd
from awesome_table import AwesomeTable
from awesome_table.column import Column

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

### **Create a table with icon button**
[View complete source here](/samples/with_iconbutton/__init__.py)

```
import pandas as pd
from awesome_table import AwesomeTable
from awesome_table.column import (Column, ColumnDType)

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

### **Create a table with order**
[View complete source here](/samples/with_order/__init__.py)

```
import pandas as pd
from awesome_table import AwesomeTable
from awesome_table.column import (Column, ColumnDType)

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

### **Create a table with search**
[View complete source here](/samples/with_search/__init__.py)

```
import pandas as pd
from awesome_table import AwesomeTable
from awesome_table.column import (Column, ColumnDType)

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

### **Create a table with sidebar**
[View complete source here](/samples/with_sidebar/__init__.py)

```
import pandas as pd
from awesome_table import AwesomeTable
from awesome_table.column import (Column, ColumnDType)

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

### **Create a table with image**
[View complete source here](/samples/with_image/__init__.py)

```
import pandas as pd
from awesome_table import AwesomeTable
from awesome_table.column import (Column, ColumnDType)

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
