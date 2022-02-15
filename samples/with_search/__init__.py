import pandas as pd
import streamlit as st
from awesome_table import AwesomeTable
from awesome_table.column import (Column, ColumnDType)
from sample import data as sample_data

st.set_page_config(page_title='AwesomeTable by @caiofaar', page_icon='📊', layout='wide')
st.title('AwesomeTable with Search')

AwesomeTable(pd.json_normalize(sample_data), columns=[
    Column(name='id', label='ID'),
    Column(name='name', label='Name'),
    Column(name='job_title', label='Job Title'),
    Column(name='avatar', label='Avatar'),
    Column(name='_url.social_media', label='Social Media', dtype=ColumnDType.ICONBUTTON, icon='fa-solid fa-share-nodes'), ## From FontAwesome v6.0.0
    Column(name='_url.document', label='Document', dtype=ColumnDType.DOWNLOAD),
], show_search=True)