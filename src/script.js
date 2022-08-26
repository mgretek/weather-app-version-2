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
}

function displayForecast() {
  let nextDaysForecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecastHTML =
    forecastHTML +
    `
    <div class="col-2">
      <div class="nextDays__day">Thursday</div>
      <div class="nextDays__icon">
        <img
          src="https://ssl.gstatic.com/onebox/weather/48/cloudy.png"
          alt="cloudy"
        />
      </div>
      <div class="nextDays__degree">
        <span class="nextDays__degree-high">29° </span>
        <span class="nextDays__degree-low">22°</span>
      </div>
    </div>    
    `;

  forecastHTML =
    forecastHTML +
    `
    <div class="col-2">
      <div class="nextDays__day">Thursday</div>
      <div class="nextDays__icon">
        <img
          src="https://ssl.gstatic.com/onebox/weather/48/cloudy.png"
          alt="cloudy"
        />
      </div>
      <div class="nextDays__degree">
        <span class="nextDays__degree-high">29° </span>
        <span class="nextDays__degree-low">22°</span>
      </div>
    </div>      
    `;

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

function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (temperatureCelsius * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#current-degree");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let temperatureCelsius = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

//--- *** ---//

function convertToCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#current-degree");
  temperatureElement.innerHTML = Math.round(temperatureCelsius);
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

//--- *** ---//

search("Tartu");
displayForecast();
