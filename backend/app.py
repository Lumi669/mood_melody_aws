from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URL')

print("database_url ====== ", environ.get('DATABASE_URL'))
db = SQLAlchemy(app)


class Music(db.Model):
    __tablename__ = 'music'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    mood = db.Column(db.String(80), unique=False, nullable=False)

    def json(self):
        return {'id': self.id, 'name': self.name, 'mood': self.mood}

class Image(db.Model):
    __tablename__ = 'images'  
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    mood = db.Column(db.String(80), unique=False, nullable=False)

    def json(self):
        return {'id': self.id, 'name': self.name, 'mood': self.mood}
    
# Ensure db.create_all() is called within an application context
with app.app_context():
    db.create_all()

@app.route('/test', methods=['GET'])  
def test():
    return jsonify({'message': 'The server is running ....====.....'})

@app.route('/api/flask/musics', methods=['POST'])  
def create_music():
    try:
        data = request.get_json()
        new_music = Music(name=data['name'], mood=data['mood'])
        db.session.add(new_music)
        db.session.commit()  
        return jsonify({
            'id': new_music.id,
            'name': new_music.name,
            'mood': new_music.mood
        }), 201

    except Exception as e:
        return make_response(jsonify({'message': 'error creating music', 'error': str(e)}), 500)

@app.route('/api/flask/musics', methods=['GET'])  
def get_musics():
    try:
        musics = Music.query.all()
        musics_data = [{'id': music.id, 'name': music.name, 'mood': music.mood} for music in musics]
        return jsonify(musics_data), 200
    except Exception as e:
        return make_response(jsonify({'message': 'error getting musics', 'error': str(e), 'data': '[]'}, ), 500)
