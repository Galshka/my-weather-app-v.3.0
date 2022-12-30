let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let apiKey = "6e6ec494746b5229a9f2d526478c924c";
let cityStart = "Odesa";
let h1 = document.querySelector("h1");
let h2 = document.querySelector("h2");
let todayTemp = document.querySelector(".today-temp");
let todayWeatherIcon = document.querySelector("#today-weather-icon");
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

// function changeData(event) {
//   let todayTime = getCurrentDate();
//   console.log(todayTime.dayWeek);
//   let dayNumber = days.indexOf(todayTime.dayWeek);
//   console.log(dayNumber);
//   forecastDay[0].innerHTML = todayTime.dayWeek;
// }

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let weatherDescription = response.data.weather[0].main;
  let weatherIcon = response.data.weather[0].icon;
  let city = response.data.name;
  let date = getCurrentDate();

  h1.innerHTML = city;
  h2.innerHTML = `${date.dayWeek}, ${date.time}`;
  todayTemp.innerHTML = temperature;
  todayWeatherIcon.innerHTML = `
   <img src="icons/${weatherIcon}-100.png" alt="${weatherDescription}" />
   <div class="weather-decription">${weatherDescription}</div>
  `;
}

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityStart}&units=metric&appid=${apiKey}`;
axios.get(apiUrl).then(showWeather);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", changeData);
