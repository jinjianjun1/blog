// $('footer>div').on('click',function(){
//   var indexs=$(this).index()
//   $('section').hide().eq(indexs).fadeIn()
//   $(this).addClass('active').siblings().removeClass()
// })
// var index=0

// start()

// var isloading= false
// $('.loading').show()
// function start(){ 
//   if(isloading) return
//   isloading= true
// $.ajax({
//   url:'http:api.douban.com/v2/movie/top250',
//   type:'GET',
//   data:{
//     start:index,
//     count:20
//     },
//   dataType:'jsonp',

// }).done(function(ret){
//   index+=20
//     console.log(ret)
//     setData(ret)
// }).fail(function(){
//     console.log('未能获得数据')
// }).always(function(){
//   isloading=false,
//   $('.loading').hide()
// })
// }

// var clock

// $('main').on('scroll',function(){//函数节流                 
//   if(clock){clearTimeout}
//  clock=setTimeout(function() {
//   if($('section').eq(0).height()-10 <=$('main')
//   .scrollTop()+$('main').height()){
//     start()
//    } 
//  }, 300);
  
// })


// function setData(data){
//   data.subjects.forEach(function(movie){
//     var tpl= 
//      `
//     <div class="item">
//     <a href="#">
//       <div class="cover">
//         <img src="http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
//       </div>
//       <div class="detail">
//         <h2>霸王别姬</h2>
//         <div class="extra">
//           <span class="score">9.3</span> / <span class="collect"></span>收藏        
//         </div>
//         <div class="extra"><span class="year"></span>/  <span class="type"></span> </div>
//         <div class="extra">导演:<span class="director"></span></div>
//         <div class="extra">主演:<span class="actor"></span></div>
//       </div>
//     </a>
//   </div>
//     `
//     var $node=$(tpl)
//     $node.find('.cover img').attr('src',movie.images.medium)
//     //$('section').eq(0).append($node)
//     $node.find('.detail h2').text(movie.title)
//     $node.find('.score').text(movie.rating.average)
//     $node.find('.collect').text(movie.collect_count)
//     $node.find('.year').text(movie.year)
//     $node.find('.type').text(movie.genres.join('/'))
//     $node.find('.director').text(function(){
//       var directorsArr=[]
//       movie.directors.forEach(function(item){
//         directorsArr.push(item.name)
//       })
//       return directorsArr.join('、')
//     })
//     $node.find('.actor').text(function(){
//       var actorArr=[]
//       movie.casts.forEach(function(item){
//         actorArr.push(item.name)
//       })
//       return actorArr.join('、')
//     })
//     return $node
//   })
// }
//   if(clock){
  //   clearTimeout(clock)
  // }
  //  clock=setTimeout(function() {
  // if(_this.$container.find('.top250').height() +29==_this.$container.height+_this.$container.scrollTop()){
   // console.log(1)
var top250={
  init:function(){
  this.$container=$('.firstpage')
  this.bind()
  this.start()
  this.isloading=false
  this.isFinish=false
  this.index=0
  },
  bind:function(){
     var _this=this
    var clock
    _this.$container.on('scroll',function(){
      if(clock){
        clearTimeout
      }
      clock=setTimeout(function(){
     if(_this.$container.find('.top250').height()+29==_this.$container.height()+_this.$container.scrollTop()){
      
    _this.start()
     } 
    }, 300); 
  })
      
  },
  start:function(){
   var _this=this
   this.getData(function(data){
     _this.render(data)
   })
   
  },
  getData:function(callback){
    var _this=this
    console.log(_this)
    if(_this.isloading) return
    _this.isloading=true
    _this.$container.find('.isloading').show()
    $.ajax({
    url:'http:api.douban.com/v2/movie/top250',
    type:'GET',
    data:{
    start:_this.index||0
    },
    dataType:'jsonp',      
    }).done(function(ret){
      console.log(ret)
      _this.index+=20
      if(_this.index >=ret.total){
        _this.isFinish=true  
      }
      callback&&callback(ret)
    }).fail(function(){
      console.log('error to find data')
    }).always(function(){
      _this.isloading=false
      _this.$container.find('.isloading').hide()
    })
  
  },
  render:function(data){        
    var _this=this
    data.subjects.forEach(function(movie){
      var tpl= 
      `
     <div class="item">
     <a href="#">
       <div class="cover">
         <img src="http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
       </div>
       <div class="detail">
         <h2>霸王别姬</h2>
         <div class="extra">
           <span class="score">9.3</span> / <span class="collect"></span>收藏        
         </div>
         <div class="extra"><span class="year"></span>/  <span class="type"></span> </div>
         <div class="extra">导演:<span class="director"></span></div>
         <div class="extra">主演:<span class="actor"></span></div>
       </div>
     </a>
   </div>
     `
     var $node=$(tpl)
     $node.find('.cover img').attr('src',movie.images.medium)
     //$('section').eq(0).append($node)
     $node.find('.detail h2').text(movie.title)
     $node.find('.score').text(movie.rating.average)
     $node.find('.collect').text(movie.collect_count)
     $node.find('.year').text(movie.year)
     $node.find('.type').text(movie.genres.join('/'))
     $node.find('.director').text(function(){
       var directorsArr=[]
       movie.directors.forEach(function(item){
         directorsArr.push(item.name)
       })
       return directorsArr.join('、')
     })
     $node.find('.actor').text(function(){
       var actorArr=[]
       movie.casts.forEach(function(item){
         actorArr.push(item.name)
       })
       return actorArr.join('、')
     })
     _this.$container.find('.top250').append($node)
    })
  },
  isToBottom:function(){
    return this.$container.find('.top250')<=this.$container.height() + this.$container.scrollTop() +10
   


  }

}

var us={
  init:function(){
    console.log('us')
    this.$container=$('.beimei')
    this.start()
  },
  start:function(){
    var _this=this
    this.getData(function(data){
      _this.render(data)
    })
    
   },
   getData:function(callback){
     var _this=this
     console.log(_this)
     if(_this.isloading) return
     _this.isloading=true
     _this.$container.find('.isloading').show()
     $.ajax({
     url:'http:api.douban.com/v2/movie/us_box',
     type:'GET',
    //  data:{
    //  start:_this.index||0
    //  },不需要
     dataType:'jsonp',      
     }).done(function(ret){
       console.log(ret)
      //  _this.index+=20
      //  if(_this.index >=ret.total){
      //    _this.isFinish=true  
      //  }不需要
       callback&&callback(ret)
     }).fail(function(){
       console.log('error to find data')
     }).always(function(){
      //  _this.isloading=false
       _this.$container.find('.isloading').hide()
     })
   
  },
  render:function(data){        
    var _this=this
    data.subjects.forEach(function(movie){
      var movie=movie.subject
      var tpl= 
      `
     <div class="item">
     <a href="#">
       <div class="cover">
         <img src="http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
       </div>
       <div class="detail">
         <h2>霸王别姬</h2>
         <div class="extra">
           <span class="score">9.3</span> / <span class="collect"></span>收藏        
         </div>
         <div class="extra"><span class="year"></span>/  <span class="type"></span> </div>
         <div class="extra">导演:<span class="director"></span></div>
         <div class="extra">主演:<span class="actor"></span></div>
       </div>
     </a>
   </div>
     `
     var $node=$(tpl)
     $node.find('.cover img').attr('src',movie.images.medium)
     //$('section').eq(0).append($node)
     $node.find('.detail h2').text(movie.title)
     $node.find('.score').text(movie.rating.average)
     $node.find('.collect').text(movie.collect_count)
     $node.find('.year').text(movie.year)
     $node.find('.type').text(movie.genres.join('/'))
     $node.find('.director').text(function(){
       var directorsArr=[]
       movie.directors.forEach(function(item){
         directorsArr.push(item.name)
       })
       return directorsArr.join('、')
     })
     $node.find('.actor').text(function(){
       var actorArr=[]
       movie.casts.forEach(function(item){
         actorArr.push(item.name)
       })
       return actorArr.join('、')
     })
     _this.$container.append($node)
    })
  }
}

var search={
  init:function(){
    console.log('search')
     this.$container=$('.sousuo')
     this.keyword=''
     this.bind()
     this.start()
  },
  bind:function(){
    var _this=this
    this.$container.find('.button').click(function(){
      _this.keyword = _this.$container.find('input').val()
      _this.start()
    })
  },
  start:function(){
    var _this=this
    this.getData(function(data){
      _this.render(data)
    })
    
   },
   getData:function(callback){
     var _this=this
     console.log(_this)
    //  if(_this.isloading) return
    //  _this.isloading=true
     _this.$container.find('.isloading').show()
     $.ajax({
     url:'http:api.douban.com/v2/movie/search',
     data:{q:_this.keyword},
     type:'GET',
    //  data:{
    //  start:_this.index||0
    //  },不需要
     dataType:'jsonp',      
     }).done(function(ret){
       console.log(ret)
      //  _this.index+=20
      //  if(_this.index >=ret.total){
      //    _this.isFinish=true  
      //  }不需要
       callback&&callback(ret)
     }).fail(function(){
       console.log('error to find data')
     }).always(function(){
      //  _this.isloading=false
       _this.$container.find('.isloading').hide()
     })
   
  },
  render:function(data){        
    var _this=this
    data.subjects.forEach(function(movie){
      var tpl= 
      `
     <div class="item">
     <a href="#">
       <div class="cover">
         <img src="http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
       </div>
       <div class="detail">
         <h2>霸王别姬</h2>
         <div class="extra">
           <span class="score">9.3</span> / <span class="collect"></span>收藏        
         </div>
         <div class="extra"><span class="year"></span>/  <span class="type"></span> </div>
         <div class="extra">导演:<span class="director"></span></div>
         <div class="extra">主演:<span class="actor"></span></div>
       </div>
     </a>
   </div>
     `
     var $node=$(tpl)
     $node.find('.cover img').attr('src',movie.images.medium)
     //$('section').eq(0).append($node)
     $node.find('.detail h2').text(movie.title)
     $node.find('.score').text(movie.rating.average)
     $node.find('.collect').text(movie.collect_count)
     $node.find('.year').text(movie.year)
     $node.find('.type').text(movie.genres.join('/'))
     $node.find('.director').text(function(){
       var directorsArr=[]
       movie.directors.forEach(function(item){
         directorsArr.push(item.name)
       })
       return directorsArr.join('、')
     })
     $node.find('.actor').text(function(){
       var actorArr=[]
       movie.casts.forEach(function(item){
         actorArr.push(item.name)
       })
       return actorArr.join('、')
     })
     _this.$container.find('.search-result').append($node)
    })
  }
}




var app= {
  init: function(){
    this.$tabs=$('footer>div')
    this.$panels=$('section')
    this.bind()

    top250.init()
    us.init()
    search.init()
  },
  bind:function(){
    var _this=this
    this.$tabs.on('click',function(){
      $(this).addClass('active').siblings().removeClass('active')
      _this.$panels.eq($(this).index()).fadeIn().siblings().hide()
    })
  }
}
app.init()