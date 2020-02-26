# podster-cli
Use this CLI to add podcasts, view added ones and remove downloaded data.

## Prerequisites

Ensure the following packages are installed. We strongly recommend using a virtual 
environment such as [conda](https://docs.conda.io/projects/conda/en/latest/user-guide/getting-started.html).

- [click](https://click.palletsprojects.com/en/7.x/)
- [feedparser](https://pypi.org/project/feedparser/)
- [pymongo](https://api.mongodb.com/python/current/)

## Getting Started
Navigate to `/cli` and enter `python podster.py --help` to view documentation:
````
Usage: podster.py [OPTIONS] COMMAND [ARGS]...

Options:
  --help  Show this message and exit.

Commands:
  source
  store
````

## Commands

### source
To view documentation, type: `python podster.py source --help`:
````
Usage: podster.py source [OPTIONS] [URL] [OUT]

Options:
  --add    RSS URL of podcast feed.
  --purge  Delete stored RSS URLs.
  --view   View stored RSS URLs.
  --help   Show this message and exit.
```` 

Ensure you are adding a valid RSS URL. 
Here's an example: [http://arstechnica.libsyn.com/rss](http://arstechnica.libsyn.com/rss).

Let's add this source to podster:

``
python podster.py source --add http://arstechnica.libsyn.com/rss
``

You can now view:

``
python podster.py source --view
``

Which should output all added URLs to STDIO.

To delete all stored URLs, run:

``
python podster.py source --purge
``

This command is particularly helpful if you've added the same URL 
more than once by accident.


### store
To view documentation, type: `python podster.py store --help`:
````
Usage: podster.py store [OPTIONS]

Options:
  --create  Create persistent store with feed data from cache.
  --view    View feed data in persistent store.
  --purge   Delete feed data from persistent store.
  --help    Show this message and exit.
````

Once you've added some URLs using the `source` command, you can persist 
downloaded feed data in a local database ([MongoDB](https://www.mongodb.com)).

To download and store feed, use the `--create` option. 
To erase all downloaded data, use `--purge`.

We only recommend using the `--view` option with 
[Unix pipe](https://stackoverflow.com/questions/876239/how-to-redirect-and-append-both-stdout-and-stderr-to-a-file-with-bash) 
as output is likely to be very large. For example:

``
python podster.py store --view > feed.txt
`` 

This will create the file `feed.txt` and pipe all output there.