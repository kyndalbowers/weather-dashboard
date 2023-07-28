// SEARCH BAR
var form = document.getElementById("form");
var searchInput = document.getElementById("search-input");
var apiKey = "b2a3d794234a2e76abf165d172c1074d";

// establish the API URL- save in a variable
// make another function get forecast weather info

function getCurrentWeatherInfo(cityName) {
  var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;

  fetch(currentWeatherUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayCurrentWeather(data);
    });
}

function displayCurrentWeather(data) {
  // Code for displaying weather
}

form.addEventListener("submit", function (event) {
  console.log("button works!");
  event.preventDefault();
  var cityName = searchInput.value;
  console.log(cityName);
  getCurrentWeatherInfo(cityName);
});
