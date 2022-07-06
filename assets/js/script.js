var searchInputEl = document.getElementById('search-input')
var searchBtnEl = document.getElementById('search-btn')

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
  queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;


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