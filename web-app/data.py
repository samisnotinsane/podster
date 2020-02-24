from pymongo import MongoClient

client = MongoClient(port=27017)
db = client.podster

"""
Retrieves podcasts from MongoDB and returns them 
as a list. 
"""


def get_podcasts():
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
