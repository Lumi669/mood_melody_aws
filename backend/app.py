from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLALchemy   
from flask_cors import CORS
from os import environ

app = Flask(__name__)

# Example data - later will fetch this from database
happy_resources = [
    {"audio": "happy_audio_1.mp3", "image": "happy_image_1.jpg"},
    {"audio": "happy_audio_2.mp3", "image": "happy_image_2.jpg"}
]

@app.route('/happy')
def get_happy_resources():
    resource = random.choice(happy_resources)
    return jsonify(resource)

if __name__ == '__main__':
    app.run(debug=True)
