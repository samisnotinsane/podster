FROM python:3
LABEL maintainer="Sameen Islam <@samisnotinsane>"

ADD . /app
WORKDIR /app

RUN pip install click
RUN pip install beautifulsoup4
RUN pip install requests
RUN pip install feedparser
RUN pip install pymongo

COPY podster.py /app/
RUN chmod a+x podster.py
