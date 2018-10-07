Carvas={
    init:function(){
        this.canvas=document.getElementById('canvas')
        this.eraser=document.getElementById('eraser')
        this.pen=document.getElementById('pen')
        this.clear=document.getElementById('clear')
        this.save=document.getElementById('save')
        this.actions=document.getElementById('actions')
        this.red=document.getElementById('red')
        this.green=document.getElementById('green')
        this.blue=document.getElementById('blue')
        this.black=document.getElementById('black')
        this.thin=document.getElementById('thin')
        this.thick=document.getElementById('thick')
        this.setWidthHeight()
        this.context =canvas.getContext('2d')
        this.whiteBackground()

        this.lineWidth=5
        
        this.painting=false
        this.lastPoint={x:undefined,y:undefined}
        this.eraserEabled=false
        this.useing=false

        if(document.body.ontouchstart !==undefined){
            this.mpbileManulate()
        }else{
            this.pcManulate()
        }
    },
    pcManulate:function(){
        var _this=this

        this.canvas.onmousedown=function(mouse){
            _this.painting=true
            let x=mouse.clientX
            let y=mouse.clientY
            _this.useing=true
            _this.colorChooice()
            _this.lineSize()
             if(_this.eraserEabled){
               _this.context.clearRect(x-5,y-5,10,10)
             }else{
                _this.lastPoint={"x":x,"y":y}

             }
        }
        this.canvas.onmousemove=function(mouse){
            let x=mouse.clientX
            let y=mouse.clientY
            // _this.lineSize()

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
            _this.setWidthHeight()

        },
        this.PenClick()
    },
    mpbileManulate:function(){
        let _this=this
        this.canvas.ontouchstart=function(mouse){
          let x=mouse.touches[0].clientX
          let y=mouse.touches[0].clientY
          _this.useing=true
          _this.lineSize()
          _this.colorChooice()
             if(_this.eraserEabled){
               _this.context.clearRect(x-5,y-5,10,10)
             }else{
                _this.lastPoint={"x":x,"y":y}

             }
        },
        this.canvas.ontouchmove=function(mouse){
          let x=mouse.touches[0].clientX
          let y=mouse.touches[0].clientY
          if(!_this.useing) return
          if(_this.eraserEabled){
            _this.context.clearRect(x-5,y-5,10,10)            
            }else{
            
            let newPoint={"x":x,"y":y}

             _this.drawLine(_this.lastPoint.x,_this.lastPoint.y,newPoint.x,newPoint.y)
             _this.lastPoint=newPoint
            }
        },
        this.canvas.ontouchend=function(){
            _this.useing=false
        },
        this.PenClick()
    },
    PenClick:function(){
        let _this=this
        
        this.eraser.onclick=function(){
            _this.eraserEabled=true
            _this.eraser.classList.add('active')
            _this.pen.classList.remove('active')
            
        },
        this.pen.onclick=function(){
            _this.eraserEabled=false
            _this.pen.classList.add('active')
           _this.eraser.classList.remove('active')           
        }
        this.clear.onclick=function(){
            _this.context.clearRect(0,0,_this.canvas.width,_this.canvas.height)
        }
        this.save.onclick=function(){
            let url =_this.canvas.toDataURL("image/png")
            let a =document.createElement('a')
            document.body.appendChild(a)
            a.href=url
            a.download='我的作品'
            a.target='_blank'
            a.click()
        }
    },
    drawLine:function(x1,y1,x2,y2){
        this.context.beginPath()
        this.context.moveTo(x1,y1)
        this.context.lineWidth=this.lineWidth
        this.context.lineTo(x2,y2)
        this.context.stroke()
        this.context.closePath()
    },
    setWidthHeight:function(){
        let pageWidth=document.documentElement.clientWidth
        let pageHeight=document.documentElement.clientHeight
        this.canvas.width=pageWidth
        this.canvas.height=pageHeight
    },
    colorChooice:function(){
        let _this=this
        this.black.onclick=function(){
            _this.context.fillStyle='black'
            _this.context.strokeStyle='black'
            this.classList.add('active')
            _this.green.classList.remove('active')
            _this.blue.classList.remove('active')
            _this.red.classList.remove('active')
          }        
        this.red.onclick=function(){
          _this.context.fillStyle='red'
          _this.context.strokeStyle='red'
          this.classList.add('active')
          _this.green.classList.remove('active')
          _this.blue.classList.remove('active')
          _this.black.classList.remove('active')

        }
        this.green.onclick=function(){
          _this.context.fillStyle='green'
          _this.context.strokeStyle='green'  
          this.classList.add('active')
          _this.red.classList.remove('active')
          _this.blue.classList.remove('active') 
          _this.black.classList.remove('active')
         
        }
        this.blue.onclick=function(){
          _this.context.fillStyle='blue'
          _this.context.strokeStyle='blue'
          this.classList.add('active')
          _this.green.classList.remove('active')
          _this.red.classList.remove('active')    
          _this.black.classList.remove('active')

        }
    },
    lineSize:function(){
        let _this=this
        this.thin.onclick=function(){
            _this.lineWidth=5
        }
        this.thick.onclick=function(){
            _this.lineWidth=10
        } 
    },
    whiteBackground:function(){
        this.context.fillStyle='white'
        this.context.strokeRect(0,0,this.canvas.width,this.canvas.height)
    }
}
Carvas.init()