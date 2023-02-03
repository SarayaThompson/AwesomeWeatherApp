let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatDt(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}

document.querySelector("h1").innerHTML = `${days[now.getDay()]}, ${
  months[now.getMonth()]
} ${now.getDate()}, ${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="Clear" class="small-icon">
        <div class="forecast-date">${formatDt(forecastDay.dt)}</div>
        <div class="forecast-temp-max">
          <strong>${Math.round(forecastDay.temp.max)}°F </strong>
        </div>
        <span class="forecast-temp-min">${Math.round(
          forecastDay.temp.min
        )}°F </span>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "2718952144ed077c12e7c160fb6fc351";
  let apiUrl = `
  https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function changeData(response) {
  document.querySelector("h2").innerHTML = response.data.name;

  farhenheitTemp = Math.round(response.data.main.temp);

  document.querySelector("#main-temp").innerHTML = farhenheitTemp;
  document.querySelector("#main-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#temp-high-current").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#temp-low-current").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].main);
  getForecast(response.data.coord);
}

function search(city) {
  let apiUrl = ` https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial`;
  let apiKey = "ed76602da2df08fe02c1fb93789845d9";
  axios.get(`${apiUrl}&appid=${apiKey}`).then(changeData);
}
function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  search(city);
}
document.querySelector("#search-row").addEventListener("submit", changeCity);
search("Los angeles");
