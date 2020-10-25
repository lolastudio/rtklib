const fs = require('fs');

fs.readFile('./local.conf', (err, data) => {
    parseConfig(data);
})

function parseConfig(data) {
    let lines = data.toString().split('\r');
    let parsed = {};
    for(let l of lines) {
        l = l.split('\n').join('');
        l = l.split('	').join('')
        l = l.split(' ').join('');
        l = l.split('#');
        l = l[0]
        if(l) {
            l = l.split('=')
            parsed[l[0]] = l[1] && !isNaN(l[1]) ? +l[1] : l[1];
        }
    }
    console.log(parsed)
}