import os
import pandas as pd
import streamlit as st
from typing import List
import streamlit.components.v1 as components
from awesome_table.column import (ColumnDType, Column)

_RELEASE = True

class AwesomeTable():
    """AwesomeTable is a component for Streamlit to build a table based in bootstrap with search and order funcionality."""
    if _RELEASE:
        _root_dir = os.path.dirname(os.path.abspath(__file__))
        _build_dir = os.path.join(_root_dir, 'frontend/build')
        
        _awesome_table_ = components.declare_component(
            "awesome_table",
            path=_build_dir
        )
    else:
        _awesome_table_ = components.declare_component(
            "awesome_table",
            url='http://localhost:3001'
        )
    
    def __init__(self, data: pd.DataFrame, columns: List =[], show_order = False, show_search= False, show_search_order_in_sidebar = False, key = 'awesome_table'):
        """AwesomeTable is a component for Streamlit to build a table based in bootstrap with search and order funcionality.
        Can build this table based in a pandas dataframe. The order and search components would be displayed on the sidebar or above the table.

        Args:
            data (pd.Dataframe): Dataframe to build the table. If you've a JSON data, you can use the `pd.json_normalize(json)` method.
            columns (List, optional): Columns that will be displayed in table. You can pass parameters to personalize each. Defaults to [].
            show_order (bool, optional): Show order components. Defaults to False.
            show_search (bool, optional): Show search components. Defaults to False.
            show_search_order_in_sidebar (bool, optional): [description]. Defaults to False.
            key (str, optional): Key for identification table. Defaults to 'awesome_table'.
        """
        self.data = self.set_data(data, columns)
        self.columns = self.set_columns(columns)
        self.key = key
        self.show_order = show_order
        self.show_search = show_search
        self.show_search_order_in_sidebar = show_search_order_in_sidebar

        self.build_table_content()

        self.build_order_component()
        AwesomeTable._awesome_table_(data=self.table_content, columns=[column.to_json() for column in self.columns], key=self.key)        
    
    def set_data(self, data, columns) -> pd.DataFrame:
        """Set dataframe based in columns passed by parameter.

        Args:
            data (pd.DataFrame): Dataframe pandas.
            columns (List[Column]): List of the columns.

        Returns:
            pd.Dataframe: Pandas Dataframe based in columns passed by parameter.
        """
        if columns is not None and len(columns) > 0:
            if type(columns[0]) is str:
                data = data[[column for column in columns]]
            else:
                data = data[[column.name for column in columns]]
            for col in [column.name for column in columns if column.dtype == ColumnDType.DATETIME]:
                data[col] = pd.to_datetime(data[col])
        return data
    
    def set_columns(self, columns):
        """Set columns based in parameters passed by parameter.

        Args:
            columns (_type_): _description_

        Returns:
            _type_: _description_
        """
        if columns is None or len(columns) == 0:
            self.columns = None
            return self.get_columns()
        if columns is not None and len(columns) > 0 and type(columns[0]) is str:
            return [Column(column) for column in columns]
        return columns
    
    def get_columns(self):
        """If columns not passed by parameter, return all columns based in pandas Dataframe columns.

        Returns:
            List[Column]: List of columns.
        """
        if self.columns is None or len(self.columns) == 0:
            self.columns = list()
            for col in self.data.columns:
                self.columns.append(Column(col, dtype=ColumnDType.STRING))
        return self.columns
        
    def get_column_label_by_name(self, name):
        """Return the label of the column based in the name passed by parameter.

        Args:
            name (str): Name of the column.

        Returns:
            str: Return label if exists, else return name.
        """
        for column in self.get_columns():
            if column.name == name:
                return column.get_label()
        return None            
    
    def get_column_name(self):
        """Return all columns names.

        Returns:
            List[str]: Columns name
        """
        return [column.name for column in self.get_columns()]
       
    
    def build_table_content(self):
        """Create json to populate table from pandas Dataframe.
        """
        data = self.data.copy()
        for col in [column for column in self.columns if column.dtype == ColumnDType.DATETIME]:
            data[col.name] = pd.to_datetime(data[col.name]).dt.strftime(col.dateformat)
        self.table_content = data.to_json(path_or_buf=None, index=False, orient='table')
        
    def order_table(self):
        """Order pandas dataframe based in parameters filled in frontend.
        """
        if self.show_search_order_in_sidebar:
            order_column = st.session_state.get('sb_order_column', None)
            order_ascending = st.session_state.get('sb_order_ascending', True)
        else:
            order_column = st.session_state.get('order_column', None)
            order_ascending = st.session_state.get('order_ascending', True)
        
        if order_ascending == 'Ascending':
            order_ascending = True
        elif order_ascending == 'Descending':
            order_ascending = False

        if order_column:
            self.data.sort_values(by=[order_column], ascending=order_ascending, inplace=True)
            self.build_table_content()

    def search_table(self):
        """Search pandas dataframe based in parameters filled in frontend.
        """
        if self.show_search_order_in_sidebar:
            search_text = st.session_state.get('sb_search_text', None)
            search_by = st.session_state.get('sb_search_by', None)
        else:
            search_text = st.session_state.get('search_text', None)
            search_by = st.session_state.get('search_by', None)
            
        if search_text is not None and search_by is not None:
            query = search_by+f'.astype("str").str.lower().str.contains("{str(search_text).lower()}")'
            self.data.query(query, engine='python', inplace=True)
        self.build_table_content()

    def build_order_component(self):
        """Build order and search components.
        """
        if self.show_search_order_in_sidebar:
            if self.show_order:
                st.sidebar.selectbox('Order by', self.data.columns, format_func=self.get_column_label_by_name, on_change=self.order_table(), key='sb_order_column')
                st.sidebar.selectbox('Strategy', ['Ascending','Descending'], on_change=self.order_table(), key='sb_order_ascending')
            if self.show_search:
                st.sidebar.text_input('Search', on_change=self.search_table(), key='sb_search_text')
                st.sidebar.selectbox('by', self.data.columns    , format_func=self.get_column_label_by_name, on_change=self.search_table(), key='sb_search_by')    
        else:
            col_order, col_strategy, col_search, col_searchby = st.columns([1,1,2,1])
            if self.show_order:
                col_order.selectbox('Order by', self.data.columns, format_func=self.get_column_label_by_name, on_change=self.order_table(), key='order_column')
                col_strategy.selectbox('Strategy', ['Ascending','Descending'], on_change=self.order_table(), key='order_ascending')
            if self.show_search:
                col_search.text_input('Search', on_change=self.search_table(), key='search_text')
                col_searchby.selectbox('by', self.data.columns    , format_func=self.get_column_label_by_name, on_change=self.search_table(), key='search_by')