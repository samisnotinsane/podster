import os
import feedparser
from pymongo import MongoClient
from pprint import pprint

client = MongoClient(port=27017)
db = client.podster

show_list = list()

filepath = './podster-core/feed-source.txt'
print('Feed source conf file: {0}'.format(os.path.abspath(filepath)))
print('Downloading feed...', end='')
raw_rss_list = [line.rstrip('\n') for line in open(filepath)]
rss_list = list(filter(None, raw_rss_list))
print('OK!')
# print('found the following rss feeds:\n')
print('Parsing feed...', end='')
for rss in rss_list:
    feed = feedparser.parse(rss)
    # show
    channel = feed.channel
    channel_title = channel.title
    channel_description = channel.description
    channel_image_url = ''
    if hasattr(channel, 'image'):
        channel_image_url = channel.image.url
    # episodes
    channel_episodes_len = len(feed.entries)
    episodes_list = feed.entries
    # show_list will contain 'show' dicts
    show = {
        'title': channel_title,
        'description': channel_description,
        'image_url': channel_image_url,
        'episodes': []
    }
    for episode in episodes_list:
        episode_title = episode.title
        episode_published = episode.published
        episode_url = episode.link
        episode_description = episode.description
        enclosure_length = ''
        enclosure_type = ''
        enclosure_url = ''
        if hasattr(episode.enclosures, 'enclosures'):
            enclosure_length = episode.enclosures[0].length
            enclosure_type = episode.enclosures[0].type
            enclosure_url = episode.enclosures[0].url
        show['episodes'].append(
            {
                'title': episode_title,
                'published': episode_published,
                'url': episode_url,
                'description': episode_description,
                'enclosure_length': enclosure_length,
                'enclosure_type': enclosure_type,
                'enclosure_url': enclosure_url
            }
        )
    show_list.append(show)
    db.shows.insert_one(show)
print('OK!')
# show_list_len = len(show_list)
# print('Finished loading {0} shows, generating preview of first item...'.format(show_list_len))
# print(show_list[0]['title'])
# print('Latest episode:\n')
# print(show_list[0]['episodes'][0]['title'])
# print(show_list[0]['episodes'][0]['description'])
# print(show_list[0]['episodes'][0]['url'])
print('Populating database...', end='')
# db.podcast.insert_many(show_list)
print('OK!')
print('Terminating script.')
