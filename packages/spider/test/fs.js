const temp = require('temp');

var data = JSON.stringify({
    status: 0,
    data: rawData
})

const writeData = (data, filename) => {
    fs.writeFile(__dirname + `/data/${filename}`, data, function(err) {
        if (err) throw err;
        console.log('写入完成');
    })
}

writeData(data, 'data.json')