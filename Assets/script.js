// SEARCH BAR
var searchBar = document.querySelector(".search-bar");
var searchButton = document.getElementById("search-button");
var searchInput = document.getElementById("search-input");
var form = document.getElementById("form");
var apiKey = "b2a3d794234a2e76abf165d172c1074d";

// establish the API URL- save in a variable
// make another function get forecast weather info

function getCurrentWeatherInfo(cityName) {
  var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`; // run fetch on this

  fetch(currentWeatherUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayCurrentWeather(data)
    });

}

function displayCurrentWeather(data) {
  const { name } = data;
  const description = data.weather[0].description;
  const { temp, humidity } = data.main;
  console.log(temp, humidity)
  const { speed } = data.wind;
  const icon  = data.weather[0].icon;
  const UVI = data.uvi;
  const sunriseTimestamp = data.sys.sunrise;
  const sunsetTimestamp = data.sys.sunset;
  const sunriseTime = new Date(sunriseTimestamp * 1000);
  const sunsetTime = new Date(sunsetTimestamp * 1000);
  
  // console.log(UVI)

  // To display weather on the site
  document.querySelector(".city").innerText = "Weather in " + name;
  // document.querySelector("weather-icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
  document.querySelector(".short").innerText = description;
  document.querySelector(".temperature").innerText = temp + "°F";
  document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
  document.querySelector(".wind-speed").innerText = "Wind Speed: " + speed + " MPH";
  document.querySelector(".sunrise").innerText = "Sunrise time: " + sunriseTime;
  document.querySelector(".sunset").innerText = "Sunset time: " + sunsetTime
  document.querySelector(".sunset").innerText = "Sunset time: " + sunsetTime;
  document.querySelector(".weather-today").classList.remove("loading");
  document.querySelector(".weather-icon").src = "http://openweathermap.org/img/wn/"+ icon +".png";
  document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + description + "')";
  console.log(icon);
}

//   document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";

form.addEventListener ("submit", function (event) {
  event.preventDefault();
  var cityName = searchInput.value;
  console.log(cityName);
  getCurrentWeatherInfo(cityName);
  console.log("button works!")
});