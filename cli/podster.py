import click
import sys
import os


class Scope(object):

    def __init__(self):
        self.urlcachepath = '/tmp/url_cache.txt'
        self.feedcachepath = '/tmp/feed_cache.txt'


pass_scope = click.make_pass_decorator(Scope, ensure=True)


@click.group()
@pass_scope
def cli(scope):
    pass


@cli.command()
@click.option('--add', is_flag=True, help='RSS URL of podcast feed.')
@click.option('--purge', is_flag=True, help='Delete stored RSS URLs.')
@click.option('--view', is_flag=True, help='View stored RSS URLs.')
@click.argument('URL', required=False)
@click.argument('out', type=click.File('a+'), default='URL_CACHE', required=False)
@pass_scope
def source(scope, add, purge, view, url, out):
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
        click.echo('Viewing RSS URL cache')


@cli.command()
@click.option('--create', is_flag=True, help='Download RSS feeds using RSS URLs from cache.')
@click.option('--update', is_flag=True, help='Overwrite previously downloaded RSS feeds with new data.')
@click.option('--purge', is_flag=True, help='Delete stored RSS feeds.')
@click.option('--view', is_flag=True, help='View stored RSS feeds.')
@pass_scope
def cache(create, update, purge, view):
    if create:
        click.echo('Creating feed cache from URLs')
    if update:
        click.echo('Updating feed cache with newly downloaded data')
    if purge:
        click.echo('Purging feed cache')
    if view:
        click.echo('Viewing feed cache')


@cli.command()
@click.option('--create', is_flag=True, help='Create persistent store with feed data from cache.')
@click.option('--view', is_flag=True, help='View feed data in persistent store.')
@click.option('--purge', is_flag=True, help='Delete feed data from persistent store.')
@pass_scope
def store(create, view, purge):
    if create:
        click.echo('Creating persistent store with cache data')
    if view:
        click.echo('Viewing persistent storage data')
    if purge:
        click.echo('Purging persistent storage data')


if __name__ == '__main__':
    cli()
