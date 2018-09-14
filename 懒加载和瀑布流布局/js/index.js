var $target=$('#load'),
    perPageCount=20,
    curPage=1
$(window).on('scroll',function(){
    checkshow()
})
checkshow()
function checkshow(){
  if(isShow($target)){
    doSthing()
  }
}
function  isShow($el){
  var scrollH = $(window).scrollTop(),
  winH=$(window).height(),
  top=$el.offset().top
  if(top<=winH+scrollH){
      return true
  }else{
      return false
  }
}

function doSthing(){
  $.ajax({
    url:'http://platform.sina.come.cn/slide/album_tech',
    type:'get',
    dataType:'jsonp',
    jsonp:"jsoncallback",
    data:{
      app_key:'1271687855',
      format:'json',
      size:'img',
      num:perPageCount,
      page:curPage
    },
    success:function(ret){
      if(ret.status==0){
        var dataArr =ret.data
        var $node=renderData(dataArr)
        curPage++
      }
    }
  })
}



function renderData(items){
  var tpl='',
  $node
  for(let i=0;i<items;i++){
  tpl+= '<li class="item">';
  tpl +='<a href="">';
  tpl +='<img src="'+items[i].img_url+'" alt=""></a>';
  tpl +=' <h4 class="header">'+items[i].short_name+'</h4>'; 
  tpl +='<p class="desp">'+items[i].short_intro+'</p></li> '
  }
$node=$(tpl)
$('#pic-ct').append($node);
return $node
}
// var  waterfall={
    
//     init:function(){
//       this.colHeightArray=[]
//       this.imgwidth=$($node).outerWidth(true)
//       this.colCount=Math.floor($('.ct-waterfall').width()/this.imgwidth)
//       for(let i=0;i<this.colCount;i++){
//         this.colHeightArray[i]=0
//       } 
//       this.bind()
//     },
//     bind:function(){
//       let _this=this
//       $('img').on('load',function(){
//         _this.layout($(this))

//       })
    
//       $(window).on('resize',function(){
//         _this.init()
//         $('img').each(function(){
//           _this.layout($(this))
//         })
//       })
        
//     },
//     layout:function($node){
//       let minvalue=this.colHeightArray[0]
//       let minIndex=0
//       for(let i=0;i<this.colCount;i++){
//         if(this.colHeightArray[i]<minvalue){
//           minvalue=this.colHeightArray[i]
//           minIndex=i
//           console.log(minvalue)
//         }
//       }
//       $($node).css({
//         left:minIndex*this.imgwidth,
//         top:minvalue
//       })
//       this.colHeightArray[minIndex]+=$($node).outerHeight()
//     }
  
//   }
//   waterfall.init()