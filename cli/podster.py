#!/usr/bin/env python

import os
import sys
import time

import click
import requests
import feedparser
from pymongo import MongoClient
from io import BytesIO


@click.group()
def cli():
    pass


@cli.command()
@click.option('--add', is_flag=True, help='RSS URL of podcast feed.')
@click.option('--purge', is_flag=True, help='Delete stored RSS URLs.')
@click.option('--view', is_flag=True, help='View stored RSS URLs.')
@click.option('--ext', is_flag=True, help='Read RSS URLs from a web URL')
@click.argument('URL', required=False)
@click.argument('out', type=click.File('a+'), default='URL_CACHE', required=False)
@click.argument('link', required=False)
def source(add, purge, view, ext, url, out, link):
    if ext:
        if link is not None:
            response = requests.get(link, timeout=2)
            data = response.text
            click.echo(data, file=out)
    if add:
        if url is not None:
            click.echo('Adding RSS URL: {0}'.format(url))
            click.echo(url, file=out)
        else:
            click.echo('Error: Missing argument "URL".')
            sys.exit(-1)
    if purge:
        os.remove('URL_CACHE')
        click.echo('Purged RSS URL cache')

    if view:
        with open('URL_CACHE', 'r') as reader:
            i = 1
            for line in reader:
                click.echo('{0}. {1}'.format(i, line), nl=False)
                i += 1


@cli.command()
@click.option('--create', is_flag=True, help='Create persistent store with feed data from cache.')
@click.option('--view', is_flag=True, help='View feed data in persistent store.')
@click.option('--purge', is_flag=True, help='Delete feed data from persistent store.')
def store(create, view, purge):
    client = MongoClient('mongodb://datastore:27017')
    dblist = client.list_database_names()
    if "podster" in dblist:
        print("podster database already exists.")
    db = client.podster
    shows_collection = db.maven
    if create:
        click.secho('CAUTION! ', fg='yellow', nl=False)
        click.echo('Purging existing data in persistent storage.')
        c = 'y'
        if c == 'y':
            dblist = client.list_database_names()
            if "podster" in dblist:
                shows_collection.delete_many({})
                print("Purging existing data...")
            click.echo('Creating persistent store with cache data...', nl=False)
            with open('URL_CACHE', 'r') as reader:
                for line in reader:
                    cleanline = line.rstrip('\n')
                    try:
                        start = time.time()
                        resp = requests.get(cleanline, timeout=1.0)
                        end = time.time()
                        click.echo('Response in {0}s'.format(end - start))
                    except requests.ReadTimeout:
                        click.secho("Timeout when reading RSS URL: {0}".format(cleanline), fg='red')
                    except requests.ConnectionError:
                        click.secho("Connection error when reading RSS URL: {0}".format(cleanline), fg='red')
                    content = BytesIO(resp.content)
                    try:
                        parsed_data = feedparser.parse(content)
                    except StopIteration:
                        click.secho("StopIteration error when reading RSS URL: {0}".format(cleanline), fg='red')
                    try:
                        show_data = extract_fields(cleanline, parsed_data)
                        if show_data != -1:
                            try:
                                shows_collection.insert_one(show_data)
                            except MongoClient.DuplicateKeyError:
                                continue
                    except AttributeError:
                        click.secho("Unable to parse RSS URL: {0}".format(cleanline), fg='red')
            click.secho('OK!', fg='green')
        if c == 'n':
            click.echo('Cancelled')
            sys.exit(0)
    if view:
        click.echo('Viewing persistent storage data')
        shows_cursor = shows_collection.find({})
        for show in shows_cursor:
            click.secho(str(show), fg='blue')
    if purge:
        click.secho('WARNING! ', fg='red', nl=False)
        click.echo('Permanently removing all cache data.')
        c = 'y'
        if c == 'y':
            click.echo('Purging persistent storage data...', nl=False)
            shows_collection.drop()
            click.secho('OK!', fg='green')
        if c == 'n':
            click.echo('Cancelled')
        sys.exit(0)


def extract_fields(url, parsed_data):
    """
    Helper for `store` command.
    :param url: RSS URL from which `parsed_data` originates
    :param parsed_data: RSS feed data already parsed using `feedparser`
    :return: JSON containing show data
    """
    show = dict()

    channel = parsed_data.channel
    # do not save podcast with no title
    if not hasattr(channel, 'title'):
        return -1
    channel_title = channel.title
    channel_description = channel.description
    channel_image_url = ''
    if hasattr(channel, 'image'):
        channel_image_url = channel.image.url
    episodes_list = parsed_data.entries

    show = {
        'title': channel_title,
        'description': channel_description,
        'show_url': url,
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
        if episode.links:
            if len(episode.links) == 2:
                if hasattr(episode.links[0], 'length'):
                    enclosure_url = episode.links[0].href
                    enclosure_length = episode.links[0].length
                    enclosure_type = episode.links[0].type
                if hasattr(episode.links[1], 'length'):
                    enclosure_url = episode.links[1].href
                    enclosure_length = episode.links[1].length
                    enclosure_type = episode.links[1].type
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
    return show


if __name__ == '__main__':
    cli()
