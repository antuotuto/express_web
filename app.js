var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
//
var index = require('./routes/index');
var users = require('./routes/users');
var test = require('./routes/test');
var qiniu = require('./routes/qiniu');
var spider = require('./routes/spider');
var jianshu = require('./routes/jianshu');
//
var app = express();
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
    res.header("Access-Control-Allow-Headers", "Authorization,Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Expose-Headers", 'other fields')
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Max-Age", 1728000)
    res.header("Server", 'my-express-server')
    res.header("X-Powered-By", '1318642680@qq.com')
    next();
});
// custom
app.all('*', function(req, res, next) {
    res.header("Cache-control", 'no-cache')
    res.header("WHO-IS-THE-NEXT", 'ME')
    next();
});
//
var nunjucks = require('nunjucks')
nunjucks.configure(path.join(__dirname, 'views'), {
    autoescape: true,
    noCache: true,
    express: app,
});
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
}));

app.use('/', index);
app.use('/users', users);
app.use('/test', test);
app.use('/qiniu', qiniu);
app.use('/spider', spider);
app.use('/jianshu', jianshu);
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;