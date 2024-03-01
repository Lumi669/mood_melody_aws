# from flask import Flask, request, jsonify, make_response
# from flask_sqlalchemy import SQLAlchemy
# from flask_cors import CORS
# from os import environ

# app = Flask(__name__)
# CORS(app)
# app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URL')

# print("database_url ====== ", environ.get('DATABASE_URL'))
# db = SQLAlchemy(app)


# class Music(db.Model):
#     __tablename__ = 'music'
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(80), unique=True, nullable=False)
#     mood = db.Column(db.String(80), unique=False, nullable=False)

#     def json(self):
#         return {'id': self.id, 'name': self.name, 'mood': self.mood}

# class Image(db.Model):
#     __tablename__ = 'images'  
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(80), unique=True, nullable=False)
#     mood = db.Column(db.String(80), unique=False, nullable=False)

#     def json(self):
#         return {'id': self.id, 'name': self.name, 'mood': self.mood}
    
# # Ensure db.create_all() is called within an application context
# with app.app_context():
#     db.create_all()

# @app.route('/test', methods=['GET'])  
# def test():
#     return jsonify({'message': 'The server is running ....====.....'})

# @app.route('/api/flask/musics', methods=['POST'])  
# def create_music():
#     try:
#         data = request.get_json()
#         new_music = Music(name=data['name'], mood=data['mood'])
#         db.session.add(new_music)
#         db.session.commit()  
#         return jsonify({
#             'id': new_music.id,
#             'name': new_music.name,
#             'mood': new_music.mood
#         }), 201

#     except Exception as e:
#         return make_response(jsonify({'message': 'error creating music', 'error': str(e)}), 500)

# @app.route('/api/flask/musics', methods=['GET'])  
# def get_musics():
#     try:
#         musics = Music.query.all()
#         musics_data = [{'id': music.id, 'name': music.name, 'mood': music.mood} for music in musics]
#         return jsonify(musics_data), 200
#     except Exception as e:
#         return make_response(jsonify({'message': 'error getting musics', 'error': str(e), 'data': '[]'}, ), 500)


# if __name__ == '__main__':
#     # Ensuring the app runs on the correct port for Heroku
#     port = int(os.environ.get('PORT', 4000))  # Default to 5000 if PORT not found
#     app.run(host='0.0.0.0', port=port)

from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Adjust the DATABASE_URL for SQLAlchemy compatibility
database_url = os.environ.get('DATABASE_URL', 'sqlite:///local.db')  # Fallback to local SQLite if not set
if database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)
app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Optional: but it's a good practice to disable it for performance

print("database_url ====== ", database_url)
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

@app.before_first_request
def create_tables():
    db.create_all()

@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'The server is running ....===oooooo'})

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
        return make_response(jsonify({'message': 'error getting musics', 'error': str(e), 'data': '[]'}), 500)

if __name__ == '__main__':
    # Ensuring the app runs on the correct port for Heroku
    port = int(os.environ.get('PORT', 4000))  # Default to 4000 if PORT not found
    app.run(host='0.0.0.0', port=port, debug=True)  # Consider setting debug=False in production
