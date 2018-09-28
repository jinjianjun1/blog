function Tab(node){
  this.init(node)
}
Tab.prototype={
  init:function(node){
    this.$container=$(node)
    this.bind()
  },
  bind:function(){
    var _this=this
    this.$container.find('.tab-head').on('click','li',function(){
      $(this).addClass('active').siblings().removeClass('active')

      var index=$(this).index()
      _this.$container.find('.tab-contain>li').eq(index).addClass('active')
      .siblings().removeClass('active')     
    })
  }
}

var  tab = new Tab('.section1')
var  tab2 = new Tab('.section2')
$.fn.TAB=function(){
  $.each(this,function(index,node){
    new Tab($(node))
  })
}
$('.section3').TAB()