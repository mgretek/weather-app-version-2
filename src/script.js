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

search("Tartu");

let searchBarElement = document.querySelector(".locationSearchForm");
searchBarElement.addEventListener("submit", locationSearchSubmit);
