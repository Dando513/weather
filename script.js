// const element=document.querySelector(".date")
// const element=document.querySelector(".weather-icon")
// const element=document.querySelector(".temp")
// const element=document.querySelector(".humidity")

function displayWeather(){
$(".date").html(weather.date.value)
$(".weather-icon").html('<img src="'+weather.weather-icon.value+'"></img>')
$(".temp").html(weather.temp.value)
$(".humidity").html(weather.humidity.value)
}

$("#searchButton").on("click",runSearch)

function runSearch(event){
event.preventDefault()
var cityInput=$("#city").val()

$.ajax({url:"https://api.openweathermap.org/data/2.5/weather?q="+cityInput+"&appid=9f01f172f115da48d597608ddd41cc38",success:function(res){
console.log(res)
$.ajax({url:"https://api.openweathermap.org/data/2.5/onecall?lat="+res.coord.lat+"&lon="+res.coord.lon+"&exclude=hourly,minutely&appid=9f01f172f115da48d597608ddd41cc38",success:function(results){
console.log(results)
// $(".date").html(results.current)
// $(".weather-icon").html('<img src="'+weather.weather-icon.value+'"></img>')
$(".temp").html(results.current.temp)
$(".humidity").html(results.current.humidity)
}})
}})
}




