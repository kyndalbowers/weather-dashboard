console.log("Code loads...");

// SEARCH BAR
var form = document.getElementById("form");
var searchInput = document.getElementById("search-input");
var searchButton = document.getElementById("searchButton");

// WEATHER & API
var apiKey = "d426c53653b05237d4d24727c6d77db0";

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
}

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

  // Display weather
  document.querySelector(".city").innerText = "Weather in " + name;
  document.querySelector(".short").innerText = description;
  document.querySelector(".temperature").innerText = temp + "°F";
  document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
  document.querySelector(".wind-speed").innerText = "Wind Speed: " + speed + " MPH";
  document.querySelector(".sunrise").innerText = "Sunrise time: " + sunriseTime.toLocaleTimeString();
  document.querySelector(".sunset").innerText = "Sunset time: " + sunsetTime.toLocaleTimeString();
  document.querySelector(".weather-today").classList.remove("loading");
  document.querySelector(".weather-icon").src = "http://openweathermap.org/img/wn/" + icon + ".png";
  // document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + description + "')";
}

function displayForecast(data) {
  forecastContainer.innerHTML = '';

  const forecastList = data.list;
  const displayedDates = []; // To track displayed dates

  for (let i = 0; i < forecastList.length; i++) {
    const forecastItem = document.createElement('div');
    forecastItem.classList.add('forecastItem');

    const date = new Date(forecastList[i].dt_txt);
    const day = date.getDate();

    // Check if the date is already displayed
    if (!displayedDates.includes(day)) {
      displayedDates.push(day); // Add the date to displayedDates

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

// Search button
searchButton.addEventListener ("click", function () {
  console.log("Search button works...");
  event.preventDefault();
  var cityName = searchInput.value;
  console.log("City searched: " + cityName);
  getCurrentWeatherInfo(cityName);
});