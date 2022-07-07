var searchInputEl = document.getElementById('search-input')
var searchBtnEl = document.getElementById('search-btn')

var mainEl = document.getElementById('main-card')
var fiveDayEl = document.getElementById('5-day-card')
var searchHistoryEl = document.getElementById('search-history-card')

searchBtnEl.addEventListener("click", getParams)


function getParams(event){
  event.preventDefault()
  var city = searchInputEl.value
  if(city === ""){
    alert("please enter something")
    return
  }
  getApi(city)
}


function getApi(city) {

  var APIKey = "bb77654738b6a17701b86fef59bed6f6";
  queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";


    fetch(queryURL)
      .then(function (response) {
        if(!response.ok){
          console.log("error")
        }else{
          return response.json();
        }
      })
      .then(function (data) {
        console.log(data)
        renderMain(data)
        getUVI(data)
      });
  }

  function renderMain(data){
    mainEl.innerHTML=""
    const cityInfo = data
    const cardCity = document.createElement("h2")
    const temp = document.createElement("p")
    const wind = document.createElement("p")
    const humidity = document.createElement("p")
    const uvIndex = document.createElement("p")
    cardCity.textContent ="City: " + data.name
    temp.textContent ="Temp: " + data.main.temp
    wind.textContent ="Wind: " + data.wind.speed
    humidity.textContent ="Humidity: " + data.main.humidity
    uvIndex.textContent ="UV Index: " + data.name
    mainEl.append(cardCity)
    mainEl.append(temp)
    mainEl.append(wind)
    mainEl.append(humidity)
    mainEl.append(uvIndex)
  }

  function getUVI(data){
    var APIKey = "bb77654738b6a17701b86fef59bed6f6";
    var lat = data.coord.lat
    var lon = data.coord.lon
    queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey;
    fetch(queryURL)
    .then(function (response) {
      if(!response.ok){
        console.log("error")
      }else{
        return response.json();
      }
    })
    .then(function (data) {
        console.log(data)
    });
  }

//function renderCards(event){
 //   console.log(event)
//} 






//http://api.openweathermap.org/data/2.5/weather?q=lacey&appid=bb77654738b6a17701b86fef59bed6f6