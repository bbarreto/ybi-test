# YBI Test

This app was created using Node.js, React and Redis.

It was deployed to Heroku. You can run it locally following the instructions below.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone https://github.com/bbarreto/ybi-test.git # or clone your own fork
$ cd ybi-test
$ npm install
$ npm start
```

Create a .env file with your settings using the .env.example.

To build the frontend:

```sh
$ cd frontend
$ yarn build
```

This will build the react app that will be served by the Express server.

After the build, the app should be running on [localhost:5000](http://localhost:5000/).
