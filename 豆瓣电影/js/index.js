$('footer>div').on('click',function(){
  var index=$(this).index()
  $('section').hide().eq(index).fadeIn()
  $(this).addClass('active').siblings().removeClass()
})

$.ajax({
  url:'http:api.douban.com/v2/movie/top250',
  type:'GET',
  data:{
    start:0,
    count:20
    },
  dataType:'jsonp',

}).done(function(ret){
    console.log(ret)
}).fail(function(){
    console.log('未能获得数据')
})