import click
import sys


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
@pass_scope
def source(scope, add, purge, view, url):
    if add:
        if url is not None:
            click.echo('Adding RSS URL: {0}'.format(url))
        else:
            click.echo('Error: Missing argument "URL".')
            sys.exit(-1)
    if purge:
        click.echo('Purging RSS URL cache')
    if view:
        click.echo('Viewing RSS URL cache')


@cli.command()
@cli.option('--create', is_flag=True, help='Download RSS feeds using RSS URLs from cache.')
@cli.option('--update', is_flag=True, help='Overwrite previously downloaded RSS feeds with new data.')
@cli.option('--purge', is_flag=True, help='Delete stored RSS feeds.')
@cli.option('--view', is_flag=True, help='View stored RSS feeds.')
@pass_scope
def cache(create, update, purge, view):
    pass


@cli.command()
@pass_scope
def store():
    pass


if __name__ == '__main__':
    cli()
