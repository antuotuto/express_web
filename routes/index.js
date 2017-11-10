var express = require('express');
var router = express.Router();


const jianshu = require('../packages/spider/jianshu')


/* GET home page. */
router.get('/', async function(req, res, next) {
    let data = await jianshu.mobile.getList(1, 20).catch(function(err) {
        console.log(err);
    });
    res.render('index.html', { data })
})


module.exports = router;