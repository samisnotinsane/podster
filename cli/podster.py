import click
import sys
import os
import feedparser
from pymongo import MongoClient


@click.group()
def cli():
    pass


@cli.command()
@click.option('--add', is_flag=True, help='RSS URL of podcast feed.')
@click.option('--purge', is_flag=True, help='Delete stored RSS URLs.')
@click.option('--view', is_flag=True, help='View stored RSS URLs.')
@click.argument('URL', required=False)
@click.argument('out', type=click.File('a+'), default='URL_CACHE', required=False)
def source(add, purge, view, url, out):
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
    client = MongoClient(port=27017)
    db = client.podster
    shows_collection = db.shows
    if create:
        click.echo('Creating persistent store with cache data...', nl=False)
        with open('URL_CACHE', 'r') as reader:
            for line in reader:
                cleanline = line.rstrip('\n')
                parsed_data = feedparser.parse(cleanline)
                show_data = extract_fields(parsed_data)
                shows_collection.insert_one(show_data)
        click.secho('OK!', fg='green')
    if view:
        click.echo('Viewing persistent storage data')
        shows_cursor = shows_collection.find({})
        for show in shows_cursor:
            click.secho(str(show), fg='blue')
    if purge:
        click.secho('WARNING! ', fg='red', nl=False)
        click.echo('This will permanently remove all cache data. Continue [y/n]?')
        c = click.getchar()
        if c == 'y':
            click.echo('Purging persistent storage data...', nl=False)
            shows_collection.drop()
            click.secho('OK!', fg='green')
        if c == 'n':
            click.echo('Cancelled')
        sys.exit(0)


def extract_fields(parsed_data):
    """
    Helper for `store` command.
    :param parsed_data: RSS feed data already parsed using `feedparser`
    :return: JSON containing show data
    """
    show = dict()

    channel = parsed_data.channel
    channel_title = channel.title
    channel_description = channel.description
    channel_image_url = ''
    if hasattr(channel, 'image'):
        channel_image_url = channel.image.url
    episodes_list = parsed_data.entries

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
    return show


if __name__ == '__main__':
    cli()
