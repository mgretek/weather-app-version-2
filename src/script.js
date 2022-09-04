//Pulling data through API call based on coordinates to display the next days forecast
function getForecast(coordinates) {
  let apiKey = "749066f0dd440bc71c8cce63998ab3d2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

//Displaying the current weather data pulled through API, getting location coordinates
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#js-current-weather-degree");
  let locationElements = document.querySelectorAll(
    "#js-location, #js-solo-location"
  );
  let airPressureElement = document.querySelector("#js-pressure");
  let humidityElement = document.querySelector("#js-humidity");
  let windElement = document.querySelector("#js-wind-speed");
  let descriptionElement = document.querySelector("#js-description");
  let currentWeatherIconElement = document.querySelector(
    "#js-current-weather-icon"
  );

  temperatureCelsius = Math.round(response.data.main.temp);

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  locationElements.forEach((locationElement) => {
    locationElement.innerHTML = response.data.name;
  });
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

//Getting day name from timestamp provided by API
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//Looping through data to display the next days forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let nextDaysForecast = document.querySelector("#js-next-days");

  let forecastHTML = `<div class="nextDays"><div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="nextDays__name">${formatDay(forecastDay.dt)}</div>
      <div class="nextDays__icon">
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          class="nextDays__iconImg";
        />
      </div>
      <div class="nextDays__temperature">
        <span class="nextDays__temperatureHigh">${Math.round(
          forecastDay.temp.max
        )}° </span>
        <span class="nextDays__temperatureLow">${Math.round(
          forecastDay.temp.min
        )}°</span>
      </div>
    </div>   
    `;
    }
  });

  forecastHTML = forecastHTML + `</div></div>`;
  nextDaysForecast.innerHTML = forecastHTML;
}

//--- *** ---// Displaying current date and time

let currentDateTime = new Date();
let timeInfo = document.querySelector("#js-current-date");

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

//Pulling data through API for a city submitted based on a city name
function search(city) {
  let apiKey = "749066f0dd440bc71c8cce63998ab3d2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

//Event function to get the city name user submitted
function locationSearchSubmit(event) {
  event.preventDefault();
  let locationCity = document.querySelector("#js-search");
  search(locationCity.value);
}

//Adding eventlistener for the search field submit
let searchBarElement = document.querySelector("#js-location-search-form");
searchBarElement.addEventListener("submit", locationSearchSubmit);

//--- *** ---// Current location GPS button

//Asking for user coordinates via browser geolocation
function showCurrentLocationInfo() {
  navigator.geolocation.getCurrentPosition(success, error);
}

//Adding eventlistener on click for the current location button
let currentLocationButton = document.querySelector("#js-my-location-button");
currentLocationButton.addEventListener("click", showCurrentLocationInfo);

//Displaying current weather info based on user's current location
function showCurrentLocationTemperature(response) {
  let myLocationCurrent = document.querySelector("#js-current-weather-degree");
  myLocationCurrent.innerHTML = Math.round(response.data.main.temp);
  let myLocationCityNames = document.querySelectorAll(
    "#js-location, #js-solo-location"
  );
  myLocationCityNames.forEach((myLocationCityName) => {
    myLocationCityName.innerHTML = response.data.name;
    getForecast(response.data.coord);
  });
}

//Getting position data based on coordinates through API if user clicked "allow" on current location request
function success(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  apiKeyCurrent = "749066f0dd440bc71c8cce63998ab3d2";
  apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKeyCurrent}&units=metric`;

  axios.get(apiUrlCurrent).then(function (response) {
    showCurrentLocationTemperature(response);
  });
}

//Displaying alert if user won't allow location request
function error() {
  alert("Please allow access to your location to show current temperature.");
}

//--- *** ---//The default city displayed on reload

search("Tartu");

//--- *** ---// Random quote + author API fetch

fetch("https://type.fit/api/quotes")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let quote = document.querySelector("#js-quote");
    let pickedNumber = Math.floor(Math.random() * data.length);
    quote.innerHTML = `"${data[pickedNumber].text}" </br> - ${data[pickedNumber].author}`;

    if (data[pickedNumber].author === null) {
      quote.innerHTML = `"${data[pickedNumber].text}" </br> - ${(data[
        pickedNumber
      ].author = "author unknown")}`;
    }
  });
