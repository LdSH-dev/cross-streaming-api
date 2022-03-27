from flask  import Flask, redirect, render_template, jsonify, request, url_for
from dotenv import load_dotenv
from config import Config
from flask_sqlalchemy import SQLAlchemy

load_dotenv('./.flaskenv')

app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy(app)
import models
from forms import MovieForm

@app.route('/')
def index():
    movies = models.Movie.query.all()
    
    return render_template('index.html')

@app.route('/admin/movieForm/')
def movieForm():
    movies = models.Movie.query.all()
    
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return jsonify(movies)
    
    return render_template('MovieForm.html')

@app.route('/admin/movieForm/create', methods=['POST'])
def create_movie():
    user_input = request.get_json()
    
    form = MovieForm(data=user_input)
    
    if form.validate():
        movie = models.Movie(title= form.title.data, url= form.url.data)

        db.session.add(movie)
        db.session.commit()
        
        return jsonify(movie)
    
    return redirect(url_for('movieForm'))


@app.route('/admin/movieForm/delete', methods=['POST'])
def delete_movie():
    
    movie_id = request.get_json().get('id')
    movie = models.Movie.query.filter_by(id=movie_id).first()

    db.session.delete(movie)
    db.session.commit()

    return jsonify({'result': 'Ok'}), 200

    
if __name__  == '__main__':
    app.run()