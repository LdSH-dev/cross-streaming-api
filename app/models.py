from unicodedata import name
import app
from dataclasses import dataclass

@dataclass
class Movie(app.db.Model):
    
    id: int
    title: str
    url: str
    
    id   = app.db.Column(app.db.Integer(), primary_key=True)
    title = app.db.Column(app.db.String())
    url  = app.db.Column(app.db.String())
    
    def __init__(self,*args, **kwargs):
        super().__init__(*args, **kwargs)
        
    def __repr__(self):
        return f'<Movie id: {self.id} - {self.title}'