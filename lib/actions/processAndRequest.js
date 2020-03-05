const request = require('request-promise');
const { messages } = require('elasticio-node');

const methodsMap = {
  DELETE: 'delete',
  GET: 'get',
  PATCH: 'patch',
  POST: 'post',
  PUT: 'put',
};

/**
 * @param {Object} msg 
 * @param {Object} cfg 
 */
async function processAction(msg, cfg) {

  const { files } = cfg;
  const { host, startDate, endDate } = msg.body;

  this.logger.info(`Here's the host: ${host}, startDate: ${startDate}, endDate: ${endDate}`);

  let requestOptions;

  for (let i=0; i<files.length; i++) {
    
    requestOptions = { method: methodsMap.GET , uri: `https://${files[i]}/bin/iflib/api/useage.php?cid=${host}&start=${startDate}&end=${endDate}` };
    const response = await request(requestOptions);

    this.logger.info(`Here's the response: ${response}`);

    if ( res.statusCode < 400 ) { /* Only emit with valid responses */

      this.emit('data', messages.newMessageWithBody(response));
    }

  }
}

exports.process = processAction;
