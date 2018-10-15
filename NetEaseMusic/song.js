$(function(){
 
    let id =  location.search.match(/\bid=([^&]*)/)[1]//正则的括号加错位置了，血的教训。

    $.get('./songs.json').then(function(response){
        let songs=response
        let song = songs.filter( (s)=>{
           return  s.id===id
        })[0]
        
        let {url,name,lyric}=song
        initPlayer.call(undefined,url)
        initText(name,lyric)
        
    })
    
    function initText(name,lyric){
        $('.song-decription>h1').text(name)
        parseLyric.call(undefined,lyric)
    }

    function initPlayer(url){
        let audio =document.createElement('audio')
        audio.src=url
        audio.oncanplay=function(){
            audio.play()
            $('.disc-container').addClass('playing')
        }
        $('.icon-pause').on('click',function(){
            audio.pause()
            $('.disc-container').removeClass('playing')
        })
        $('.icon-play').on('click',function(){
            audio.play()
            $('.disc-container').addClass('playing')
        })         
    }

    
    function parseLyric(lyric){
        let array=lyric.split('\n')
        let regex=/^\[(.+)\](.*)$/
        array=array.map(function(string,index){
          let matches=string.match(regex)
        if(matches){
            return {time:matches[1],words:matches[2]}
          }
        })
        let $lyric=$('.lyric')
        array.map(function(object){
          let $p=$('<p/>')
          if(!object) return
          $p.attr('data-time',object.time).text(object.words)
          $p.appendTo($lyric.find('.lines'))
        }) 
    }
    
})
