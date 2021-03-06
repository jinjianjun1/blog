$(function(){
    $.get('./songs.json').then(function(response){
    //   console.log(response)用GitHub的服务器打出来的有可能是字符串
      let items=response
      items.forEach((i)=>{
          let $li=$(`<li>
          <a href="./song.html?id=${i.id}">                
              <h3>${i.name}</h3>
              <p>
                  <svg class="icon-sq">
                      <use xlink:href="#icon-sq"></use>
                  </svg>
                  ${i.singer}-${i.album}</p>
              
              <svg class="icon">
                  <use xlink:href="#icon-play-circle"></use>
              </svg>
          </a>
      </li>
          `)
          $('#latesterMusic').append($li)
      })
      $('#latesterMusicLoading').remove()
    },function(){
        throw Error
    })
    $('.siteNav').on('click','ol.tabItems>li',function(e){
        // console.log(e)       
       let $li =$(e.currentTarget).addClass('active')
       $li.siblings().removeClass('active')
       let index =$li.index()
    //    console.log($li,index)
       $('.tabContent>li').eq(index).addClass('active')
       .siblings().removeClass('active')
       $li.trigger('tabChange',index)
    })
    $('.siteNav').on('tabChange',function(e,index){
        let $li=$('.tabContent>li').eq(index)
        if($li.attr('data-downloaded')==='yes')return

       if(index ===1){
           $.get('./page2.json').then((response)=>{
               console.log(response)
               $li.text(response.content)
               $li.attr('data-downloaded','yes')
            })
       }else if(index===2){
           $.get('./page3.json').then((response)=>{
               console.log(response)
               $li.text(response.content)
               $li.attr('data-downloaded','yes')

           })
       }
    })
})