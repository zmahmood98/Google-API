# Google API

## Installation and Usage

### Installation

1. Clone the repo using `git clone`
2. Enter the directory `cd Google-API`
3. Install dependencies `npm install`

### Usage

* Server
  - `npm start` to start the API server.
  - `npm test` to run API tests.
  - `npm run dev` to start the API server with `nodemon`.
* Client
  - In the `client/` directory run a server of your choice to start the client server e.g. [`http-server`](https://www.npmjs.com/package/http-server) (node) or [`python -m http.server`](https://pythonbasics.org/webserver/) (python)
  - Alternatively, open `client/index.html` in a browser.

## Changelog

### client/index.html
* changed form to use `get` method

### client/result.html
* made logo to link back to hom

### client/index.js
* changed `getData` function to use callback
* implemented I'm Feeling Lucky button functionality

### client/searchResults.js
* added related searches when rendering results

### package.json
* changed package name to be lowercase

### app.js
* added `/search` route
* added default behaviour on root `/`

### routes/searchRoutes.js
* added route for `GET /search?q=` to search through data

## Bugs

### Client
- [x] javascript file not linked to index.html
- [x] error is thrown if no results found after clicking I'm Feeling Lucky
- [x] tries to search for empty string
- [x] typing special chars into search such as `&` or `=` breaks API call
- [x] typing regex chars into search breaks string frequency function

### API
- [x] `/search` alone doesn't respond with the correct error
- [x] `/search?q=` responds with all data regardless of search string
- [x] logic in `/search` continues to run after invalid request is detected
- [x] `[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client` error from console when accessing `/search`
