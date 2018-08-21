function $(selector){
  return document.querySelector(selector)
}
 function $$(selector){
   return document.querySelectorAll(selector)
 }

//  $$('.modal .login').forEach(function(node){
//   node.onclick=function(){
//     $('.flip-modal').classList.remove('register')
//     $('.flip-modal').classList.add('login')
//   }
// })
// $$('.modal .register').forEach(function(node){
//   node.onclick=function(){
//     $('.flip-modal').classList.remove('login')
//     $('.flip-modal').classList.add('register')
//   }
// })

//下面这个方法只能匹配到第一个.login
// $('.modal .login').onclick=function(){
//   $('.flip-modal').classList.remove('register')
//   $('.flip-modal').classList.add('login')
// }
// $('.modal .register').onclick=function(){
//   $('.flip-modal').classList.remove('login')
//   $('.flip-modal').classList.add('register')
// }
$('header .login').onclick=function(e){
  e.stopPropagation()

  // $('.flip-modal').style.display='block' 样式简单可用这个
e.st
  $('.flip-modal').classList.add('show')
}

//事件代理方法↓

$('.flip-modal').addEventListener('click',function(e){
   e.stopPropagation()
  if(e.target.classList.contains('login')){
    $('.flip-modal').classList.remove('register')
    $('.flip-modal').classList.add('login')
  }
  if(e.target.classList.contains('register')){
    $('.flip-modal').classList.remove('login')
    $('.flip-modal').classList.add('register')
  }
  if(e.target.classList.contains('close')){
    $('.flip-modal').style.display='none'
  }
})

  document.addEventListener('click',function(){
    $('.flip-modal').classList.remove('show')
  })
  


 $('.modal-login form').addEventListener('submit',function(e){
  e.preventDefault()
  if(!/^\w{3,8}$/.test($('.modal-login input[name=username]').value)){
  $('.modal-login .errmsg').innerText='用户名需要输入3-8个字符（包括数字，字母和下划线）';
   return false;  
}

  if(!/^\w{6,10}$/.test($('.modal-login input[name=password]').value)){
  $('.modal-log .errmsg').innerText='密码需要输入6-10个字符（包括数字，字母和下划线）';
   return false;  
}

this.submit()
})
$('.modal-register form').addEventListener('submit',function(e){
  e.preventDefault()
  if(!/^\w{3,8}$/.test($('.modal-register input[name=username]').value)){
  $('.modal-register .errmsg').innerText='用户名需要输入3-8个字符（包括数字，字母和下划线）'
   return false;  
}

  if(!/^jinjianjun$/.test($('.modal-login input[name=username]').value)){
  $('.modal-register .errmsg').innerText='该用户名已存在'
   return false;  
}
if(!/^\w{6,10}$/.test($('.modal-register input[name=password]').value)){
  $('.modal-register .errmsg').innerText='密码需要6-10个字符（包括数字，字母和下划线）'
   return false; }
if($('.modal-register input[name=password2]').value!==$('.modal-register inpput[name=password)]')){
  $('.modal-register .errmsg').innerText='两次密码输入不一致'
  return false
}
this.submit()
})