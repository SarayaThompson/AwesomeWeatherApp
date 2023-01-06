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

function changeData(response) {
  console.log(response.data);
  document.querySelector("h2").innerHTML = response.data.name;

  document.querySelector("#main-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#main-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#temp-high-current").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#temp-low-current").innerHTML = Math.round(
    response.data.main.temp_min
  );
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
