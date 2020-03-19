#!/usr/bin/env python

from flask import Flask, render_template, jsonify, request
import data


app = Flask(__name__, template_folder='templates')

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api-docs')
def api_docs():
    return render_template('api-docs.html')


@app.route('/api/podcasts')
def get_podcasts():
    podcasts = data.get_podcast_dict()
    return jsonify({'podcasts': podcasts})


@app.route('/api/podcast/<podcast_name>')
def get_show(podcast_name=None):
    show = data.get_podcast(podcast_name)
    return jsonify(show)


@app.route('/api/episodes/<podcast_name>')
def get_episodes(podcast_name=None):
    episodes = data.get_episode_dict(podcast_name)
    return jsonify(episodes)


@app.route('/library')
def library():
    podcasts = data.get_podcast_dict()
    return render_template('library.html', podcasts=podcasts)


@app.route('/show-episodes')
def show_episodes():
    title = request.args.get('title', None)
    episodes_list = data.get_episode_dict(title)['episodes']
    app.logger.debug('Found {0} episodes for \'{1}\' in database'.format(len(episodes_list), title))
    return render_template('show-episodes.html', title=title, episodes=episodes_list)


@app.route('/show-detail')
def show_detail():
    title = request.args.get('title', None)
    return render_template('show-detail.html', title=title)


app.run(host="0.0.0.0")
