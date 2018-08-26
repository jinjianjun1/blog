# 设置了路由的服务器
在终端输入命令 node server.js 打开服务器端口9000
在浏览器上输入localhost:9000进入页面
服务器包含了静态以及命令
var http = require('http')   
var path = require('path')
var fs = require('fs')
var url = require('url')

var routes = {
  '/a': function(req, res){
    res.end(JSON.stringify(req.query))
  },

  '/b': function(req, res){
    res.end('match /b')
  },

  '/a/c': function(req, res){
    res.end('match /a/c')
  },

  '/search': function(req, res){
    res.end('username='+req.body.username+',password='+req.body.password)

  }

}


var server = http.createServer(function(req, res){
  routePath(req, res)
})

server.listen(8080)
console.log('visit http://localhost:8080' )


function routePath(req, res){
  var pathObj = url.parse(req.url, true)
 
  var handleFn = routes[pathObj.pathname]
  if(handleFn){
    req.query = pathObj.query

    //参考 https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
    // post json 解析
    var body = ''
    req.on('data', function(chunk){
      body += chunk
    }).on('end', function(){
      req.body = parseBody(body)
      handleFn(req, res)
    })
    
  }else {
    sampleRoot(path.resolve(__dirname, 'sample'), req, res)
  }
}

function sampleRoot(samplePath, req, res){
  var pathObj = url.parse(req.url, true)
  var filePath = path.join(samplePath, pathObj.pathname)
  fs.readFile(filePath,'binary', function(err, content){
    if(err){
      res.writeHead('404', 'haha Not Found')
      return res.end()
    }

    res.writeHead(200, 'Ok')
    res.write(content, 'binary')
    res.end()  
  })

}

function parseBody(body){
  console.log(body)
  var obj = {}
  body.split('&').forEach(function(str){
    obj[str.split('=')[0]] = str.split('=')[1]
  })
  return obj
}