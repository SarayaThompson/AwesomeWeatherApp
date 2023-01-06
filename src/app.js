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

document.querySelector("h1").innerHTML = `${days[now.getDay()]}, ${
  months[now.getMonth()]
} ${now.getDate()}, ${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;

navigator.geolocation.getCurrentPosition(showPosition);

function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial`;
  let apiKey = "ed76602da2df08fe02c1fb93789845d9";
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function showTemp(response) {
  console.log(response.data);
  let city = response.data.name;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${city}`;

  let tempCurrent = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#main-temp");
  mainTemp.innerHTML = `${tempCurrent}`;

  let descriptionCurrent = response.data.weather[0].main;
  console.log(response.data);
  let mainDescription = document.querySelector("#main-description");
  mainDescription.innerHTML = `${descriptionCurrent}`;

  let tempMax = Math.round(response.data.main.temp_max);
  let maxTemp = document.querySelector("#temp-high-current");
  maxTemp.innerHTML = `${tempMax}`;
  let tempMin = Math.round(response.data.main.temp_min);
  let minTemp = document.querySelector("#temp-low-current");
  minTemp.innerHTML = `${tempMin}`;
}

function changeCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#search-bar");
  console.log(citySearch.value);
  let apiUrl = ` https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&units=imperial`;
  let apiKey = "ed76602da2df08fe02c1fb93789845d9";
  axios.get(`${apiUrl}&appid=${apiKey}`).then(changeData);
}

function changeData(response) {
  console.log(response.data);
  let city = response.data.name;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${city}`;

  let tempCurrent = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#main-temp");
  mainTemp.innerHTML = `${tempCurrent}`;

  let descriptionCurrent = response.data.weather[0].main;
  let mainDescription = document.querySelector("#main-description");
  mainDescription.innerHTML = `${descriptionCurrent}`;

  let tempMax = Math.round(response.data.main.temp_max);
  let maxTemp = document.querySelector("#temp-high-current");
  maxTemp.innerHTML = `${tempMax}`;
  let tempMin = Math.round(response.data.main.temp_min);
  let minTemp = document.querySelector("#temp-low-current");
  minTemp.innerHTML = `${tempMin}`;
}

let button = document.querySelector("#search-row");
button.addEventListener("submit", changeCity);

function changeC(event) {
  event.preventDefault();
  let mainTemp = document.querySelector("#main-temp");
  mainTemp.innerHTML = "19";
}
function changeF(event) {
  event.preventDefault();
  let mainTemp = document.querySelector("#main-temp");
  mainTemp.innerHTML = "66";
}

let degreesC = document.querySelector("#units-cels");
degreesC.addEventListener("click", changeC);

let degreesF = document.querySelector("#units-fahr");
degreesF.addEventListener("click", changeF);
