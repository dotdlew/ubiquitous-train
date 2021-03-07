var searchForm = document.querySelector("#search-form");
var searchVal = document.querySelector("#form-input");
var presetLocations = document.querySelector("#preset-buttons");
var apiKey = "5971cbc972f6e5889ab628fd56908316";

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
    } else {
        console.log(err);
    }
}

function getSearch(search) {
    // format url
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=" + apiKey;

    // fetch API data
    fetch(apiUrl)
        .then(response => {
            response.json()
                .then(data => {
                    console.log(data)
                })
        })

}

searchForm.addEventListener("submit", formSubmitHandler);
presetLocations.addEventListener('click', presetsClickHandler)