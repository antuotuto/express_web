const http = require("http");
const https = require("https");
const querystring = require("querystring");
const fs = require('fs')

//


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
            // let data = JSON.stringify({
            //     status: 0,
            //     data: rawData
            // })

        })
    })

    req.on('error', (e) => {
        console.error(`请求遇到问题: ${e.message}`)
    })

    req.end()
}



var http = require("http");

var options = {
    "method": "GET",
    "hostname": "www.jianshu.com",
    "port": null,
    "path": "/mobile/trending/now?page=1&count=15",
    "headers": {
        "cache-control": "no-cache",
        "postman-token": "293d1dad-380a-f575-29f8-8c6d03342de5"
    }
};

var req = http.request(options, function(res) {
    var chunks = [];

    res.on("data", function(chunk) {
        chunks.push(chunk);
    });

    res.on("end", function() {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
    });
});

req.end();


// export
module.exports = getHome