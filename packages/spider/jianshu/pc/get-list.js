const fs = require('fs');
const cheerio = require('cheerio');
const axios = require('axios');

const replaceText = require('../../../utils/trim')


const instance = axios.create({
    baseURL: 'http://www.jianshu.com/',
    timeout: 1000,
    headers: {
        /*pc端*/
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
    }
})


module.exports = getList;


//async await
async function getList() {

    var path = '';

    // 请求页面
    let res = await instance.get(path).catch(function(err) {
        console.log(err);
    });

    // 解析数据
    let $ = cheerio.load(res.data);

    // 生成数据
    let data = [];

    // 获取数据
    $('#list-container .note-list li').each(function(index, item) {
        let self = $(item);

        // 定义数据结构
        let source = {
            id: self.attr('data-note-id'),
            title: replaceText(self.find('.title').text()),
            abstract: replaceText(self.find('.abstract').text()),
            thumbnails: self.find('.wrap-img img').attr('src'),
            reads_count: replaceText(self.find('.ic-list-read').parent().text()) * 1,
            comments_count: replaceText(self.find('.ic-list-comments').parent().text()) * 1,
            likes_count: replaceText(self.find('.ic-list-like').parent().text()) * 1,
            collection_tag: replaceText(self.find('.collection-tag').text()),
            slug: self.find('.title').attr('href').replace(/\/p\//, ""),
            author: {
                slug: self.find('.avatar').attr('href').replace(/\/u\//, ""),
                avatar: self.find('.avatar img').attr('src'),
                nickname: replaceText(self.find('.nickname').text()),
                sharedTime: self.find('.time').attr('data-shared-at')
            },
        }

        let custom = {
            source: 'jianshu.com',
        }

        Object.assign(source, custom)

        data.push(source)
    })

    return data;
}