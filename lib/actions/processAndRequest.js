const request = require('request-promise');
const { messages } = require('elasticio-node');

const methodsMap = {
  GET: 'get',
};

/**
 * Des: 
 * - Takes the files array, splits and makes a formatted REST call
 * - Emits each res to the platform
 * @param {Object} msg message incoming from the platform
 * @param {Object} cfg config fields
 */
module.exports.process = async function process(msg, cfg) {

  const { files } = cfg;
  const { host, startDate, endDate } = msg.body;

  this.logger.info(`Here's the message ${JSON.stringify(msg.body)}`)
  this.logger.info(`Here's the cfg ${JSON.stringify(cfg)}`)

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