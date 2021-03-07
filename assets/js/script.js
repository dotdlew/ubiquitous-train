var searchVal = document.querySelector('#city');
var searchButton = document.querySelector('#searchButton');

function formSubmitHandler(event){
    event.preventDefault();

    var search = searchVal.nodeValue.trim()
    if (search) {
        getSearch(search)
        searchVal.nodeValue = "";
    } else {
        console.error(err)
    }
    console.log(event)
}

searchButton.addEventListener("submit", formSubmitHandler);
