var musicList=[]
var currentIndex=0
var audio= new Audio()
var clock
audio.autoplay=true

getMusicList(function(list){//将参数传递给这里的function
    musicList=list
    loadMusic(list[currentIndex])//通过改变currentIndex来实现播放第几首歌的功能
    generateList(list)
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
     // console.log(this)
    audio.play()
   this.querySelector('.fa').classList.remove('fa-play')
   this.querySelector('.fa').classList.add('fa-pause')
  }else{
    audio.pause()
    this.querySelector('.fa').classList.remove('fa-pause')
    this.querySelector('.fa').classList.add('fa-play')}
}

$('.musicbox .fa-backward').onclick=function(){
    currentIndex=(  musicList.length + --currentIndex)%musicList.length
    console.log(currentIndex)
    loadMusic(musicList[currentIndex])
}


$('.musicbox .fa-forward').onclick=function(){
    currentIndex=(++currentIndex)%musicList.length
    console.log(currentIndex)
    loadMusic(musicList[currentIndex])
}

$('.musicbox .bar').onclick=function(e){
    var percent=e.offsetX/parseInt(getComputedStyle(this).width)
    // parseInt() 函数解析一个字符串参数，并返回一个指定基数的整数(数学系统的基础)
   console.log(percent)
   audio.currentTime=audio.duration*percent

}
audio.onended=function(){
    currentIndex=(++currentIndex)%musicList.length//与下一首执行相同的事情
   loadMusic(musicList[currentIndex])
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
    $('.cover').style.backgroundImage='url('+musicObj.img+')'
    audio.src=musicObj.src
    
}
function generateList(list){
    $('.musicbox .list').innerText=musicObj.title
}