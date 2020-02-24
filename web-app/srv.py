from flask import Flask, render_template, jsonify
from data import get_podcasts

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/podcasts')
def get_podcast():
    podcasts = get_podcasts()
    return jsonify({'podcasts': podcasts})
