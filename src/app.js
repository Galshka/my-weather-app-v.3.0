let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let apiKey = "05bfb21a258cdae24d749dd944debfc2";

function getCurrentDate(date) {
  let now = new Date(date * 1000);
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

function showForecast(forecast) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col text-center" id="forecast-day">
          <div class="forecast-days">${day.day}</div>
          <span class="forecast-temp-max">${day.tempMax} /</span>
          <span class="forecast-temp-min">${day.tempMin}</span>
          <span class="sup">°</span>
          <br />
          <img src="icons/${day.icon}-50.png" 
          class="day-weather-icon" 
          alt = "${day.description}"
          />
        </div>
    `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showWeather(response) {
  let temperature = Math.round(response.data.current.temp);
  temperatureCelsius = response.data.current.temp;
  let humidity = response.data.current.humidity;
  let wind = response.data.current.wind_speed;
  wind = wind.toFixed(1);
  let weatherDescription = response.data.current.weather[0].description;
  weatherDescription =
    weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
  let weatherIcon = response.data.current.weather[0].icon;
  let dateUTC = response.data.current.dt;
  let date = getCurrentDate(dateUTC);

  let dailyForecastFull = response.data.daily;
  dailyForecastFull.shift();
  dailyForecastFull.pop();
  dailyForecastFull.pop();

  let dailyForecast = [];
  dailyForecastFull.forEach(function (day) {
    let dayDate = getCurrentDate(day.dt);
    let dayName = dayDate.dayWeek.substring(0, 3);
    let tempMax = Math.round(day.temp.max);
    let tempMin = Math.round(day.temp.min);
    let iconDay = day.weather[0].icon;
    let iconDesc = day.weather[0].description;
    let dayWeatherData = {
      day: `${dayName}`,
      tempMax: `${tempMax}`,
      tempMin: `${tempMin}`,
      icon: `${iconDay}`,
      description: `${iconDesc}`,
    };
    dailyForecast.push(dayWeatherData);
  });

  let h2 = document.querySelector("h2");
  let todayTemp = document.querySelector(".today-temp");
  let todayWeatherIcon = document.querySelector("#today-weather-icon");
  let todayWeatherDescription = document.querySelector("#weather-description");
  let todayHumidity = document.querySelector("#humidity");
  let todayWind = document.querySelector("#wind");

  h2.innerHTML = `${date.dayWeek}, ${date.time}`;
  todayWeatherDescription.innerHTML = weatherDescription;
  todayTemp.innerHTML = temperature;
  todayWeatherIcon.setAttribute("src", `icons/${weatherIcon}-100.png`);
  todayWeatherIcon.setAttribute("alt", `${weatherDescription}`);
  todayHumidity.innerHTML = `&nbsp;&nbsp;${humidity} %`;
  todayWind.innerHTML = `&nbsp;&nbsp${wind} m/s`;

  showForecast(dailyForecast);
}

function getForecast(response) {
  let h1 = document.querySelector("h1");

  let latitude = response.data[0].lat;
  let longitude = response.data[0].lon;
  let cityName = response.data[0].name;

  h1.innerHTML = cityName;

  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function setCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-form");
  search(inputCity.value);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", setCity);

function changeUnitFahrenheit(event) {
  event.preventDefault();
  let unitF = document.querySelector("#F-unit");
  let unitC = document.querySelector("#C-unit");
  unitF.classList.remove("sup-lite");
  unitF.classList.add("sup-dark");
  unitC.classList.remove("sup-dark");
  unitC.classList.add("sup-lite");
  let todayTemp = document.querySelector(".today-temp");
  let temperature = (temperatureCelsius - 32) / 1.8;
  todayTemp.innerHTML = Math.round(temperature);
}

function changeUnitCelsius(event) {
  event.preventDefault();
  let unitC = document.querySelector("#C-unit");
  let unitF = document.querySelector("#F-unit");
  unitC.classList.remove("sup-lite");
  unitC.classList.add("sup-dark");
  unitF.classList.remove("sup-dark");
  unitF.classList.add("sup-lite");
  let todayTemp = document.querySelector(".today-temp");
  temperature = temperatureCelsius;
  todayTemp.innerHTML = Math.round(temperature);
}

let temperatureCelsius = null;
let tempUnitC = document.querySelector("#temp-unit-celsius");
let tempUnitF = document.querySelector("#temp-unit-fahrenheit");

tempUnitF.addEventListener("click", changeUnitFahrenheit);
tempUnitC.addEventListener("click", changeUnitCelsius);

function search(city) {
  let apiURl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
  console.log(apiURl);
  axios.get(apiURl).then(getForecast);
}

search("Odesa");
// getForecast("Odesa");
