from enum import Enum

class ColumnDType(Enum):
    
    STRING = "STRING"
    ICONBUTTON = "ICONBUTTON"
    DOWNLOAD = "DOWNLOAD"
    IMAGE = "IMAGE"
    LINK = "LINK"

class Column():
    
    def __init__(self, name, label = None, switchcase = None, dtype: ColumnDType = ColumnDType.STRING, icon = None):
        self.name = name
        self.label = label
        self.switchcase = switchcase
        self.icon = icon
        self.dtype = dtype
        
    def get_label(self):
        if self.label is None or self.label == '':
            return self.name
        else:
            return self.label
        
    def to_json(self):
        return {
            'name': self.name,
            'label': self.get_label(),
            'switchcase': self.switchcase,
            'dtype': self.dtype.value,
            'icon' : self.icon
        }