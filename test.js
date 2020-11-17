const fs = require('fs');
const rtklib = require('./index.js');

function parser_test() {
    fs.readFile('test.conf', (err, data) => {
        let json = rtklib.config2JSON(data);
        let string = rtklib.JSON2config(json);

        fs.writeFile('result.conf', string, (err) => {
            if (err) throw new Error(err);

            fs.readFile('result.conf', (err, data) => {
                let newjson = rtklib.config2JSON(data);

                for (let key in json) {
                    if (newjson[key] !== json[key]) throw new Error(key);
                }
            });
        });
    });
}

function telnet_test() {
    let telnet = new rtklib.telnet({ host: '192.168.0.140' });
    telnet.connect().then(() => {
        telnet.exec('status').then(response => {
            if(Object.keys(response).length < 48) {
                throw new Error('Telnet status error')
            }
            else {
                telnet.disconnect();
                console.log('\x1b[32m', 'OK')
                console.log('\x1b[0m', '');
            }
        })
    });
}

function llh_test() {
    let llh = '2020/11/14 18:17:49.000  -27.552285908  -48.656709107   598.2595   1   8   1.4625   1.9040   4.1178   0.3356  -1.0922  -0.3435   1.00    1.0';
    let json = rtklib.llh2JSON(llh);
    if(Object.keys(json).length != 15) throw new Error('llh');
}

llh_test();
parser_test();
telnet_test();