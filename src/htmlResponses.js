const fs = require('fs'); // pull in the file system module

const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);
const cssStyles = fs.readFileSync(`${__dirname}/../client/default-styles.css`);
const jokePage = fs.readFileSync(`${__dirname}/../client/joke-client.html`);
const messagePage = fs.readFileSync(`${__dirname}/../client/lofi-messages.html`);

const get404Response = (request, response, params, acceptedTypes) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write(errorPage);
  response.end();
};

const getCSSResponse = (request, response, params, acceptedTypes) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(cssStyles);
  response.end();
};

const getJokePage = (request, response, params, acceptedTypes) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(jokePage);
  response.end();
};

const getMessageResponse = (request, response, params, acceptedTypes) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(messagePage);
  response.end();
};

module.exports = {
  get404Response, getCSSResponse, getJokePage, getMessageResponse
};
