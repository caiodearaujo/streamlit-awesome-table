import setuptools

setuptools.setup(
    name="streamlit-awesome-table",
    version="0.1.1",
    author="Caio Fábio de Araujo",
    author_email="caiofaar@gmail.com",
    description="Awesome Table is a component to display a table in Streamlit with search and order.",
    long_description="Display a table with search and order components that will be display above the table or in sidebar.",
    long_description_content_type="text/plain",
    url="https://github.com/caiodearaujo/streamlit-awesome-table",
    packages=setuptools.find_packages(),
    include_package_data=True,
    classifiers=[],
    python_requires=">=3.6",
    install_requires=[
        # By definition, a Custom Component depends on Streamlit.
        # If your component has other Python dependencies, list
        # them here.
        "streamlit >= 0.63",
        "pandas"
    ],
)
