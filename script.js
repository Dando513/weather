// const element=document.querySelector(".date")
// const element=document.querySelector(".weather-icon")
// const element=document.querySelector(".temp")
// const element=document.querySelector(".humidity")

// function displayWeather() {
//     $(".date").html(weather.date.value)
//     $(".weather-icon").html('<img src="' + weather.weather - icon.value + '"></img>')
//     $(".temp").html(weather.temp.value)
//     $(".humidity").html(weather.humidity.value)
// }
var pastCities = JSON.parse(localStorage.getItem("pastCities")) || ["Edison"]
var cardDeck = [1, 2, 3, 4, 5]
runSearch(pastCities[0])

$("#searchButton").on("click", function () {
    var cityInput = $("#city").val()
    runSearch(cityInput)
})
$("li").on("click", function () {
    var cityInput = $("this").text()
    runSearch(cityInput)
})
function addCities() {
    $(".list-group").empty()
    for (i = 0; i < pastCities.length; i++) {
        $(".list-group").append('<li class="list-group-item">' + pastCities[i] + '</li>')
    }
}
function addCards() {
    for ()

}

function runSearch(city) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=9f01f172f115da48d597608ddd41cc38", success: function (res) {
            console.log(res)
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + res.coord.lat + "&lon=" + res.coord.lon + "&exclude=hourly,minutely&appid=9f01f172f115da48d597608ddd41cc38", success: function (results) {
                    console.log(results)

                    $("#todayForecast img").attr("src", "http://openweathermap.org/img/wn/" + results.current.weather[0].icon + "@2x.png")
                    var date = new Date(results.current.dt * 1000)
                    if (city != "Edison") { pastCities.push(city) }
                    addCities()
                    localStorage.setItem("pastCities", JSON.stringify(pastCities))
                    $("#date").text(date.toLocaleDateString())
                    $("city")
                    $("#temp").text("Temp: " + results.current.temp)
                    $("#humidity").text("Humidity: " + results.current.humidity)
                    $("#wind").text("Wind Speed: " + results.current.wind_speed)
                    $("#uv").text("UV: " + results.current.uvi)
                }
            }
            })
}
    })
}




