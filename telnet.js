const telnet = require('telnet-client')

class Telnet {
    constructor(options) {
        this.params = {
            host: 'localhost',
            port: 3200,
            shellPrompt: 'rtkrcv> ',
            timeout: 3000,
            negotiationMandatory: false,
            ors: '\r\n',
            waitfor: '\n'
        }

        return this;
    }

    connect() {
        let connection = new telnet()
        return new Promise((resolve, reject) => {
            connection.connect(this.params).then(() => {
                connection.exec('admin').then((res) => {
                    console.log('login:', res);
                    resolve(connection);
                }).catch(err => {
                    console.error(err)
                });
            });
        });
    }

    exec(cmd) {
        return new Promise((resolve, reject) => {
            this.connection.exec(cmd).then(res => {
                resolve(this.parse(res));
            });
        });
    }

    parse(str = '', header = true) {
        str = str.split('\x1B[0m').join('').split('\x1B[1m').split('\u001b[1m').join('').split('\u001b[0m');
        let lines = str[1].split('\n');
        let result = {}
        for(let l = header ? 1 : 0; l < lines.length; l++) {
            let line = lines[l]
            line = line.split(': ');
            line[0] = line[0].split('  ').join(' ').split('  ').join('')
            result[line[0]] = line[1];
        }
        return result;
    }
}

module.exports = Telnet;