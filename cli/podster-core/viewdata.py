from pymongo import MongoClient
from pprint import pprint

client = MongoClient(port=27017)
db = client.podster
shows_count = db.shows.find({}).count()
print(shows_count)

shows = db.shows.find({})
for show in shows:
    pprint(show)
