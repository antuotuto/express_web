# Express

- Express是第一代最流行的web框架，它对Node.js的http进行了封装
- 基于ES5的语法，要实现异步代码，只有一个方法：回调。
- Express 是一个自身功能极简，完全是由**路由**和**中间件**构成的一个 web 开发框架：从本质上来说，**一个 Express 应用就是在调用各种中间件**。
- Express 4 不再依赖 Connect，而且从内核中移除了除 express.static 外的**所有**内置中间件。也就是说现在的 Express 是**一个独立的路由和中间件 Web 框架**，Express 的版本升级不再受中间件更新的影响。
- 移除了内置的中间件后，您必须显式地添加所有运行应用需要的中间件。

## http服务器

- Node.js开发的目的就是为了用JavaScript编写Web服务器程序。
- 要开发HTTP服务器程序，从头处理TCP连接，解析HTTP是不现实的。这些工作实际上已经由Node.js自带的http模块完成了。
- request对象封装了HTTP请求，我们调用request对象的属性和方法就可以拿到所有HTTP请求的信息。
- response对象封装了HTTP响应，我们操作response对象的方法，就可以把HTTP响应返回给浏览器。

### http模块

应用程序并不直接和HTTP协议打交道，而是操作http模块提供的request和response对象。

## 文件服务器

- 设定一个目录，让Web程序变成一个文件服务器。
- 解析request.url中的路径，然后在本地找到对应的文件，把文件内容发送出去。

```
http模块
url 模块
    - 这个模块包含分析和解析 URL 的工具。
    - parse()方法将一个字符串解析为一个Url对象。
path模块
    - 处理本地文件目录
fs模块
    - 文件系统模块，负责读写文件
    - fs.stat 异步模式获取文件信息的语法格式。
```

## 创建Express应用

```
- $ npm install express --save
- $ npm install express-generator -g
```
- express()用来创建一个Express的程序。express()方法是express模块导出的顶层方法
- app对象一般用来表示Express程序。通过调用Express模块导出的顶层的express()方法来创建它

## 路由

- 路由是指如何定义应用的端点（URIs）以及如何响应客户端的请求。

  #### 路由方法

- 路由方法源于 **HTTP** 请求方法，和 express 实例相关联。

- Express 定义了如下和 **HTTP** 请求对应的路由方法： get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, unlock, report, mkactivity, checkout, merge, m-search, notify, subscribe, unsubscribe, patch, search, 和 connect。
- app.all() 是一个特殊的路由方法，没有任何 HTTP 方法与其对应，它的作用是对于一个路径上的所有请求加载中间件。

  #### 路由路径

- 路由路径和请求方法一起定义了请求的端点，它可以是 **字符串**、 **字符串模式** 或者 **正则表达式**。

- Express 使用 path-to-regexp 匹配路由路径。
- 查询字符串不是路由路径的一部分。

  #### 路由句柄

- 可以为请求处理提供多个回调函数，其行为类似 中间件。

- 和中间件的唯一的区别是：这些回调函数有可能调用 next('route') 方法而略过其他路由回调函数。
- 使用一个回调函数处理路由

  ```
  app.get('/example/a', function (req, res) {
  res.send('Hello from A!');
  });
  ```

- 使用多个回调函数处理路由（记得指定 next 对象）

  ```
  app.get('/example/b', function (req, res, next) {
  console.log('response will be sent by the next function ...');
  next();
  }, function (req, res) {
  res.send('Hello from B!');
  });
  ```

- 使用回调函数**数组**处理路由 ``` var cb0 = function (req, res, next) { console.log('CB0'); next(); }

var cb1 = function (req, res, next) { console.log('CB1'); next(); }

var cb2 = function (req, res) { res.send('Hello from C!'); }

app.get('/example/c', [cb0, cb1, cb2]);

```
- 混合使用**函数**和**函数数组**处理路由
```

var cb0 = function (req, res, next) { console.log('CB0'); next(); }

var cb1 = function (req, res, next) { console.log('CB1'); next(); }

app.get('/example/d', [cb0, cb1], function (req, res, next) { console.log('response will be sent by the next function ...'); next(); }, function (req, res) { res.send('Hello from D!'); });

```

#### 响应方法
- 响应对象（res）的方法向客户端返回响应，终结请求响应的循环。如果在路由句柄中一个方法也不调用，来自客户端的请求会一直挂起。

#### app.route()
- 使用 app.route() 创建路由路径的链式路由句柄。由于路径在一个地方指定，这样做有助于创建**模块化**的路由，而且减少了代码冗余和拼写错误。
#### express.Router
- 使用 express.Router 类创建**模块化**、**可挂载** 的路由句柄。Router 实例是一个完整的中间件和路由系统，因此常称其为一个 “mini-app”。
- 创建一个路由模块，加载一个中间件，定义一些路由，挂载至应用的路径上。

## 中间件
- 中间件（Middleware） 是一个函数，它可以访问请求对象（request object (req)）, 响应对象（response object (res)）, 和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 next 的变量。
- 中间件的功能包括
    - 执行任何代码。
    - 修改请求和响应对象。
    - 终结请求-响应循环。
    - 调用堆栈中的下一个中间件。
> 如果当前中间件没有终结请求-响应循环，则必须调用 next() 方法将控制权交给下一个中间件，否则请求就会挂起。

#### Express 应用可使用如下几种中间件：
- 应用级中间件
    - 应用级中间件绑定到 app 对象 使用 app.use() 和 app.METHOD()， 其中， METHOD 是需要处理的 HTTP 请求的方法
- 路由级中间件
    - 路由级中间件和应用级中间件一样，只是它绑定的对象为 express.Router()。
    - 路由级使用 router.use() 或 router.VERB() 加载。
- 错误处理中间件
    - 错误处理中间件有 4 个参数，定义错误处理中间件时必须使用这 4 个参数。即使不需要 next 对象，也必须在签名中声明它，否则中间件会被识别为一个常规中间件，不能处理错误。
- 内置中间件
    - express.static是Express中唯一的内建中间件。
    - 从 4.x 版本开始，, Express 已经不再依赖 Connect 了。除了 express.static, Express 以前内置的中间件现在已经全部单独作为模块安装使用了。
- 第三方中间件
    - 安装所需功能的 node 模块，并在应用中加载，可以在**应用级**加载，也可以在**路由级**加载。

#####
- 如果需要在**中间件栈**中跳过剩余中间件，调用 next('route') 方法将控制权交给下一个路由。
- 注意： next('route') 只对使用 app.VERB() 或 router.VERB() 加载的中间件有效。
```

// 一个中间件栈，处理指向 /user/:id 的 GET 请求 app.get('/user/:id', function (req, res, next) { // 如果 user id 为 0, 跳到下一个路由 if (req.params.id == 0) next('route'); // 否则将控制权交给栈中下一个中间件 else next(); // }, function (req, res, next) { // 渲染常规页面 res.render('regular'); });

// 处理 /user/:id， 渲染一个特殊页面 app.get('/user/:id', function (req, res, next) { res.render('special'); });

```
#####
- app.use([path,], function [, function...]),挂载中间件方法到路径上。如果路径未指定，那么默认为"/"。
- 由于默认的路径为/，中间件挂载没有指定路径，那么对于每个请求，这个中间件都会被执行。
- 中间件方法是顺序处理的，所以**中间件包含的顺序**是很重要的。

## 模板引擎
#### 需要在应用中进行如下设置才能让 Express 渲染模板文件：
- views, 放模板文件的目录，比如： app.set('views', './views')
- view engine, 模板引擎，比如： app.set('view engine', 'jade')
- 然后安装相应的模板引擎 npm 软件包。
```

$ npm install jade --save

```

## 错误处理
- 定义错误处理中间件和定义其他中间件一样，除了需要 4 个参数，而不是 3 个，其格式如下 (err, req, res, next)。
- 在其他 app.use() 和路由调用后，**最后** 定义错误处理中间件。
```

var bodyParser = require('body-parser'); var methodOverride = require('method-override');

app.use(bodyParser()); app.use(methodOverride()); app.use(function(err, req, res, next) { // 业务逻辑 });

```
- 中间件返回的响应是随意的，可以响应一个 HTML 错误页面、一句简单的话、一个 JSON 字符串，或者其他任何您想要的东西。
- 为了便于组织（更高级的框架），您可能会像定义常规中间件一样，定义多个错误处理中间件。比如您想为使用 XHR 的请求定义一个，还想为没有使用的定义一个，那么：
- 如果向 next() 传入参数（除了 ‘route’ 字符串），**Express 会认为当前请求有错误的输出**，因此跳过后续其他**非**错误处理和路由/中间件函数。如果需做特殊处理，需要创建新的错误处理路由。
- **如果路由句柄有多个回调函数，可使用 ‘route’ 参数跳到下一个路由句柄。**

#### 缺省错误处理句柄
- Express 内置了一个错误处理句柄，它可以捕获应用中可能出现的任意错误。这个缺省的错误处理中间件将被添加到**中间件堆栈**的底部。
- 如果你向 next() 传递了一个 error ，而你并没有在**错误处理句柄**中处理这个 error，**Express 内置的缺省错误处理句柄就是最后兜底的**。最后错误将被连同堆栈追踪信息一同反馈到客户端。堆栈追踪信息并不会在生产环境中反馈到客户端。
- 如果你已经开始向 response 输出数据了，这时才调用 next() 并传递了一个 error，比如你在将向客户端输出数据流时遇到一个错误，Express 内置的缺省错误处理句柄将帮你关闭连接并告知 request 请求失败。
- 因此，当你添加了一个自定义的错误处理句柄后，如果已经向客户端发送包头信息了，你还可以将错误处理交给 Express 内置的错误处理机制。


## 调试Express
```

$ DEBUG=express:* node app.js $ DEBUG=express:router node app.js //只查看路由部分的日志； $ DEBUG=express:application node app.js //只查看应用部分的日志

```
## 进程管理器
## 4.15.1 申请 MLab

[MLab](https://mlab.com) (前身是 MongoLab) 是一个 mongodb 云数据库提供商，我们可以选择 500MB 空间的免费套餐用来测试。注册成功后，点击右上角的 `Create New` 创建一个数据库（如: myblog），成功后点击进入到该数据库详情页，注意页面中有一行黄色的警告：
```

A database user is required to connect to this database. To create one now, visit the 'Users' tab and click the 'Add database user' button.

```

每个数据库至少需要一个 user，所以我们点击 Users 下的 `Add database user` 创建一个用户。

> 注意：不要选中 `Make read-only`，因为我们有写数据库的操作。

最后分配给我们的类似下面的 mongodb url：
```

mongodb://

<dbuser>:<dbpassword>@ds139327.mlab.com:39327/myblog</dbpassword></dbuser>

```

如我创建的用户名和密码都为 myblog 的用户，新建 config/production.js，添加如下代码：

**config/production.js**
```

module.exports = { mongodb: 'mongodb://myblog:myblog@ds139327.mlab.com:39327/myblog' };

```

停止程序，然后以 production 配置启动程序:
```

NODE_ENV=production supervisor --harmony index

```

> 注意：Windows 用户安装 [cross-env](https://www.npmjs.com/package/cross-env)，使用：
>
```

> cross-env NODE_ENV=production supervisor --harmony index ```
