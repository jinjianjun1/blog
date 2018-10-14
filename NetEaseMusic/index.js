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
    
})