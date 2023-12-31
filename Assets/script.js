// SEARCH BAR
var form = document.getElementById("form");
var searchInput = document.getElementById("search-input");
var searchButton = document.getElementById("searchButton");

// SEARCH HISTORY
var searchedCities = [];

// Function to retrieve the previously searched cities from localStorage
function loadSearchHistory() {
  var historyData = localStorage.getItem('history');
  if (historyData) {
    searchedCities = JSON.parse(historyData);
  }
}

// Function to update the search history in localStorage
function updateSearchHistory() {
  localStorage.setItem('history', JSON.stringify(searchedCities));
}

// Call function to load the search history when the script loads
loadSearchHistory();

// Function to add searched city to localStorage list
function addCity(){
  // checking if city is already in favs list
  if(searchedCities.includes(document.getElementById("search-input").value)){
    console.log(document.getElementById("search-input").value + " is already in search history list")

  // adding city to history list
  }else{
    console.log("Adding " + document.getElementById("search-input").value + " to search history list...");
    searchedCities.push(document.getElementById("search-input").value);
    localStorage.setItem('history', JSON.stringify(searchedCities));
    console.log('history list updated!');
    console.log(searchedCities);
    updateSearchHistory();
  }
}

// DISPLAY SEARCH HISTORY
var listHistory = document.getElementById("ul-history");

searchedCities.forEach((item) => {
  let cityButton = document.createElement("button");
  cityButton.textContent = item;
  cityButton.classList.add("city-button");
  cityButton.addEventListener("click", function () {
    getCurrentWeatherInfo(item);
  });
  listHistory.appendChild(cityButton);
});

// WEATHER & API
var apiKey = "d426c53653b05237d4d24727c6d77db0";

// DATE FUNCTIONALITY
function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

// Function to get weather data from API
function getCurrentWeatherInfo(cityName) {
  var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;
  var forecastWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&&appid=${apiKey}`

  fetch(currentWeatherURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayCurrentWeather(data);
    });

  fetch(forecastWeatherURL)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      displayForecastWeather(data);
    })
  addCity();
}

// Functions to display weather data to page
function displayCurrentWeather(data) {
  const { name } = data;
  const description = data.weather[0].description;
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  const icon = data.weather[0].icon;
  const sunriseTimestamp = data.sys.sunrise;
  const sunsetTimestamp = data.sys.sunset;
  const sunriseTime = new Date(sunriseTimestamp * 1000);
  const sunsetTime = new Date(sunsetTimestamp * 1000);

  document.querySelector(".city").innerText = "Weather in " + name;
  document.querySelector(".short").innerText = description;
  document.querySelector(".temperature").innerText = temp + "°F";
  document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
  document.querySelector(".wind-speed").innerText = "Wind Speed: " + speed + " MPH";
  document.querySelector(".sunrise").innerText = "Sunrise time: " + sunriseTime.toLocaleTimeString();
  document.querySelector(".sunset").innerText = "Sunset time: " + sunsetTime.toLocaleTimeString();
  document.querySelector(".weather-today").classList.remove("loading");
  document.querySelector(".weather-icon").src = "http://openweathermap.org/img/wn/" + icon + ".png";
}

function displayForecastWeather(data) {
  const forecastContainer = document.getElementById('forecastContainer');
  forecastContainer.innerHTML = '';

  const forecastList = data.list;
  const displayedDates = [];

  for (let i = 0; i < forecastList.length; i++) {
    const forecastItem = document.createElement('div');
    forecastItem.classList.add('forecastItem');

    const date = new Date(forecastList[i].dt_txt);
    const day = date.getDate();

    if (!displayedDates.includes(day)) {
      displayedDates.push(day);

      const forecastDay = document.createElement('div');
      forecastDay.textContent = getDayOfWeek(date);
      forecastItem.appendChild(forecastDay);

      const forecastDate = document.createElement('div');
      forecastDate.textContent = formatDate(date);
      forecastItem.appendChild(forecastDate);

      const forecastTemperature = document.createElement('div');
      forecastTemperature.textContent = `${forecastList[i].main.temp}°F`;
      forecastItem.appendChild(forecastTemperature);

      const forecastIcon = document.createElement('img');
      forecastIcon.src = `http://openweathermap.org/img/wn/${forecastList[i].weather[0].icon}.png`;
      forecastIcon.alt = 'Weather Icon';
      forecastItem.appendChild(forecastIcon);

      forecastContainer.appendChild(forecastItem);
    }
  }
}

// SEARCH BUTTON
searchButton.addEventListener ("click", function () {
  console.log("Search button works...");
  event.preventDefault();
  var cityName = searchInput.value;
  console.log("City searched: " + cityName);
  getCurrentWeatherInfo(cityName);
});

// DAY FORMATTING
function getDayOfWeek(date) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeek[date.getDay()];
}

