const fs = require('fs'); // pull in the file system module

const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);
const cssStyles = fs.readFileSync(`${__dirname}/../client/default-styles.css`);
const jokePage = fs.readFileSync(`${__dirname}/../client/joke-client.html`);
const messagePage = fs.readFileSync(`${__dirname}/../client/lofi-messages.html`);
const homePage = fs.readFileSync(`${__dirname}/../client/index.html`);
const writePage = fs.readFileSync(`${__dirname}/../client/write-message.html`);
const musicPage = fs.readFileSync(`${__dirname}/../client/music-list.html`);
const suggestPage = fs.readFileSync(`${__dirname}/../client/suggest.html`);
const adminPage = fs.readFileSync(`${__dirname}/../client/admin.html`);

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

const getWritePage = (request, response, params, acceptedTypes) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(writePage);
  response.end();
};

const getMusicPage = (request, response, params, acceptedTypes) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(musicPage);
  response.end();
};

const getSuggestPage = (request, response, params, acceptedTypes) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(suggestPage);
  response.end();
};

const getAdminPage = (request, response, params, acceptedTypes) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(adminPage);
  response.end();
};

const getMessageResponse = (request, response, params, acceptedTypes) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(messagePage);
  response.end();
};

const getHomeResponse = (request, response, params, acceptedTypes) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(homePage);
  response.end();
};

module.exports = {
  get404Response,
  getCSSResponse,
  getJokePage,
  getMessageResponse,
  getHomeResponse,
  getWritePage,
  getMusicPage,
  getSuggestPage,
  getAdminPage,
};
