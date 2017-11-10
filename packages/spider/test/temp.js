const getHome = () => {
    var http = require("http");

    var options = {
        "method": "GET",
        "hostname": "www.jianshu.com",
        "port": 80,
        "path": "/mobile/trending/now?page=1&count=15",
        "headers": {
            'Accept': 'application/json',
            "Referer": "http://www.jianshu.com/",
            "cache-control": "no-cache",
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
            console.log(data)
        });
    });

    req.end();
}

// export
module.exports = getHome