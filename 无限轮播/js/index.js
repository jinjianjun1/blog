function Carousal($ct){
this.init($ct)
this.bind()
}

Carousal.prototype={
  init:function($ct){
    this.$ct=$ct
    this.$imgCt=this.$ct.find('.img-ct')
    this.$imgs=this.$ct.find('.img-ct>li')
    this.$preBtn=this.$ct.find('.pre')
    this.$nextBtn=this.$ct.find('.next')
    this.$bullets=this.$ct.find('.bullet li')

    this.imgCount=this.$imgs.length
    this.imgWidth=this.$imgs.width()
    this.index=0
    this.isArrive =false

    this.$imgCt.append(this.$imgs.first().clone())
    this.$imgCt.prepend(this.$imgs.last().clone())

    this.$imgCt.width((this.imgCount+2)*this.imgWidth)
    this.$imgCt.css({left:-this.imgWidth})
  },
  bind:function(){
    var _this=this
    this.$preBtn.on('click',function(){
        _this.playPre(1)   
    })
    this.$nextBtn.on('click',function(){
        _this.playNext(1)
    })
    this.$bullets.on('click',function(){
        console.log($(this).index())
        var index=$(this).index()
        if(_this.index>index){
          _this.playPre(_this.index-index)
        }else{
         _this.playNext(index-_this.index)
        }
    })
  },
  playPre:function(len){
    console.log('pre')
    if(this.isArrive) return
    this.isArrive=true
    var _this=this
    this.$imgCt.animate({
        left:'+='+this.imgWidth*len
    },function(){
        _this.index-=len
        if(_this.index<0){
          _this.$imgCt.css('left',-_this.imgWidth*_this.imgCount)
          _this.index=_this.imgCount-1
        }
        _this.setBullet()
        _this.isArrive=false
    })
    


  },
  playNext:function(len){
    console.log('next')
    if(this.isArrive) return
    this.isArrive=true
    var  _this=this
    this.$imgCt.animate({
        left:'-='+this.imgWidth*len
      },function(){
        _this.index +=len
        // console.log( _this.index)
        if(_this.index===_this.imgCount){
            _this.$imgCt.css('left',-_this.imgWidth)
            _this.index=0
        }
        _this.setBullet()
        _this.isArrive=false
      })
      
  },
  setBullet:function(){
      this.$bullets.eq(this.index).addClass('active').siblings().removeClass('active')
  },
  autoPlay:function(){
      var _this=this
      this.autoClock=  setInterval(function(){
          _this.playNext(1)
      },2000)
  },
  stopAuto:function(){
      clearInterval(this.autoClock)
  }  
}

var a= new Carousal($('.carousal').eq(0))
var b= new Carousal($('.carousal').eq(1))
b.autoPlay()
$.fn.carousal=function(){
    $.each(this,function(index,node){
        new Carousal($(node))
    })
}
$('.carousal').eq(2).carousal()