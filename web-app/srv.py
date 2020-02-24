from flask import Flask, render_template, jsonify
import data

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/podcasts')
def get_podcasts():
    podcasts = data.get_podcast_list()
    return jsonify({'podcasts': podcasts})


@app.route('/api/episodes/<podcast_name>')
def get_episodes(podcast_name=None):
    episodes = data.get_episode_list(podcast_name)
    return jsonify(episodes)
