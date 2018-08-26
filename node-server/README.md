# 设置了路由的服务器
在终端输入命令 node server.js 打开服务器端口9000
在浏览器上输入localhost:9000进入页面
服务器包含了静态以及命令
var http = require('http')   
var path = require('path')
var fs = require('fs')
var url = require('url')
//↓ 这一部分设置路径，mock接口设置路由
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

//↓ 程序入口
var server = http.createServer(function(req, res){
  routePath(req, res)
})

server.listen(9000)
console.log('visit http://localhost:9000' )


function routePath(req, res){
  var pathObj = url.parse(req.url, true) //解析URL，得到pathname即路由
 
  var handleFn = routes[pathObj.pathname] //与routes里的值进行匹配，有则调用routes没有就为undefined
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
    sampleRoot(path.resolve(__dirname, 'sample'), req, res)//静态文件的路径
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
将数据包装成对象
function parseBody(body){
  console.log(body)
  var obj = {}
  body.split('&').forEach(function(str){
    obj[str.split('=')[0]] = str.split('=')[1]
  })
  return obj
}