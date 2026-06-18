function searchWeather() {
    var city = document.getElementById("cityInput").value;
    var message = document.getElementById("message");

    message.textContent = "";

    if (city === "") {
        message.textContent = "都市名を入力してください。";
        return;
    }

    var cityUrl =
        "https://geocoding-api.open-meteo.com/v1/search" +
        "?name=" + encodeURIComponent(city) +
        "&count=1" +
        "&language=ja" +
        "&format=json";

    fetch(cityUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.results === undefined) {
                message.textContent = "都市が見つかりませんでした。";
                return;
            }

            var place = data.results[0];

            getWeather(
                place.latitude,
                place.longitude,
                place.name,
                place.country
            );
        })
        .catch(function() {
            message.textContent = "都市の検索に失敗しました。";
        });
}

function getWeather(latitude, longitude, cityName, countryName) {
    var message = document.getElementById("message");

    var weatherUrl =
        "https://api.open-meteo.com/v1/forecast" +
        "?latitude=" + latitude +
        "&longitude=" + longitude +
        "&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m" +
        "&timezone=auto";

    fetch(weatherUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            showWeather(data.current, cityName, countryName);
        })
        .catch(function() {
            message.textContent = "天気情報の取得に失敗しました。";
        });
}

function showWeather(weather, cityName, countryName) {
    document.getElementById("cityName").textContent =
        cityName + " / " + countryName;

    document.getElementById("temperature").textContent =
        weather.temperature_2m;

    document.getElementById("apparentTemperature").textContent =
        weather.apparent_temperature;

    document.getElementById("humidity").textContent =
        weather.relative_humidity_2m;

    document.getElementById("windSpeed").textContent =
        weather.wind_speed_10m;

    changeWeatherDesign(weather.weather_code);
}

function changeWeatherDesign(code) {
    var card = document.getElementById("weatherCard");
    var icon = document.getElementById("weatherIcon");
    var text = document.getElementById("weatherText");

    card.className = "weather-card";

    if (code === 0) {
        icon.textContent = "☀️";
        text.textContent = "晴れ";
        card.classList.add("sunny");
    } else if (code === 1 || code === 2 || code === 3) {
        icon.textContent = "☁️";
        text.textContent = "曇り";
        card.classList.add("cloudy");
    } else if (code === 45 || code === 48) {
        icon.textContent = "🌫️";
        text.textContent = "霧";
        card.classList.add("cloudy");
    } else if (
        code === 51 ||
        code === 53 ||
        code === 55 ||
        code === 61 ||
        code === 63 ||
        code === 65 ||
        code === 80 ||
        code === 81 ||
        code === 82
    ) {
        icon.textContent = "🌧️";
        text.textContent = "雨";
        card.classList.add("rainy");
    } else if (
        code === 71 ||
        code === 73 ||
        code === 75 ||
        code === 77 ||
        code === 85 ||
        code === 86
    ) {
        icon.textContent = "❄️";
        text.textContent = "雪";
        card.classList.add("snowy");
    } else if (code === 95 || code === 96 || code === 99) {
        icon.textContent = "⛈️";
        text.textContent = "雷雨";
        card.classList.add("stormy");
    } else {
        icon.textContent = "🌤️";
        text.textContent = "天気情報";
        card.classList.add("cloudy");
    }
}