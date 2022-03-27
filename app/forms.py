from wtforms import Form, StringField
from wtforms.validators import DataRequired


class MovieForm(Form):
    title = StringField('title', validators=[DataRequired()])
    url   = StringField('url', validators=[DataRequired()])
