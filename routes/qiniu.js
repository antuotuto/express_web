var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var qiniu = require('qiniu');

    var accessKey = 'r6JupFNpmBdH2iXEIIJ4LHG9ch1cVeh95xMToU2E';
    var secretKey = '_uDcdo_CIoX_Y0TsU1lbB4HEHrafGcVkz2rdmMBn';
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

    bucket = 'some78';
    var options = {
        scope: bucket,
        expires: 7200,
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);
    console.log(uploadToken)

    var config = new qiniu.conf.Config();
    // 空间对应的机房
    config.zone = qiniu.zone.Zone_z0;

    var localFile = "/Users/guoliang/myart/storage/app/express_web/public/images/xiaobian.jpg";
    var formUploader = new qiniu.form_up.FormUploader(config);
    var putExtra = new qiniu.form_up.PutExtra();
    var key = 'test.jpg';
    // 文件上传
    formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr, respBody, respInfo) {
        if (respErr) {
            throw respErr;
        }
        if (respInfo.statusCode == 200) {
            console.log(respBody);
        } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
            res.send(respBody)
        }
    });


})

router.get('/uptoken', function (req, res, next) {
    var qiniu = require('qiniu');

    var accessKey = 'r6JupFNpmBdH2iXEIIJ4LHG9ch1cVeh95xMToU2E';
    var secretKey = '_uDcdo_CIoX_Y0TsU1lbB4HEHrafGcVkz2rdmMBn';
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

    bucket = 'some78';
    var options = {
        scope: bucket,
        expires: 7200,
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);
    console.log(uploadToken)
    res.send(uploadToken)
})


module.exports = router;