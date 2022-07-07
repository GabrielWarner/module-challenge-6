var searchInputEl = document.getElementById("search-input");
var searchBtnEl = document.getElementById("search-btn");

var mainEl = document.getElementById("main-card");
var fiveDayEl = document.getElementById("5-day-card");
var searchHistoryEl = document.getElementById("search-history-card");

var cardCityEl = document.getElementById('card-city')

searchBtnEl.addEventListener("click", getParams);

function getParams(event) {
  event.preventDefault();
  var city = searchInputEl.value;
  if (city === "") {
    alert("please enter something");
    return;
  }
  getApi(city);
}

function getApi(city) {
  var APIKey = "bb77654738b6a17701b86fef59bed6f6";
  queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=imperial";

  fetch(queryURL)
    .then(function (response) {
      if (!response.ok) {
        console.log("error");
      } else {
        return response.json();
      }
    })
    .then(function (data) {
      console.log(data);
      renderMain(data);
      getUVI(data);
    });
}

function renderMain(data) {
  mainEl.innerHTML = "";
  const cityInfo = data;
  var cityDateMiliseconds = data.dt
  var cityDateFormatted = moment.unix(cityDateMiliseconds).format(" MMM Do, YYYY")
  const cardCity = document.createElement("h2");
  const temp = document.createElement("p");
  const wind = document.createElement("p");
  const humidity = document.createElement("p");
  cardCity.textContent = "City: " + cityInfo.name + cityDateFormatted;
  temp.textContent = "Temp: " + cityInfo.main.temp;
  wind.textContent = "Wind: " + cityInfo.wind.speed;
  humidity.textContent = "Humidity: " + cityInfo.main.humidity;
  
  mainEl.append(cardCity);
  mainEl.append(temp);
  mainEl.append(wind);
  mainEl.append(humidity);
  
}

function getUVI(data) {
  var APIKey = "bb77654738b6a17701b86fef59bed6f6";
  var lat = data.coord.lat;
  var lon = data.coord.lon;
  queryURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=hourly,minutely,&units=imperial&appid=" +
    APIKey;
  fetch(queryURL)
    .then(function (response) {
      if (!response.ok) {
        console.log("error");
      } else {
        return response.json();
      }
    })
    .then(function (data) {
      console.log(data);
      secondAPI(data)
    });
}

//second function that will fethc UV Index and also future forecast
function secondAPI(data){
  const cityUVI = data.current.uvi
  const weatherIcon = data.current.weather[0][4]
  const cardUVIContainer = document.getElementById
  const cardUVI = document.createElement("p")
  //sets background color of UV index based on what the value is
  if(cityUVI > 0 || cityUVI < 3){
    cardUVI.classList.add("favorable")
  }else if(cityUVI >= 3 || cityUVI < 6){
    cardUVI.classList.add("moderate")
  }else{
    cardUVI.classList.add("severe")
  }
  //weatherIcon = cityInfo.weather[0].icon
  cardUVI.textContent = "UV Index: " + cityUVI
  mainEl.append(cardUVI)
  console.log(cityUVI)
  //cardCityEl.textContent(cardCityEl.textContent + cityInfo.weather[0].icon)
}
//function renderCards(event){
//   console.log(event)
//}

//http://api.openweathermap.org/data/2.5/weather?q=lacey&appid=bb77654738b6a17701b86fef59bed6f6
