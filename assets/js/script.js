var searchForm = document.querySelector("#search-form");
var searchVal = document.querySelector("#form-input");
var presetLocations = document.querySelector("#preset-buttons");
var apiKey = "5971cbc972f6e5889ab628fd56908316";

function displayWeather(weather) {
    var weatherDataName = document.getElementById('weather-data-name');
    var weatherDataTemp = document.getElementById('weather-data-temperature');
    var weatherDataHumi = document.getElementById('weather-data-humidity');
    var weatherDataSped = document.getElementById('weather-data-wind-speed');
    var weatherDataInde = document.getElementById('weather-data-uv-index');
    // check if api returned any weather
    if (weather.length === 0) {
        weatherDataContainer.textContent = "No weather found.";
        return;
    }
    
    weatherDataName.textContent = weather.name;
    weatherDataTemp.textContent = "Temperature: " + weather.main.temp;
    weatherDataHumi.textContent = "Humidity: " + weather.main.humidity;
    weatherDataSped.textContent = "Wind Speed: " + weather.wind.speed;
    weatherDataInde.textContent = "UV Index: " + weather.weather[0].main;
    
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
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=" + apiKey;

    // fetch API data
    fetch(apiUrl)
        .then(response => {
            if (response.ok) {
                response.json()
                    .then(data => {
                        console.log(data)
                        displayWeather(data)
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