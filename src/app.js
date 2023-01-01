let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let forecastDay = document.querySelectorAll(".forecast-days");
let forecastTemp = document.querySelectorAll(".forecast-temp");

function getCurrentDate() {
  let now = new Date();
  let dayNumber = now.getDay();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (String(hours).length === 1) {
    hours = `0${hours}`;
  }
  if (String(minutes).length === 1) {
    minutes = `0${minutes}`;
  }

  let dayWeek = days[dayNumber];
  let time = `${hours}:${minutes}`;
  return { dayWeek, time };
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  wind = wind.toFixed(1);
  let weatherDescription = response.data.weather[0].description;
  weatherDescription =
    weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
  console.log(weatherDescription);
  let weatherIcon = response.data.weather[0].icon;
  let city = response.data.name;
  let date = getCurrentDate();

  let h1 = document.querySelector("h1");
  let h2 = document.querySelector("h2");
  let todayTemp = document.querySelector(".today-temp");
  let todayWeatherIcon = document.querySelector("#today-weather-icon");
  let todayWeatherDescription = document.querySelector("#weather-description");
  let todayHumidity = document.querySelector("#humidity");
  let todayWind = document.querySelector("#wind");

  h1.innerHTML = city;
  h2.innerHTML = `${date.dayWeek}, ${date.time}`;
  todayWeatherDescription.innerHTML = weatherDescription;
  todayTemp.innerHTML = temperature;
  todayWeatherIcon.setAttribute("src", `icons/${weatherIcon}-100.png`);
  todayWeatherIcon.setAttribute("alt", `${weatherDescription}`);
  todayHumidity.innerHTML = `&nbsp;&nbsp;${humidity} %`;
  todayWind.innerHTML = `&nbsp;&nbsp${wind} m/s`;
}

function search(city) {
  let apiKey = "05bfb21a258cdae24d749dd944debfc2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

search("Odesa");

function setCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-form");
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("submit", setCity);
