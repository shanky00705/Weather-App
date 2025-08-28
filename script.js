const apiKey = "176e9bd211d7e7b121b290e07a1559ca";

const cityInput = document.getElementById("cityInput");
const submitBtn = document.getElementById("submitBtn");

const cityNameElem = document.getElementById("cityName");
const cityElem = document.getElementById("city");
const dateElem = document.getElementById("date");
const tempElem = document.getElementById("temp");
const feelsLikeElem = document.getElementById("feels_like");
const humidityElem = document.getElementById("humidity");
const windSpeedElem = document.getElementById("wind_speed");
const conditionElem = document.getElementById("condition");
const weatherIconElem = document.getElementById("weather_icon");

function animateCard() {
  const card = document.querySelector('.weather-card');
  card.style.animation = 'none';
  card.offsetHeight; // trigger reflow
  card.style.animation = null;
}

function checkWeather(city) {
  if (!city) return alert("Please enter a city name");

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      console.log(data);

      cityNameElem.textContent = data.name;
      cityElem.textContent = data.name;

      const now = new Date();
      const day = now.toLocaleString("default", { weekday: "long" });
      const date = now.toLocaleDateString("default", { month: "short", day: "numeric" });
      dateElem.textContent = `${day}, ${date}`;

      tempElem.textContent = `${Math.round(data.main.temp)}°C`;
      feelsLikeElem.textContent = `${Math.round(data.main.feels_like)}°C`;
      humidityElem.textContent = `${data.main.humidity}%`;
      windSpeedElem.textContent = `${data.wind.speed} km/h`;
      conditionElem.textContent = data.weather[0].description;

      const iconCode = data.weather[0].icon;
      weatherIconElem.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      weatherIconElem.alt = data.weather[0].description;

      // Trigger card animation on data update
      animateCard();
    })
    .catch(error => {
      console.error("Error fetching weather:", error);
      alert("Could not fetch weather data. Please check the city name.");
    });
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  checkWeather(city);
});

// Load default city weather on page load
checkWeather("Delhi");

// Dark mode toggle
const toggle = document.getElementById('themeToggle');
const body = document.body;

// Check saved theme
if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light');
  toggle.checked = false;
} else {
  body.classList.remove('light');
  toggle.checked = true;
}

// Toggle event
toggle.addEventListener('change', () => {
  if (toggle.checked) {
    body.classList.remove('light');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.add('light');
    localStorage.setItem('theme', 'light');
  }
});
