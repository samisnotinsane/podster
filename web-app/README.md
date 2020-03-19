# web-app

Run using [Docker](https://docs.docker.com/install/). 


First, build the image using:

````
docker image build -t podster-api:v0.1 .
````

Then run the container using:

````
docker container run --interactive --tty --rm -p 5000:5000 --name=podster-api podster-api:v0.1
````

The app can be viewed from your browser using the following URL: ``http://0.0.0.0:5000/``

----

In progress (not yet tested):

Mongo DB server can be started in another container:

````
docker pull mongo
docker run --name mongo -p 27017:27017 -v $PWD/data:/data/db -d mongo
````

