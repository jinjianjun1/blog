function Tab(node){
  this.container=node
  this.init=function(){
   var  $container= $(this.container)
  //  console.log($container)

   
  $container.find('.tab-head').on('click','li',function(){
    $(this).addClass('active').siblings().removeClass('active')
  
    var index=$(this).index()
    $container.find('.tab-contain>li').eq(index).addClass('active').siblings().removeClass('active')
   //  .addClass('.active').siblings().removeClass('.active')
  })
  }

}
//Tab()

var  tab = new Tab('.section1')
tab.init()
var  tab2 = new Tab('.section2')
tab2.init()