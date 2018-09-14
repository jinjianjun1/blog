let curPage = 1
let perPageCount = 20
let colArrayheight = []
let nodeWidth = $('.item').outerWidth(true)
let colCount = Math.floor(($('#pic-ct').width()/nodeWidth))
for(var i=0;i<colCount.length;i++){
  colArrayheight[i]=0
}

for(var o=0;i<colCount;i++){
    colArrayheight.push(0)
}

let isDataArrive= true

start()

//核心代码
function start(){
  getData(function(newsList){
    isDataArrive=true
    $(newsList).each(function(idx,news){
      var $node=getNode(news)
      $node.find('img').on('load',function(){
        $('#pic-ct').append($node)
        waterFallPlace($node)
      })
    })
  })
  isDataArrive =false
}

function getData(callback){
  $.ajax({
    url:'https://platform.sina.com.cn/slide/album_tech',
    dataType:'jsonp',
    type:'get',
    jsonp:'jsoncallback',
    data:{
        app_key:'1271687855',
        num:perPageCount,
        page:curPage
    }
  }).done(function(ret){
      if(ret&&ret.status&&ret.status.code==='0'){
        callback(ret.data)
        curPage++
      }else{
        //console.log('not found data')
      }
  })
}


function getNode(item){
  let tpl=''
  tpl +='<li class="item">'
  tpl += ' <a href="'+ item.url +'" class="link"><img src="' + item.img_url + '" alt=""></a>';
  tpl += ' <h4 class="header">'+ item.short_name +'</h4>';
  tpl += '<p class="desp">'+item.short_intro+'</p>';
  tpl += '</li>';
  return $(tpl)
}


$(window).scroll(function(){
  if(!isDataArrive) return
  if(isVisible($('#load'))){
    start()
    console.log('这一步监听到了')
  }
})


function waterFallPlace($node){
  let idx=0,
  minHeight =colArrayheight[0];

  for(let i=0;i<colArrayheight.length;i++){
      if(colArrayheight[i]<minHeight){
      idx =i;
      minHeight=colArrayheight[i]
    }  
  }
  $node.css({
      left:nodeWidth*idx,
      top:minHeight,
      opacity:1
  })
  colArrayheight[idx]=$node.outerHeight(true)+colArrayheight[idx]
  $('#pic-ct').height(Math.max.apply(null,colArrayheight))
}



function isVisible($element){
  let scrollH=$(window).scrollTop(),
      winH=$(window).height(),
      top=$element.offset().top;
  if(top <scrollH+winH){
    return true
  }else{
    return false
  } 
}
