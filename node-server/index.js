// var http=require('http')
// var path=require('path')
// var url=require('url')
// var fs=require('fs')
// var routes={
//     '/a':function(req,res){
//         res.end(JSON.stringify(req.query))
//     },
//     '/getweather':function(){
//         res.end()
//     },
//     '/b':function(req,res){
//         res.end('match /b')
//     },
//     '/a/c':function(req,res){
//         res.end('match /a/c')
//     },
//     '/search':function(req,res){
//         res.end('username='+req.body.username+',password='+req.body.password)
//     }
// }
// function parseBody(body){
//     console.log(body)
//     var obj={}
//     body.split('&').forEach(function(str){
//         obj[str.split('=')[0]]=str.split('=')[1]
//     })
//     return obj 
// }
// // function parseBody(body){
// //     console.log(body)
// //     var obj = {}
// //     body.split('&').forEach(function(str){
// //       obj[str.split('=')[0]] = str.split('=')[1]
// //     })
// //     return obj
// //   }
  
// var server=http.createServer(function(req,res){
//     routePath(req,res)
// })
// server.listen(9000)
// console.log('visit http:localhost:9000')
// function routePath(req,res){
//     var pathObj=url.parse(req.url,true)//解析URL
//     var handlfFn=routes[pathObj.pathname]//将URL与routes的接口进行匹配
//     console.log(pathObj.pathname)
//     if(handlfFn){
//         req.query=pathObj.path
//         var body=''
//         req.on('data',function(chunk){
//             body +=chunk
//         }).on('end',function(){
//             req.body=parse(Body)
//             handlfFn(req,res)
//         })
//     }else{sampleRoot(path.resolve(__dirname,'sample'),req,res)}
// }
// function sampleRoot(samplePath,req,res){
//     var pathObj=url.parse(req.url,true)
//     var filePath=path.join(samplePath,pathObj.pathname)
//     fs.readFile(filePath,'binary',function(err,content){
//         if(err){
//             res.writeHead(404,'not found')
//             return res.end()
//         }else{
//             res.writeHead(200,'OK')
//             res.write(content,'binary')
//             res.end()
//         }
//     })
// }

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
   
  },
   '/getWeather': function(req,res){//getweather前没有加‘/’,加了之后服务器直接崩了。
       var ret
       var pathObj = url.parse(req.url, true)

       if(pathObj.pathname==='hangzhou'){
           ret={
               city:'hangzhou',
               weather:'台风'
           }
       }else{
          ret={
           city:pathObj.query.city,
           weather:'不知道'}
       }
       res.end(JSON.stringify(ret))
   }      
}


var server = http.createServer(function(req, res){
  routePath(req, res)
})

server.listen(9000)
console.log('visit http://localhost:9000' )
console.log(path)


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
  console.log(filePath)
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
  console.log(obj)
  return obj

}


