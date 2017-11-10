/**
 *
 * GET /mobile/trending/now?page=1&count=15 HTTP/1.1
 *
 */


module.exports = getList;


function getList(page, count) {

    var path = `/mobile/trending/now?page=${page}&count=${count}`;

    var promise = new Promise(function(resolve, reject) {
        var http = require("http");

        var options = {
            "method": "GET",
            "hostname": "www.jianshu.com",
            "port": 80,
            "path": path,
            "headers": {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla / 5.0(iPhone; CPU iPhone OS 9 _1 like Mac OS X) AppleWebKit / 601.1 .46(KHTML, like Gecko) Version / 9.0 Mobile / 13 B143 Safari / 601.1',
            }
        };

        var req = http.request(options, function(res) {
            var chunks = [];

            res.on("data", function(chunk) {
                chunks.push(chunk);
            });

            res.on("end", function() {
                var body = Buffer.concat(chunks);
                var data = body.toString();
                resolve(JSON.parse(data))
            });
        });

        req.on('error', (e) => {
            reject(err);
        })

        req.end();
    });

    return promise;
}