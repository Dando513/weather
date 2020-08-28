var pastCities = JSON.parse(localStorage.getItem("pastCities")) || ["Edison"]

runSearch(pastCities[pastCities.length-1])

$("#searchButton").on("click", function () {
    var cityInput = $("#search").val()
    runSearch(cityInput)
 
})

function addCities() {
    $(".list-group").empty()
    for (i = 0; i < pastCities.length; i++) {
        
    $(".list-group").append('<li class="list-group-item">' + pastCities[i] + '</li>')
    }
    $("li").on("click", function () {
        var cityInput = $(this).text()
        runSearch(cityInput)
    })
}



function cardDeck(results) {
    $("#days").empty()
    for (i = 1; i < 6; i++) {
        var newCard = $("<div>");
        // $("#temp").text("Temp: " + results[i].daily.temp)
        // $("#humidity").text("Humidity: " + results[i].daily.humidity)
        // $("#wind").text("Wind Speed: " + results[i].daily.wind_speed)
        // $("#uv").text("UV: " + results[i].daily.uvi)
        var weatherImage = $("<img>");
        weatherImage.attr("src", "http://openweathermap.org/img/wn/" + results.daily[i].weather[0].icon + "@2x.png")
        var date = new Date(results.daily[i].dt * 1000)
        var dateP= $("<p>").text(date.toLocaleDateString());
        var temp= $("<p>").text("Temp: "+results.daily[i].temp.max);
        var humidity= $("<p>").text("Humidity: "+results.daily[i].humidity);
        var wind= $("<p>").text("Wind: "+results.daily[i].wind_speed);
        var uv= $("<p>").text("UV: "+results.daily[i].uvi);
        newCard.append(dateP);
        newCard.append(temp)
        newCard.append(weatherImage)
        newCard.append(humidity);
        newCard.append(wind);
        newCard.append(uv);
        $("#days").append(newCard);
    }
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
                    console.log(res.name)

                    $("#todayForecast img").attr("src", "http://openweathermap.org/img/wn/" + results.current.weather[0].icon + "@2x.png")
                    var date = new Date(results.current.dt * 1000)
                    if (pastCities.indexOf(res.name)===-1) { pastCities.push(city) }
                    addCities()
                    cardDeck(results)
                    localStorage.setItem("pastCities", JSON.stringify(pastCities))
                    $("#date").text(date.toLocaleDateString())
                    $("#city").text("City: "+ res.name)
                    $("#temp").text("Temp: " + results.current.temp)
                    $("#humidity").text("Humidity: " + results.current.humidity)
                    $("#wind").text("Wind Speed: " + results.current.wind_speed)
                    $("#uv").text("UV: " + results.current.uvi)
                    $("#days").append(newCard);
                }
            })

        }
    })
}