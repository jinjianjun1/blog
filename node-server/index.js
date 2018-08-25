var http=require('http')
var path=require('path')
var url=require('url')
var fs=require('fs')
var routes={
    '/a':function(req,res){
        res.end(JSON.stringify(req.query))
    },
    '/b':function(req,res){
        res.end('match /b')
    },
    '/a/c':function(req,res){
        res.end('match /a/c')
    },
    '/search':function(req,res){
        res.end('username='+req.body.username+',password='+req.body.password)
    }
};
function parseBody(body){
    console.log(body)
    var obj={}
    body.split('&').forEach(function(str){
        obj[str.split('=')[0]]=str.split('=')[1]
    })
    return obj 
}

var server=http.createServer(function(req,res){
    routePath(req,res)
})
server.listen(9000)
console.log('visit http:localhost:9000')
function routePath(req,res){
    var pathObj=url.parse(req.url,true)
    var handlfFn=routes[pathObj.pathname]
    if(handlfFn){
        req.query=pathObj.path
        var body=''
        req.on('data',functon(chunk){
            body += chunk
        }).on('end',function(){
            req.body=parse(Body)
            handlfFn(req,res)
        })
    }else{staticRoot(path.resolve(__dirname,'sample')req,res)}

}