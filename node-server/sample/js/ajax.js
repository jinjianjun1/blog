// var xhr = new XMLHttpRequest()
// xhr.open('GET', '/getweather?city=hangzhou', true)
// xhr.send()
// xhr.onload = function(){
// console.log(JSON.parse(xhr.responseText))
// }

var xhr = new XMLHttpRequest()
xhr.open('GET', '/getWeather?city=hangzhou', true)
xhr.send()
xhr.onload = function(){
console.log(JSON.parse(xhr.responseText))
}