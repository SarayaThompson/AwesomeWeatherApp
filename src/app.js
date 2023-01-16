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

function changeData(response) {
  console.log(response.data);
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
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].main);
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

let farhenheitTemp = null;

function showCelciusTemp(event) {
  event.preventDefault();
  let celciusTemp = ((farhenheitTemp - 32) * 5) / 9;
  document.querySelector("#main-temp").innerHTML = Math.round(celciusTemp);
  farhenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
}

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemp);

function showFahrTemp(event) {
  event.preventDefault();
  document.querySelector("#main-temp").innerHTML = farhenheitTemp;
  celciusLink.classList.remove("active");
  farhenheitLink.classList.add("active");
}

let farhenheitLink = document.querySelector("#fahrenheit-link");
farhenheitLink.addEventListener("click", showFahrTemp);
