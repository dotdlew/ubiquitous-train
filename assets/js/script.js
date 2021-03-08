var searchForm = document.querySelector("#search-form");
var searchVal = document.querySelector("#form-input");
var presetLocations = document.querySelector("#preset-buttons");
var apiKey = "5971cbc972f6e5889ab628fd56908316";

function displayWeather(weather) {
    var weatherDataName = document.getElementById('weatherBlock00');
    var weatherDataTemp = document.getElementById('weatherBlock01');
    var weatherDataHumi = document.getElementById('weatherBlock02');
    var weatherDataSped = document.getElementById('weatherBlock03');
    var weatherDataInde = document.getElementById('weatherBlock04');


    // check if api returned any weather
    if (weather.length === 0) {
        weatherDataContainer.textContent = "No weather found.";
        return;
    }

    // messy set weather
    weatherDataName.textContent = weather.name;
    weatherDataTemp.textContent = "Temperature: " + weather.main.temp;
    weatherDataHumi.textContent = "Humidity: " + weather.main.humidity + "%";
    weatherDataSped.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
    weatherDataInde.textContent = "UV Index: " + weather.weather[0].main;
}

function displayForecast(forecast) {
    var forecastName = document.getElementById('forecastBlock00');
    var forecast = document.getElementById('forecastBlock01');
    var forecast = document.getElementById('forecastBlock02');
    var forecast = document.getElementById('forecastBlock03');
    var forecast = document.getElementById('forecastBlock04');
    var forecast = document.getElementById('forecastBlock05');
    

    // check if api returned any forecast
    if (forecast.length === 0) {
        forecast.textContent = "No forecast found.";
        return;
    }

    // messy set forecast
    forecastName.textContent = "5-Day Forecast"
    
}

function presetsClickHandler(event) {
    var preset = event.target.getAttribute("data-location");

    if (preset) {
        getSearch(preset)
        searchVal.value = "";
    }
}

function formSubmitHandler(event) {
    event.preventDefault();

    var search = searchVal.value.trim()
    if (search) {
        getSearch(search)
        searchVal.value = "";
    }
}

function getSearch(search) {
    // format url
    var weather = "http://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=" + apiKey;
    var forecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + search + "&appid=" + apiKey;

    // fetch API weather data
    fetch(weather)
        .then(response => {
            if (response.ok) {
                response.json()
                    .then(data => {
                        displayWeather(data)
                    })
            } else {
                console.log("error: " + response.statusText)
            }
        })
        .catch(err => {
            console.log("error: " + err.statusText)
        })

    // fetch API forecast data
    fetch(forecast)
        .then(response => {
            if (response.ok) {
                response.json()
                    .then(data => {
                        console.log("forecast", data)
                        displayForecast(data)
                    })
            } else {
                console.log("error: " + response.statusText)
            }
        })
        .catch(err => {
            console.log("error: " + err.statusText)
        })
}

searchForm.addEventListener("submit", formSubmitHandler);
presetLocations.addEventListener('click', presetsClickHandler)