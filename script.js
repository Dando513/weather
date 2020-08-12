var pastCities = JSON.parse(localStorage.getItem("pastCities")) || ["Edison"]

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

// Create new function with new call
// perform AJAX call
// create forloop to run through results 5 times (results.daily.)
// inside the return create a var for new card
// create elements for the card
// than your going to append new card to the $(#days)

function cardDeck() {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=9f01f172f115da48d597608ddd41cc38",

        success: function (res) {
            console.log(res)
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + res.coord.lat + "&lon=" + res.coord.lon + "&exclude=hourly,minutely&appid=9f01f172f115da48d597608ddd41cc38",
                success: function (results) {
                    console.log(results)

                    for (i = 0; i < 5; i++) {
                        
                        var newCard = $("<div>");
                        $("#date").text(date.toLocaleDateString())
                       
                        $("#temp").text("Temp: " + results[i].daily.temp)
                        $("#humidity").text("Humidity: " + results[i].daily.humidity)
                        $("#wind").text("Wind Speed: " + results[i].daily.wind_speed)
                        $("#uv").text("UV: " + results[i].daily.uvi)
                    
                        var weatherImage = $("<img>");
                        weatherImage.attr("src", results[i].daily.weather.icon);
                        var date= $("<p>").text(date.toLocaleDateString());
                        
                        var temp= $("<p>").text("Temp: "+results[i].daily.temp);
                        var humidity= $("<p>").text("Humidity: "+results[i].daily.humidity);
                        var wind= $("<p>").text("Wind: "+results[i].daily.wind);
                        var uv= $("<p>").text("UV: "+results[i].daily.uvi);


                        newCard.append(date);
                        newCard.append(temp)
                        newCard.append(humidity);
                        newCard.append(wind);
                        newCard.append(uv);
                        
                        $("#days").append(newCard);

                    }
                }
            })
        }
    })
}


function runSearch(city) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=9f01f172f115da48d597608ddd41cc38",

        success: function (res) {
            console.log(res)
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + res.coord.lat + "&lon=" + res.coord.lon + "&exclude=hourly,minutely&appid=9f01f172f115da48d597608ddd41cc38",
                success: function (results) {
                    console.log(results)

                    $("#todayForecast img").attr("src", "http://openweathermap.org/img/wn/" + results.current.weather[0].icon + "@2x.png")
                    var date = new Date(results.current.dt * 1000)
                    if (city != "Edison") { pastCities.push(city) }
                    addCities()
                    addCards()
                    localStorage.setItem("pastCities", JSON.stringify(pastCities))
                    $("#date").text(date.toLocaleDateString())
                    $("#temp").text("Temp: " + results.current.temp)
                    $("#humidity").text("Humidity: " + results.current.humidity)
                    $("#wind").text("Wind Speed: " + results.current.wind_speed)
                    $("#uv").text("UV: " + results.current.uvi)
                }
            })

        }
    })
}