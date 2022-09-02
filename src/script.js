function getForecast(coordinates) {
  let apiKey = "749066f0dd440bc71c8cce63998ab3d2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-degree");
  let locationElement = document.querySelector("#location");
  let airPressureElement = document.querySelector("#pressure");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let descriptionElement = document.querySelector("#description");
  let currentWeatherIconElement = document.querySelector(
    "#current-weather-main-icon"
  );

  temperatureCelsius = Math.round(response.data.main.temp);

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  locationElement.innerHTML = response.data.name;
  airPressureElement.innerHTML = response.data.main.pressure;
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed) * 3.6;
  descriptionElement.innerHTML = response.data.weather[0].description;
  currentWeatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentWeatherIconElement.setAttribute(
    "alt",
    `Image of ${response.data.weather[0].description}`
  );

  getForecast(response.data.coord);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let nextDaysForecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="nextDays__day">${formatDay(forecastDay.dt)}</div>
      <div class="nextDays__icon">
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt="cloudy"
          width= 90px;
        />
      </div>
      <div class="nextDays__degree">
        <span class="nextDays__degree-high">${Math.round(
          forecastDay.temp.max
        )}° </span>
        <span class="nextDays__degree-low">${Math.round(
          forecastDay.temp.min
        )}°</span>
      </div>
    </div>    
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  nextDaysForecast.innerHTML = forecastHTML;
}

//--- *** ---//

let currentDateTime = new Date();
let timeInfo = document.querySelector("#current-date");

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

let currentWeekDay = weekDays[currentDateTime.getDay()];
let currentDate = String(currentDateTime.getDate()).padStart(2, "0");
let currentMonth = String(months[currentDateTime.getMonth()]).padStart(2, "0");
let currentYear = currentDateTime.getFullYear();
let currentHours = String(currentDateTime.getHours()).padStart(2, "0");
let currentMinutes = String(currentDateTime.getMinutes()).padStart(2, "0");

timeInfo.innerHTML = `${currentDate}.${currentMonth}.${currentYear}, ${currentWeekDay} </br> ${currentHours}:${currentMinutes}`;

//--- *** ---//

function search(city) {
  let apiKey = "749066f0dd440bc71c8cce63998ab3d2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function locationSearchSubmit(event) {
  event.preventDefault();
  let locationCity = document.querySelector("#search");
  search(locationCity.value);
}

let searchBarElement = document.querySelector(".locationSearchForm");
searchBarElement.addEventListener("submit", locationSearchSubmit);

//--- *** ---//

function showCurrentLocationInfo() {
  navigator.geolocation.getCurrentPosition(success, error);
}

let currentLocationButton = document.querySelector("#my-current-location");
currentLocationButton.addEventListener("click", showCurrentLocationInfo);

function showCurrentLocationTemperature(response) {
  console.log(response);
  let myLocationCurrent = document.querySelector("#current-degree");
  myLocationCurrent.innerHTML = Math.round(response.data.main.temp);
  let myCurrentCity = document.querySelector(
    ".currentWeather__currentLocation"
  );
  myCurrentCity.innerHTML = response.data.name;
}

function success(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  apiKeyCurrent = "749066f0dd440bc71c8cce63998ab3d2";
  apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKeyCurrent}&units=metric`;

  axios.get(apiUrlCurrent).then(showCurrentLocationTemperature);
}

function error() {
  alert("Please allow access to your location to show current temperature.");
}

//--- *** ---//

search("Tartu");

//--- *** ---//

fetch("https://type.fit/api/quotes")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    //console.log(data);
    let quote = document.querySelector(".quote");
    quote.innerHTML = `"${data[0].text}" </br> quote by ${data[0].author}`;
    //quote.innerHTML = `"${data[Math.floor(Math.random() * data.length)]}"`;
  });

/*
var colors = ["red", "blue", "green", "yellow"];
var randomColor = colors[Math.floor(Math.random() * colors.length)];
console.log(randomColor);
*/
