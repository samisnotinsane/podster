FROM node:10-alpine AS alpine
LABEL maintainer="Sameen Islam <@samisnotinsane>"

WORKDIR /app
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json /app/
## install only the packages defined in the package-lock.json (faster than the normal npm install)
RUN npm install
# install react router
RUN npm i react-router-dom --save
# Copy the contents of the project to the image
COPY . /app/
# expose port 3000 from in the container to the outside world
EXPOSE 3000
# Run 'npm start' when the container starts.
CMD ["npm", "start"]
