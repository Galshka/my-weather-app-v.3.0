let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let forecastDay = document.querySelector(".forecast-days");
console.log(forecastDay);

function getCurrentDate() {
  let now = new Date();
  let dayNumber = now.getDay();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (String(minutes).length === 1) {
    minutes = `0${minutes}`;
  }

  let dayWeek = days[dayNumber];
  let time = `${hours}:${minutes}`;
  return { dayWeek, time };
}

// function changeData(event) {
//     let todayTime = getCurrentDate();
// }

// let searchButton = document.querySelector("#search-button");
// searchButton.addEventListener("click", changeData);
