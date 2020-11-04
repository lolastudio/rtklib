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

parser_test();
telnet_test();