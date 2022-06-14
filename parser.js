function parseConfig(data) {
    data = typeof data == 'string' ? data : data.toString()

    let lines = data.split('\r').join('').split('\n')
    let parsed = {}
    for (let l = 0; l < lines.length; l++) {
        let line = lines[l]
        line = line.split('	').join('')
        line = line.split(' ').join('')
        line = line.split('#')
        line = line[0]

        if (line) {
            line = line.split('=')
            parsed[line[0]] = line[1] && !isNaN(line[1]) ? +line[1] : line[1]
        }
    }

    return parsed;
}

function generateConfig(data) {
    let config = `# RTKLIB generated options (${getDate()})\r\n\r\n`
    for (let key in data) {
        let line = key
        line = line.length < 19 ? line + (' '.repeat(19 - line.length)) : line
        line += `=${data[key]}\r\n`;
        config += line
    }
    return config
}

function getllh(data) {
    if (data == '') return {}

    let splitted = data.split('  ').join(' ').split('  ').join(' ').split('  ').join(' ').split('\n').join('').split('\r').join('').split(' ');
    return {
        date: splitted[0],
        hour: splitted[1],
        lat: splitted[2],
        lon: splitted[3],
        h: splitted[4],
        type: splitted[5],
        vsat: splitted[6],
        sdn: splitted[7],
        sde: splitted[8],
        sdu: splitted[9],
        sdne: splitted[10],
        sdeu: splitted[11],
        sdun: splitted[12],
        age: splitted[13],
        ratio: splitted[14]
    };
}

function getDate() {
    let d = new Date();
    let year = d.getFullYear()
    let month = `0${d.getMonth()}`.slice(-2)
    let day = `0${d.getDate()}`.slice(-2)
    let hours = `0${d.getHours()}`.slice(-2)
    let minutes = `0${d.getMinutes()}`.slice(-2)
    let seconds = `0${d.getSeconds()}`.slice(-2)

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
}

module.exports = {
    parseConfig,
    generateConfig,
    getllh
}
