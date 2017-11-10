const express = require('express');
const router = express.Router();

const jianshu = require('../packages/spider/jianshu')


router.get('/', async function(req, res, next) {
    let data = await jianshu.mobile.getList(1, 20).catch(function(err) {
        console.log(err);
    });
    res.render('jianshu.html', { data })
})

router.get('/p/:id', async function(req, res, next) {
    let id = req.params.id;

    let data = await jianshu.mobile.getDetail(id).catch(function(err) {
        console.log(err);
    });
    res.render('jianshu-detail.html', { data })
})


module.exports = router;