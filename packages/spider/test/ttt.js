const http = require("http");
const https = require("https");
const querystring = require("querystring");
const fs = require('fs')

//
const options = {
    hostname: 'www.jianshu.com',
    port: 80,
    path: '',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        /*手机端*/
        'User-Agent': 'Mozilla / 5.0(iPhone; CPU iPhone OS 9 _1 like Mac OS X) AppleWebKit / 601.1 .46(KHTML, like Gecko) Version / 9.0 Mobile / 13 B143 Safari / 601.1',
    }
};

const getHome = () => {
    const req = http.request(options, (res) => {
        console.log(`状态码: ${res.statusCode}`);
        console.log(`响应头: ${JSON.stringify(res.headers)}`);

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => {
            console.log(`响应主体: ${chunk}`);
            rawData += chunk;
        });
        res.on('end', () => {

            let data = rawData
            fs.writeFile(__dirname + '/data/article.html', data, function(err) {
                if (err) throw err;
                console.log('写入完成');
            })
        })
    })

    req.on('error', (e) => {
        console.error(`请求遇到问题: ${e.message}`)
    })

    req.end()
}


// export
module.exports = getHome