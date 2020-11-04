const telnet = require('telnet-client')

class Telnet {
    constructor(options) {
        this.params = Object.assign({
            host: 'localhost',
            port: 3200,
            shellPrompt: 'rtkrcv> ',
            timeout: 3000,
            negotiationMandatory: false,
            ors: '\r\n',
            waitfor: '\n',
            password: 'admin'
        }, options)

        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.exec = this.exec.bind(this);
        return this;
    }

    connect() {
        this.connection = new telnet()
        return new Promise((resolve, reject) => {
            this.connection.connect(this.params).then(() => {
                this.connection.exec(this.params.password).then((res) => {
                    resolve(this.connection);
                }).catch(err => {
                    reject(err)
                });
            }).catch(err => {
                reject(err)
            });
        });
    }

    disconnect() {
        return this.connection.end();
    }

    exec(cmd) {
        return new Promise((resolve, reject) => {
            this.connection.exec(cmd).then(res => {
                cmd == 'status' ? resolve(this.parse(res)) : resolve(res);
            }).catch(err => {
                reject(err)
            });
        });
    }

    parse(str = '', header = true) {
        str = str.split('\x1B[0m').join('').split('\x1B[1m').join('').split('\u001b[1m').join('').split('\u001b[0m');
        let lines = (str[1] || str[0]).split('��\x03��\x01').join('').split('\n');
        let result = {}
        for (let l = header ? 1 : 0; l < lines.length; l++) {
            let line = lines[l]
            line = line.split(': ');
            line[0] = line[0].split('  ').join(' ').split('  ').join('')
            line[0] = line[0].endsWith(' ') ? line[0].substring(0, line[0].length - 1) : line[0]
            if (line[0] && line[0] != 'Parameter') {
                result[line[0]] = line[1];
            }
        }
        return result;
    }
}

module.exports = Telnet;