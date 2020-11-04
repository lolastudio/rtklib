const fs = require('fs');
const rtklib = require('./index.js');

fs.readFile('test.conf', (err, data) => {
    let json = rtklib.config2JSON(data);
    let string = rtklib.JSON2config(json);

    fs.writeFile('result.conf', string, (err) => {
        if(err) throw new Error(err);

        fs.readFile('result.conf', (err, data) => {
            let newjson = rtklib.config2JSON(data);

            for(let key in json) {
                if(newjson[key] !== json[key]) throw new Error(key);
            }

            console.log('\x1b[32m' ,'OK')
            console.log('\x1b[0m', '');
        });
    });
});