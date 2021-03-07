var searchForm = document.querySelector("#search-form");
var searchVal = document.querySelector("#form-input");
var apiKey = "5971cbc972f6e5889ab628fd56908316";

function formSubmitHandler(event) {
    event.preventDefault();
    console.log(event);
  
    var search = searchVal.nodeValue.trim()
    if (search) {
        getSearch(search)
        searchVal.nodeValue = "";
    } else {
        console.log(error);
    }
    console.log(search)
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
