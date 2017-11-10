/**
 *
 * GET /p/3d8fef1ae9da HTTP/1.1
 *
 */

const cheerio = require('cheerio');
const replaceText = require('../../../utils/trim')


module.exports = getDetail


function getDetail(id) {

    var path = `/p/${id}`;

    var promise = new Promise(function(resolve, reject) {
        var http = require("http");

        var options = {
            "method": "GET",
            "hostname": "www.jianshu.com",
            "port": 80,
            "path": path,
            "headers": {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'User-Agent': 'Mozilla / 5.0(iPhone; CPU iPhone OS 9 _1 like Mac OS X) AppleWebKit / 601.1 .46(KHTML, like Gecko) Version / 9.0 Mobile / 13 B143 Safari / 601.1',
            }
        };

        var req = http.request(options, function(res) {
            var chunks = [];

            res.on("data", function(chunk) {
                chunks.push(chunk);
            });

            res.on("end", function() {
                let body = Buffer.concat(chunks);
                let html = body.toString();
                let data = getData(html);

                resolve(data)
            });
        });

        req.on('error', (e) => {
            reject(err);
        })

        req.end();
    });

    return promise;
}

function getData(htmlStr) {
    // 解析数据
    let $ = cheerio.load(htmlStr);

    // 获取容器，存放在变量里，方便获取
    let $post = $('div.container.note');

    // json数据结构
    let data = {
        article: {
            // id: note.note.id,
            // slug: note.note.slug,
            title: replaceText($post.find('h1.title').text()),
            content: replaceText($post.find('[data-note-content].content').html()),
            // publishTime: replaceText($post.find('.article .publish-time').text()),
            // wordage: $post.find('.article .wordage').text().match(/\d+/g)[0] * 1,
            // views_count: note.note.views_count,
            // comments_count: note.note.comments_count,
            // likes_count: note.note.likes_count
        },
        author: {
            // id: note.note.user_id,
            // slug: $post.find('.avatar').attr('href').replace(/\/u\//, ""),
            // avatar: $post.find('.avatar img').attr('src'),
            // nickname: replaceText($post.find('.author .name a').text()),
            // signature: replaceText($post.find('.signature').text()),
            // total_wordage: note.note.author.total_wordage,
            // followers_count: note.note.author.followers_count,
            // total_likes_count: note.note.author.total_likes_count
        }
    }

    let custom = {
        source: 'jianshu.com',
    }

    Object.assign(data, custom)

    return data;
}