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
//     $('.top250').append($node)
//   })
// }