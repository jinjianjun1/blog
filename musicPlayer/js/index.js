
var currentIndex=0
var audio= new Audio()
var clock
audio.autoplay=true

getMusicList(function(list){//将参数传递给这里的function
    loadMusic(list[currentIndex])//通过改变currentIndex来实现播放第几首歌的功能
})
function $(selector){
    return document.querySelector(selector)
}

    $('.musicbox .progress-now').style.width=(this.currentTime/this.duration)*100+'%'
audio.ontimeupdate=function(){
   // console.log(this.currentTime)
    // var min=Math.floor(this.currentTime/60)
    // var sec=Math.floor(this.currentTime)%60+''//变成字符串,可以判断length
    // sec=sec.length===2?sec:'0'+sec
    // $('.musicbox .time').innerText=min+':'+sec
    //上面这种写法因为会计算触发事件的时间，所以不准
    $('.musicbox .progress-now').style.width=(this.currentTime/this.duration)*100+'%'
 }
audio.onplay=function(){
 clock=setInterval(function(){
     var min=Math.floor(audio.currentTime/60)//注意这里的currentTime是用的audio的
     var sec=Math.floor(audio.currentTime)%60 +''//同上
     sec=sec.length===2?sec:'0'+sec
     $('.musicbox .time').innerText=min+':'+sec
 },1000)
}

$('.musicbox .play').onclick=function(){
    
  if(audio.paused){
      console.log(this)
    audio.play()
   this.querySelector('.fa').classList.remove('fa-pause')
   this.querySelector('.fa').classList.add('fa-play')
  }else{
    audio.pause()
    this.querySelector('.fa').classList.remove('fa-play')
    this.querySelector('.fa').classList.add('fa-pause')}
}


audio.onpause=function(){
    clearInterval(clock)
}//只要音乐一停，包括暂停、下一曲时就会触发，便于重新计算currentTime
function getMusicList(callback){
var xhr = new XMLHttpRequest()
xhr.open('GET','/music.json',true)
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
    $('.musicbox .title').innerText=musicObj.title
    $('.musicbox .auther').innerText=musicObj.auther

    audio.src=musicObj.src
    
}