# rtklib-util
> utility to work with rtklib using node.js

## Parser
- parseConfig

```js
const rtklib = require('rtklib');

let json = rtklib.config2JSON(myConfigString);
```

```js
const fs = require('fs');
const rtklib = require('rtklib');

fs.readFile('test.conf', (err, data) => {
    let json = rtklib.config2JSON(data);
});
```

- generateConfig

```js
const rtklib = require('rtklib');
let config = rtklib.JSON2config(json);
```

## Telnet
- constructor
```js
const rtklib = require('rtklib');

let telnet = new rtklib.telnet();
```

```js
const rtklib = require('rtklib');

let telnet = new rtklib.telnet({
    host: '192.168.0.128',
    port: 3200,
    password: 'password'
});
```

- connect
```js
const rtklib = require('rtklib');

let telnet = new rtklib.telnet();
telnet.connect().then(() => {
    console.log('Connected and authenticated!');
}).catch(error => {
    console.log(error);
});
```

- exec
```js
const rtklib = require('rtklib');

new rtklib.telnet().connect().then(connection => {
    connection.exec('status').then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error);
    });
}).catch(error => {
    console.log(error);
});
```

- disconnect
```js
telnet.disconnect();
```
