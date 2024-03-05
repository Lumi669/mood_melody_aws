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
    url = db.Column(db.String(300), unique=True, nullable=False)


    def json(self):
        return {'id': self.id, 'name': self.name, 'mood': self.mood, 'url': self.url}

class Image(db.Model):
    __tablename__ = 'images'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    mood = db.Column(db.String(80), unique=False, nullable=False)
    url = db.Column(db.String(300), unique=True, nullable=False)

    def json(self):
        return {'id': self.id, 'name': self.name, 'mood': self.mood, 'url': self.url}

@app.before_first_request
def create_tables():
    db.create_all()

@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'The server is running ooo..hhh.'})



@app.route('/api/musics', methods=['POST'])
def create_music():
    try:
        data = request.get_json()
        if isinstance(data, dict):  # Single music object
            new_musics = [Music(name=data['name'], mood=data['mood'], url=data['url'])]
        elif isinstance(data, list):  # List of music objects
            new_musics = [Music(name=item['name'], mood=item['mood'], url=item['url']) for item in data]
        else:
            return make_response(jsonify({'message': 'Invalid data format'}), 400)

        db.session.add_all(new_musics)
        db.session.commit()

        return jsonify([{'id': music.id, 'name': music.name, 'mood': music.mood, 'url': music.url} for music in new_musics]), 201

    except Exception as e:
        db.session.rollback()  # It's a good practice to rollback the session in case of errors
        return make_response(jsonify({'message': 'Error creating music', 'error': str(e)}), 500)


@app.route('/api/musics', methods=['GET'])
def get_musics():
    try:
        musics = Music.query.all()
        musics_data = [{'id': music.id, 'name': music.name, 'mood': music.mood, 'url': music.url} for music in musics]
        return jsonify(musics_data), 200
    except Exception as e:
        return make_response(jsonify({'message': 'error getting musics', 'error': str(e), 'data': '[]'}), 500)
    
@app.route('/api/musics', methods=['DELETE'])
def delete_all_musics():
    try:
        db.session.query(Music).delete()
        db.session.commit()
        return make_response(jsonify({'message': 'All data deleted successfully'}), 200)

    except Exception as e:
        # In case of an error, roll back the changes
        db.session.rollback()
        return make_response(jsonify({'message': 'Error deleting data', 'error': str(e)}), 500)




@app.route('/api/images', methods=['POST'])
def create_image():
    try:
        data = request.get_json()
        new_image = Image(name=data['name'], mood=data['mood'], url=data['url'])
        db.session.add(new_image)
        db.session.commit()
        return jsonify({
            'id': new_image.id,
            'name': new_image.name,
            'mood': new_image.mood,
            'url': new_image.url
        }), 201

    except Exception as e:
        return make_response(jsonify({'message': 'error creating image', 'error': str(e)}), 500)

@app.route('/api/images', methods=['GET'])
def get_images():
    try:
        images = Image.query.all()
        images_data = [{'id': image.id, 'name': image.name, 'mood': image.mood, 'url': image.url} for image in images]
        return jsonify(images_data), 200
    except Exception as e:
        return make_response(jsonify({'message': 'error getting images', 'error': str(e), 'data': '[]'}), 500)
    
@app.route('/api/images', methods=['DELETE'])
def delete_all_images():
    try:
        db.session.query(Image).delete()
        db.session.commit()
        return make_response(jsonify({'message': 'All data deleted successfully'}), 200)

    except Exception as e:
        # In case of an error, roll back the changes
        db.session.rollback()
        return make_response(jsonify({'message': 'Error deleting data', 'error': str(e)}), 500)
    
@app.route('/')
def home():
    return jsonify({'message': 'Welcome to the Music Mood API!'})

@app.route('/favicon.ico')
def favicon():
    return jsonify({'message': 'NO such file as favicon.ico!'}), 204



if __name__ == '__main__':
    # Ensuring the app runs on the correct port for Heroku
    port = int(os.environ.get('PORT', 4000))  # Default to 4000 if PORT not found
    app.run(host='0.0.0.0', port=port, debug=False)  # Consider setting debug=False in production
