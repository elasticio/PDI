const request = require('request-promise');
const { messages } = require('elasticio-node');

const methodsMap = {
  GET: 'get',
};

/**
 * @param {Object} msg 
 * @param {Object} cfg 
 */
module.exports.process = async function process(msg, cfg) {

  const { files } = cfg;
  const { host, startDate, endDate } = msg.body;

  this.logger.info(`Here's the host: ${host}, startDate: ${startDate}, endDate: ${endDate}`);

  let requestOptions;

  for (let i=0; i<files.length; i++) {
    
    requestOptions = { method: methodsMap.GET , uri: `https://${files[i]}/bin/iflib/api/useage.php?cid=${host}&start=${startDate}&end=${endDate}` };
    const response = await request(requestOptions);

    this.logger.info(`Here's the response: ${response}`);

    if ( response.statusCode < 400 ) { /* Only emit with valid responses */

      this.emit('data', messages.newMessageWithBody(response));
    }

  }
}

exports.process = processAction;
