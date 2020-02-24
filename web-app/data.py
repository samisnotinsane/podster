from pymongo import MongoClient

client = MongoClient(port=27017)
db = client.podster

"""
Retrieves podcasts from MongoDB and returns them 
as a list. 
"""


def get_podcast_list():
    shows_list = list()
    for show in db.shows.find():
        shows_list.append(
            {
                'title': show['title'],
                'description': show['description'],
                'image_url': show['image_url']
            }
        )
    return shows_list


def get_episode_list(name=None):
    episode_list = db.shows.find_one(
        {'title': name},
        {'_id': 0, 'title': 0, 'description': 0, 'image_url': 0}
    )
    return episode_list
