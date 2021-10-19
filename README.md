# Weather Page SPA

This project is developed by ReactJS ([create-react-app](https://github.com/facebook/create-react-app)) and using [mui](https://mui.com) UIKits for components and grids styling . This is an opensource project and we are using public APIs to render or fetch data. here is a list of origins which we are using for requesting data:

- https://autocomplete.travelpayouts.com to load city lists (`rest api`)
- https://api.openweathermap.org to load historical weather information's of a city (`rest api`)
- https://api.openweathermap.org to load information's of cities within a geographical area (`rest api`)
- https://graphql-weather-api.herokuapp.com to load current weather information of a city (`graphql`)

Some of origins are semi-private and we registered to get api tokens. But their limitations are enough to check project and features.

## how to use

This project has a [live demo](https://mr-exception.github.io/weather-page/) and you can check all features without installing it on your local environment.

> The Live demo is on GitHub pages and because of GitHub pages limitations we were unable to use any built-in navigation packages like `react-router-dom` or `react-navigation`. As a result we implemented a hand-made solution working in hash and query parameters.

## Requirements

- NodeJS
- Yarn (preferred) or NPM as package managers

## Setup

Clone the project into your local environment or any webserver which is supporting our Requirements then:

```bash
$ yarn

yarn install v1.22.5
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
Done in 11.91s.

$ yarn start

Compiled successfully!

You can now view create-react-app-with-typescript in the browser.

  Local:            http://localhost:3001/weather-page
  On Your Network:  http://10.6.3.8:3001/weather-page

Note that the development build is not optimized.
To create a production build, use yarn build.

```

or with NPM:

```bash
$ npm i

added 441 packages from 112 contributors, removed 251 packages, updated 1504 packages and audited 1949 packages in 515.657s

$ npm start

Compiled successfully!

You can now view create-react-app-with-typescript in the browser.

  Local:            http://localhost:3001/weather-page
  On Your Network:  http://10.6.3.8:3001/weather-page

Note that the development build is not optimized.
To create a production build, use npm run build.

```

## Build

You can build the project and have a bundled output containing just `html/css/js` files to serve it on any webserver you want.

```bash
$ yarn run build

yarn run v1.22.5
$ react-scripts build
Creating an optimized production build...
Compiled successfully.

File sizes after gzip:

  219.43 KB (+33 B)  build\static\js\2.2dc841be.chunk.js
  33.37 KB           build\static\js\main.50ae21de.chunk.js
  799 B              build\static\js\runtime-main.f254abc2.js

The project was built assuming it is hosted at /weather-page/.
You can control this with the homepage field in your package.json.

The build folder is ready to be deployed.

Find out more about deployment here:

  https://cra.link/deployment

Done in 35.98s.
```

or with NPM

```bash
$ npm run build

$ react-scripts build
Creating an optimized production build...
Compiled successfully.

File sizes after gzip:

  219.43 KB (+33 B)  build\static\js\2.2dc841be.chunk.js
  33.37 KB           build\static\js\main.50ae21de.chunk.js
  799 B              build\static\js\runtime-main.f254abc2.js

The project was built assuming it is hosted at /weather-page/.
You can control this with the homepage field in your package.json.

The build folder is ready to be deployed.

Find out more about deployment here:

  https://cra.link/deployment

Done in 35.98s.
```

## Deploy

You can deploy the project into GitHub pages. After cloning (or forking) the project, you have to change the `homepage` value in `package.json` to a new URL like `http://[username].github.io/[repo-name]`

> You can't use the current homepage URL because you don't have access to this page. Create another repository and change the cloned project origins to that or fork this project from GitHub

Run this command to start deployment progress:

```bash
$ yarn run deploy
```

or with NPM:

```bash
$ npm run deploy
```

This command will create a new branch named `gh-pages` and commits project bundles on it. branch `gh-pages` is known as a reserved branch for GitHub pages and GitHub will serve it on `http://[username].github.io/[repo-name]`

## Test

You can run test cases by:

```bash
$ yarn run test
```

or with NPM:

```bash
$ npm run test
```
