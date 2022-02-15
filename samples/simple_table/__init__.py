import pandas as pd
import streamlit as st
from awesome_table import AwesomeTable
from sample import data as sample_data

st.set_page_config(page_title='AwesomeTable by @caiofaar', page_icon='📊', layout='wide')
st.title('Simple table with AwesomeTable')

AwesomeTable(pd.json_normalize(sample_data))