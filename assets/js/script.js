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
    // format API urls
    var weatherAPI = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=${apiKey}`;
    

    // fetch API forecast data
    fetch(weatherAPI)
        .then(response => {
            if (response.ok) {
                response.json()
                    .then(data => {
                        console.log("weather api", data)
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