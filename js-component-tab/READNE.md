## 组件功能
可以进行页面下不同内容间的切换
##组件实现方式
采用面向对象编程
可以直接调用所定义类的函数
##组件使用方式
将页面写好 结构为
```
<div class="tab-container section1">
    <ul class="tab-head">
    <li>first</li>
    <li>second</li>
    <li>third</li>
    </ul>
    <ul class="tab-contain">
      <li>这是第一部分</li>
      <li>这是第二部分</li>
      <li>这是第三部分</li>
    </ul>
  </div>
```
这时 只需要传入整个容器的类标签给Tab
例 ：var tab =new Tab('.section')
    tab.init()
    即可激活

