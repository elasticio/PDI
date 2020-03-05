const jsonata = require('@elastic.io/jsonata-moment');
const request = require('request-promise');
const { messages } = require('elasticio-node');
const xml2js = require('xml2js-es6-promise');

const methodsMap = {
  DELETE: 'delete',
  GET: 'get',
  PATCH: 'patch',
  POST: 'post',
  PUT: 'put',
};

async function processAction(msg, cfg) {}

exports.process = processAction;
