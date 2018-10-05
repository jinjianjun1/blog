import $ from 'jquery'
import './lunbo.css'
var lunbo={
  init(){
      console.log('执行了轮播')
      this.render()
  },
  render(){
      $('body').append('<h1 class="hello">我是轮播</h1>')
  }
}
export{lunbo}