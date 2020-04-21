# podster
A podcast player with web and cli interface. 

[![Netlify Status](https://api.netlify.com/api/v1/badges/d6595365-618d-4ba9-8801-d0478232761b/deploy-status)](https://app.netlify.com/sites/infallible-blackwell-29054e/deploys)

### Getting Started
Podster is fully containerised using [Docker](https://www.docker.com) to make it cross-platform and prevent 
dependency hell. 
Please make an account with them if you do not have one already and install it on your system. 

#### Startup 
Clone this repo and navigate inside it.
````
git clone https://github.com/samisnotinsane/podster.git
cd podster
````
Launch podster with one command from your terminal:
````
docker-compose up -d --build
````
This will deploy this Docker app in detached mode.

Note: If you wish to debug and view logs generating, please remove `-d` from the command above. 
When launched in this way, press `CTRL+C` from terminal to quit.

This will spin up 3 containers: 
- `podster_react_web`: a React web app which is the main UI for Podster
- `podster_data_fetcher`: a python command line app for adding podcast links, downloading related data and storing them in database
- `podster_datastore_1`: a mongo db local datastore (used to store downloaded podcast data)
- `podster_flask_web` (deprecated): python flask web server with jQuery frontend components

Check that the app is running using `docker-compose ps` which should produce the following output:

````
       Name                      Command               State             Ports
----------------------------------------------------------------------------------------
podster_data_fetcher   bash -c  python podster.py ...   Exit 0
podster_datastore      docker-entrypoint.sh mongod      Up       0.0.0.0:27017->27017/tcp
podster_flask_web      bash -c python srv.py            Up       0.0.0.0:5000->5000/tcp
podster_react_web      docker-entrypoint.sh npm start   Up       0.0.0.0:3000->3000/tcp
````

Please open [http://0.0.0.0:3000](http://0.0.0.0:3000) to open the React web app.

Flask web app (deprecated) is only supported on Safari. Open [http://0.0.0.0:5000](http://0.0.0.0:5000) to view.

#### Shutdown
To take down podster, run `docker-compose down` or `CTRL+C` if you're not running in detached mode (`-d`).

### Features (Flask App)
- View recently added podcasts
- View podcast episodes with its description (when playing)
- Play an episode and view time elapsed

### Known Limitations (Flask App)
- Volume slider code not yet implemented
- Favorites section not yet implemented
- Search feature not yet implemented
- Analysis in 'Research' sidebar not yet implemented
- Podcast cover viewing in player not yet implemented
- Player next/prev buttons not yet implemented
- Once paused, resuming creates another layer of audio, starting from the beginning of episode 

### View readme for:
- [CLI](https://github.com/samisnotinsane/podster/tree/master/cli)
- [web-app](https://github.com/samisnotinsane/podster/tree/master/web-app)

### Screenshots

![Homepage](/screenshots/podster-0.1.png?raw=true "Podster homepage showing podcast covers")