Carvas={
    init:function(){
        this.canvas=document.getElementById('canvas')
        this.eraser=document.getElementById('eraser')
        this.pen=document.getElementById('pen')
        this.actions=document.getElementById('actions')

        this.setWidthHeight()

        this.context =canvas.getContext('2d')
        this.painting=false
        this.lastPoint={x:undefined,y:undefined}
        this.eraserEabled=false
        this.useing=false
        this.bind()
    },
    bind:function(){
        var _this=this

        this.canvas.onmousedown=function(mouse){
            _this.painting=true
            let x=mouse.clientX
            let y=mouse.clientY
            _this.useing=true
             if(_this.eraserEabled){
               _this.context.clearRect(x-5,y-5,10,10)
             }else{
                _this.lastPoint={"x":x,"y":y}

             }
        }
        
        this.canvas.onmousemove=function(mouse){
            let x=mouse.clientX
            let y=mouse.clientY
          if(!_this.useing) return
          if(_this.eraserEabled){
            _this.context.clearRect(x-5,y-5,10,10)            
            }else{
            
            let newPoint={"x":x,"y":y}

             _this.drawLine(_this.lastPoint.x,_this.lastPoint.y,newPoint.x,newPoint.y)
             _this.lastPoint=newPoint
            }
        }
        this.canvas.onmouseup=(mouse)=>{
            _this.useing=false
        
        },
        window.onresize=function(){
            console.log('yingyihngying')
            _this.setWidthHeight()

        },
        this.eraser.onclick=function(){
            _this.eraserEabled=true
            _this.actions.className='actions active'
        },
        this.pen.onclick=function(){
            _this.eraserEabled=false
            _this.actions.className='actions'           
        }

    },
    drawLine:function(x1,y1,x2,y2){
        this.context.beginPath()
        this.context.strokeStyle='black'
        this.context.moveTo(x1,y1)
        this.context.lineWidth=6
        this.context.lineTo(x2,y2)
        this.context.stroke()
        this.context.closePath()
    },
    setWidthHeight:function(){
        let pageWidth=document.documentElement.clientWidth
        let pageHeight=document.documentElement.clientHeight
        this.canvas.width=pageWidth
        this.canvas.height=pageHeight
    }
}
Carvas.init()