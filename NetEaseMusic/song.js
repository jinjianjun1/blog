$(function(){
    $.get('./lyric.json').then(function(object){
        let lyric=object.lyric
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
    })

    let audio =document.createElement('audio')
    audio.src='http://39.137.21.134/cache/m10.music.126.net/20181011221907/47e72880636c92497c04ea7b647f8932/ymusic/f351/ae94/e2e6/9688d9e8a5fdb917efbadbb57b5e6ecd.mp3?ich_args2=81-11215303027837_ce36437a171c6512a5799baa0d7c29e8_10012302_9c896725d5c5f4d89e33518939a83798_db55f0ba4f3ae08a07ca2f0d28415697'
    audio.oncanplay=function(){
        audio.play()
        $('.disc-container').addClass('playing')
    }
    $('.icon-pause').on('click',function(){
        audio.pause()
        $('.disc-container').removeClass('playing')
        console.log('adsdad')
    })
    $('.icon-play').on('click',function(){
        audio.play()
        $('.disc-container').addClass('playing')
    })      
})
