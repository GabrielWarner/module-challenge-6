var searchInputEl = document.getElementById('search-input')

var APIKey = "bb77654738b6a17701b86fef59bed6f6";
var city = "lacey"
queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

function getApi(input) {
    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        return data
      });
  }

var renderCards = function(){
    getApi(data)
} 

var init = function(){
    getApi(queryURL)
}

searchInputEl.addEventListener("submit", renderCards())

init()

//http://api.openweathermap.org/data/2.5/weather?q=lacey&appid=bb77654738b6a17701b86fef59bed6f6