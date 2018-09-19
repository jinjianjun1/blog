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
  },
  bind:function(){
  var  _this=this
  this.$rightBtn.on('click',function(){
    var itemWidth=_this.$footer.find('li').outerWidth(true)
    var itemCount=Math.floor(_this.$box.width()/itemWidth) 
    
    if(!_this.isToEnd){
      _this.$ul.animate({
        left: '-='+ itemCount*itemWidth
      },400,function(){
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
    
    if(!_this.isStart){
      _this.$ul.animate({
        left: '+='+ itemCount*itemWidth
      },400,function(){
        _this.isToEnd=false
        console.log(parseFloat(_this.$ul.css('left')),parseFloat(_this.$ul.width()))
        if(parseFloat(_this.$ul.css('left'))>=0){
          _this.isStart=true
        }
      })
    }
  })
  this.$footer.on('click','li',function(){
    $(this).addClass('active').siblings().removeClass('active')
    EventConter.fire('select-albumn',$(this).attr('data-channel-id'))
  })
  },
  render(){
    var _this=this
    $.getJSON('http://api.jirengu.com/fm/getChannels.php').done(function(ret){
    console.log(ret) 
    _this.renderFooter(ret.channels)
    }).fail(function(){
      console.log('not get data')
    })
  },
  renderFooter:function(channels){
    var html=''
  channels.forEach(function(channel){
    html +='<li data-channel-id='+channel.channel_id+'>'
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


var App={
  init:function(){
    this.bind()
  },
  bind:function(){
    EventConter.on('select-albumn',function(e,data){
      console.log('select',data)
    })
  }
}
Footer.init()
App.init()