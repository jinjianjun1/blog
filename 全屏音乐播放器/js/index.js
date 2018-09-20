var EventConter={
  on:function(type,handler){
    $(document).on(type,handler)
  },
  fire:function(type,data){
    $(document).trigger(type,data)
  }
}



var Footer={
  init:function(){
  this.$footer=$('footer')
  this.$box=this.$footer.find('.box')
  this.$ul=this.$footer.find('ul')
  this.$leftBtn=this.$footer.find('.icon-left')
  this.$rightBtn=this.$footer.find('.icon-right')
  this.bind()
  this.render()    
  this.isToEnd =false
  this.isStart =true
   this.isAnimate=false
  },
  bind:function(){
  var  _this=this
  this.$rightBtn.on('click',function(){
    if(_this.isAnimate) return
    var itemWidth=_this.$footer.find('li').outerWidth(true)
    var itemCount=Math.floor(_this.$box.width()/itemWidth) 
    
    if(!_this.isToEnd){
      _this.isAnimate=true
      _this.$ul.animate({
        left: '-='+ itemCount*itemWidth
      },400,function(){
        _this.isAnimate =false
        _this.isStart=false
        console.log(parseFloat(_this.$ul.css('left')),parseFloat(_this.$ul.width()))
        if(parseFloat(_this.$box.width())-parseFloat(_this.$ul.css('left'))>=parseFloat(_this.$ul.width())){
          console.log('change')
          _this.isToEnd=true
        }
      })
    }
  })
  this.$leftBtn.on('click',function(){
    var itemWidth=_this.$footer.find('li').outerWidth(true)
    var itemCount=Math.floor(_this.$box.width()/itemWidth) 
    if(_this.isAnimate) return
    if(!_this.isStart){
      _this.isAnimate=true
      _this.$ul.animate({
        left: '+='+ itemCount*itemWidth
      },400,function(){
        _this.isAnimate=false
        _this.isToEnd=false
        //console.log(parseFloat(_this.$ul.css('left')),parseFloat(_this.$ul.width()))
        if(parseFloat(_this.$ul.css('left'))>=0){
          _this.isStart=true
        }
      })
    }
  })
  this.$footer.on('click','li',function(){
    $(this).addClass('active').siblings().removeClass('active')
    EventConter.fire('select-albumn',{
      channelId:$(this).attr('data-channel-id'),
      channelName:$(this).attr('data-channel-name')
    })
  })
  },
  render(){
    var _this=this
    $.getJSON('https://jirenguapi.applinzi.com/fm/getChannels.php').done(function(ret){
    console.log(ret) 
    _this.renderFooter(ret.channels)
    }).fail(function(){
      console.log('not get data')
    })
  },
  renderFooter:function(channels){
    var html=''
  channels.forEach(function(channel){
    html +='<li data-channel-id='+channel.channel_id+' data-channel-name='+channel.name+'>'
    +'<div class="cover" style="background-image:url('+channel.cover_small+')"></div>'
    +'<h3>'+channel.name+'<h3>'
    +'</li>'
  })
  this.$ul.html(html)
  this.setStyle()
  },
  setStyle:function(){
    var count=this.$footer.find('li').length//在开始时并没有li元素存入到html里，所以不能直接声明this.$li=$('li')
    var width=this.$footer.find('li').outerWidth(true)
    this.$ul.css({
      width:count*width
    })
  }//设置ul的宽度使li里的元素能够在一排进行排列
}


var Fm={
  init:function(){
    this.$container=$('#page-music')
   

    this.audio= new Audio()
    this.audio.autoplay=true//这样的话只需修改src就可以播放音乐

    this.bind()
  },
  bind:function(){
    var _this=this
    EventConter.on('select-albumn',function(e,channelObj){
      _this.channelId=channelObj.channelId
      _this.channelName=channelObj.channelName
      _this.loadMusic()
    }) 
      console.log(this) 
     //console.log(this.$container)
    this.$container.find('.btn-play').on('click',function(){
     var $btn =$(this)
      if($btn.hasClass('icon-play')){
        $btn.removeClass('icon-play').addClass('icon-pause')
        _this.audio.play()
      }else{
        $btn.removeClass('icon-pause').addClass('icon-play')
        _this.audio.pause()
      }
    })

    this.$container.find('.btn-next').on('click',function(){
      _this.loadMusic()    
    })


    this.audio.addEventListener('play',function(){
      //console.log('play')
      //_this.$container.find('.btn-play').removeClass('icon-play').addClass('icon-pause')
      clearInterval(_this.statusClock)
     _this.statusClock= setInterval(function(){
       _this.updateStatus()
     },1000)
    })
    this.audio.addEventListener('pause',function(){
     // console.log('pause')
      //_this.$container.find('.btn-play').removeClass('icon-pause').addClass('icon-play')

    clearInterval(_this.statusClock)
    })
  },

  loadMusic(callback){
    var _this =this
    $.getJSON('https://jirenguapi.applinzi.com/fm/getSong.php',{channel:this.channelId}).done(function(ret){
      //console.log(ret.song[0])
      _this.song=ret['song'][0]
     // console.log(ret['song'][0])
      _this.setMusic()
      _this.loadLyric()
      //console.log(this.$container) 

    })
  },
  loadLyric(){
    var _this =this
    $.getJSON('https://jirenguapi.applinzi.com/fm/getLyric.php',{sid:this.song.sid}).done(function(ret){
     var lyric =ret.lyric
     var lyricObj={}
     console.log(lyric,'就是这里')
     lyric.split('\n').forEach(function(line){
        var times= line.match(/\d{2}:\d{2}/g)
        var str =line.replace(/\[.+?\]/g,'')
        if(Array.isArray(times)){
          times.forEach(function(time){
            lyricObj[time]=str
          })
        }      
      })
    _this.lyricObj=lyricObj
    console.log(_this,'44444')
    console.log(_this.lyricObj,'5555555555')
    })
  },
  setMusic(){
    //console.log(this.$container)
    this.audio.src=this.song.url
    //console.log(this)
    $('.bg').css('background-image','url('+this.song.picture+')')
    this.$container.find('.aside figure').css('background-image','url('+this.song.picture+')')
    this.$container.find('.detail h1').text(this.song.title)
    this.$container.find('.detail .author').text(this.song.artist)
    this.$container.find('.tag').text(this.channelName)
    this.$container.find('.btn-play').removeClass('icon-play').addClass('icon-pause') //这样写的话刚开始按钮就是播放状态 感觉不太好
  },
  updateStatus(){
    var min =Math.floor(this.audio.currentTime/60)
    var second=Math.floor(this.audio.currentTime%60)+''
    second= second.length===2?second:'0'+second
    this.$container.find('.current-time').text(min+':'+second) 
    this.$container.find('.bar-progress').css('width',this.audio.currentTime/this.audio.duration*100+'%')  
    var line=this.lyricObj['0'+min+':'+second]
    if(line){
      this.$container.find('.lyric p').text(line)
    }
  }
}
Footer.init()
Fm.init()