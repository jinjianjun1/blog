## Canvas画板

![作品展示](https://upload-images.jianshu.io/upload_images/13167242-d9e8028fde9259fc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 功能介绍

- 支持触屏与非触屏设备使用
- 画笔 粗/细 调节功能
- 红/绿/蓝 三色画笔
- 橡皮擦功能
- 清空画布功能
- 作品导出下载功能

## 技术要点
使用了原生JavaScript和Canvas的API，采取了面向对象的方式编写代码
- 用JS设置Canvas的大小，使之自适应大小
```
setWidthHeight:function(){
        let pageWidth=document.documentElement.clientWidth
        let pageHeight=document.documentElement.clientHeight
        this.canvas.width=pageWidth
        this.canvas.height=pageHeight
    },

```
1. 特性检测，PC端和移动端所需JS监听的事件不同，需要进行判断
```
if(document.body.ontouchstart !==undefined){
            this.mpbileManulate()
        }else{
            this.pcManulate()
        }//PC端没有touchstart事件

```
2. Canvas API
- 画线
```
function drawLine(x1 ,y1 ,x2 ,y2){
  context.beginPath()  //创建一个新的路径
   context.strokeStyle = 'black'//设置线的颜色
  context.moveTo(x1, y1)     //起点
  context.lineWidth = 5      //线粗；每次进行绘画的时候去取选择的粗细的值
  context.lineTo(x2, y2)     //终点
  context.stroke()     //描边
  context.closePath()  //将笔点返回到当前子路径起始点，搭配将新点赋值给旧点即可完成绘制线条的功能
}
```
![相关链接](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)


- 保存生成所画图画的方法
```
save.onclick = function(){
  var url = canvas.toDataURL("image/png")   //将当前图保存到一个url地址变量中
  var a = document.createElement('a')//在页面上建立一个a链接
  document.body.appendChild(a)
  a.href = url//将a链接的href值设置为之前生成的url
  a.download = '我的作品'  //图片命名
  a.target = '_blank'  //打开另一空白页面
  a.click()
}
```
3. 事件监听
- pc端
```
mousedown
mousemove
mouseup
```
- 移动端
```
touchstart
touchmove
touchend
```
[预览链接](https://jinjianjun1.github.io/blog/Canvas/canvas.html)