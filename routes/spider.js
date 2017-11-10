var express = require('express');
var router = express.Router();

const jianshu = require('../packages/spider/jianshu')

router.get('/test', async function(req, res, next) {
    let data = await jianshu.mobile.getHome().catch(function(err) {
        console.log(err);
    });
    res.send(data)
})

router.get('/jianshu', async function(req, res, next) {
    let data = await jianshu.pc.getHome().catch(function(err) {
        console.log(err);
    });
    console.log(data)
    res.render('jianshu.html', { data })
})


module.exports = router;