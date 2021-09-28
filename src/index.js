// console.log("First web service starting up...");

// 1 - pull in the HTTP server module
const http = require('http');

// 2 - pull in URL and query modules (for URL parsing)
const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const imgHandler = require('./imageResponses.js');

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getHomeResponse,
  '/random-message': jsonHandler.getLofiMessage,
  '/default-styles.css': htmlHandler.getCSSResponse,
  '/lofi-image.png': imgHandler.getLofiImage,
  '/lofi-messages': htmlHandler.getMessageResponse,
  '/joke-client.html': htmlHandler.getJokePage,
  '/write': htmlHandler.getWritePage,
  '/music-list': htmlHandler.getMusicPage,
  '/suggest': htmlHandler.getSuggestPage,
  '/admin': htmlHandler.getAdminPage,
  '/getUsers': jsonHandler.getUsers,
  notFound: htmlHandler.get404Response,
};

// Handling requests to post something
const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/addUser') {
    const body = [];

    // If there is an error
    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    // If there is new information coming in
    request.on('data', (chunk) => {
      body.push(chunk);
    });

    // Once all the information has come in
    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);

      jsonHandler.addUser(request, response, bodyParams);
    });
  }
};

// 6 - this is the function that will be called every time a client request comes in
// this time we will look at the `pathname`, and send back the appropriate page
// note that in this course we'll be using arrow functions 100% of the time in our server-side code
const onRequest = (request, response) => {
  // console.log(request.headers);
  const parsedUrl = url.parse(request.url);
  const acceptedTypes = request.headers.accept.split(',');
  const { pathname } = parsedUrl;
  console.log('parsedUrl=', parsedUrl);
  console.log('acceptedTypes=', acceptedTypes);
  // console.log("pathname=", pathname);

  const params = query.parse(parsedUrl.query);
  const { limit } = params;
  const httpMethod = request.method;
  console.log('params=', params);
  console.log('limit=', limit);

  // Check if it is a post request or get request
  if (httpMethod === 'POST') {
    handlePost(request, response, parsedUrl);
  } else if (urlStruct[pathname]) {
    urlStruct[pathname](request, response, params, acceptedTypes, httpMethod);
  } else {
    urlStruct.notFound(request, response);
  }
};

// 7 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port); // method chaining!

// console.log(`Listening on 127.0.0.1: ${port}`);
