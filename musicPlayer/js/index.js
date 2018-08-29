
var currentIndex=0
var audio= new Audio()
audio.autoplay=true


getMusicList(function(list){//将参数传递给这里的function
    loadMusic(list[currentIndex])//通过改变currentIndex来实现播放第几首歌的功能
})

function getMusicList(callback){
var xhr = new XMLHttpRequest()
xhr.open('GET','music.json',true)
xhr.onload=function(){
  if((xhr.status>=200&&xhr.status<300)||xhr.status===304){
      console.log(JSON.parse(this.responseText))
     callback(JSON.parse(this.responseText))
  }else{
      console.log('获取数据失败')
  }   
}
xhr.onerror=function(){
    console.log('网络异常')
}
xhr.send()
}
function loadMusic(musicObj){
    console.log('begin play', musicObj)
    audio.src=musicObj
}