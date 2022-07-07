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

  //imported time in miliseconds to moment JS
  var cityDateMiliseconds = data.dt
  var cityDateFormatted = moment.unix(cityDateMiliseconds).format(" MMM Do, YYYY")

  //weather icon
  const weatherIcon = data.weather[0].icon

  //create
  const cardCity = document.createElement("h2");
  const cardIcon = document.createElement("img");
  const temp = document.createElement("p");
  const wind = document.createElement("p");
  const humidity = document.createElement("p");
  
  //style
  mainEl.classList.add("main-card")
  cardCity.textContent = "City: " + cityInfo.name + cityDateFormatted;
  cardIcon.setAttribute("src", `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`)
  temp.textContent = "Temp: " + cityInfo.main.temp + " F";
  wind.textContent = "Wind: " + cityInfo.wind.speed + " mph";
  humidity.textContent = "Humidity: " + cityInfo.main.humidity + "%";
  
  //append
  mainEl.append(cardCity);
  mainEl.append(cardIcon)
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
  //calls function to load 5 day weather forecast
  renderFuture(data)
}

function renderFuture(data){
  fiveDayEl.innerHTML=""
  var futureDays = data.daily
  console.log(futureDays)
  for (let i = 0; i < 5; i++) {
    console.log(futureDays[i].uvi)

    weatherIcon = futureDays[i].weather[0].icon

    //create
    const card = document.createElement("div")
    const cardDate = document.createElement("h3")
    const cardIcon = document.createElement("img")
    const cardTemp = document.createElement("p")
    const cardWind = document.createElement("p")
    const cardHumidity = document.createElement("p")

    //style
    card.setAttribute("class", "row col-1 card future-cards just")
    cardDate.textContent = moment.unix(futureDays[i].dt).format("MMM Do, YYYY")
    cardIcon.setAttribute("src", `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`)
    cardTemp.textContent = "Temp: " + futureDays[i].temp.day + " F"
    cardWind.textContent = "Wind: " + futureDays[i].wind_speed + " mph"
    cardHumidity.textContent = "Humidity: " + futureDays[i].humidity +"%"
    //append
    
    card.append(cardDate)
    card.append(cardIcon)
    card.append(cardTemp)
    card.append(cardWind)
    card.append(cardHumidity)
    fiveDayEl.append(card)
    console.log(weatherIcon)
  }
}

//http://api.openweathermap.org/data/2.5/weather?q=lacey&appid=bb77654738b6a17701b86fef59bed6f6
