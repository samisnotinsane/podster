"""
podster-core

Usage:
  podster-core hello
  podster-core -h | --help
  podster-core --version

Options:
  -h --help                         Show this screen.
  --version                         Show version.

Examples:
  podster-core hello

Help:
  For help using this tool, please open an issue on the Github repository:
  https://github.com/samisnotinsane/podster
"""

def main():
    """Main CLI entrypoint"""
    # Subscribe to RSS feed
    import os
    import feedparser
    from pprint import pprint
    filepath = './podster-core/feed-source.txt'
    print('reading rss links from file: ' + os.path.abspath(filepath))
    raw_rss_list = [line.rstrip('\n') for line in open(filepath)]
    rss_list = list(filter(None, raw_rss_list))
    print('found the following rss feeds:\n')
    for rss_link in rss_list:
        d = feedparser.parse(rss_link)
        c = d.channel
        # channel info
        print(c.title)
        print(c.description)
        if hasattr(c, 'image'):
            print(c.image.url)
        print('|')
        # item - last 3
        for i in range(2):
            i = d.entries[i]
            print(i.title)
            print(i.published)
            print(i.link)
            print(i.description)
            if hasattr(i.enclosures, 'enclosures'):
                print(i.enclosures[0].length)
                print(i.enclosures[0].type)
                print(i.enclosures[0].url)
        print('\n')
        print('\n')
        
        

    

