# Instructions for setup #

  ## Clone Repository ##

 - To set up this project first clone the repo to your local machine. You can do this by clicking the clone button and copying the link to your clipboard.

## Run locally ##

- Copy the settings variables from the env_example.txt and create a new .env file in the same directory and copy the settings variables.

- Install Mongodb and Node JS.

- Go into the backend folder and install the modules for the express server.

```
$ npm install
```

- Go into the frontend folder and install the modules for the Vue JS application.

```
$ npm install
```
- Start Mongodb.

- Run this command in the backend directory to start the Express server.

```
$ nodemon server.js
```

- Run this command in the frontend directory to start the Vue JS application.

```
$ npm run serve
```

- The project should start running at <http://localhost:8080/>.
