const parser = require('./parser.js');
const telnet = require('./telnet.js');

module.exports = {
    config2JSON: parser.parseConfig,
    JSON2config: parser.generateConfig,
    llh2JSON: parser.getllh,
    telnet
}