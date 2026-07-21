const API_KEY = "1ed9fe55e2c1836afed3dad472a2a077";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

// DOM Elements
const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherDisplay = document.getElementById("weather-display");
const searchHistory = document.getElementById("search-history");

// Weather Elements
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");

// Forecast Elements
const forecast = document.getElementById("forecast");
const forecastContainer = document.getElementById("forecast-container");

async function getWeather(city) {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        showLoading();
        hideError();

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found");
            }

            throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();

        displayWeather(data);

        // Load 5-day forecast
        getForecast(city);

        saveToHistory(city);

    } catch (err) {
        showError(err.message);

    } finally {
        hideLoading();
    }
}

async function getForecast(city) {
    const url = `${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch forecast");
        }

        const data = await response.json();

        displayForecast(data);

    } catch (error) {
        console.error(error);
    }
}

function displayWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;

    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;

    temperature.textContent = `${Math.round(data.main.temp)}°C`;

    description.textContent = data.weather[0].description;

    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;

    humidity.textContent = `${data.main.humidity}%`;

    wind.textContent = `${data.wind.speed} m/s`;

    pressure.textContent = `${data.main.pressure} hPa`;

    weatherDisplay.classList.remove("hidden");
}

function displayForecast(data) {
    forecastContainer.innerHTML = "";

    const dailyForecast = data.list.filter((item, index) => index % 8 === 0);

    dailyForecast.forEach(day => {
        const card = document.createElement("div");

        const date = new Date(day.dt_txt).toLocaleDateString(undefined, {
            weekday: "short"
        });

        card.className = "forecast-card";

        card.innerHTML = `
            <h4>${date}</h4>

            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="${day.weather[0].description}">

            <p>${Math.round(day.main.temp)}°C</p>

            <p>${day.weather[0].description}</p>
        `;

        forecastContainer.appendChild(card);
    });

    forecast.classList.remove("hidden");
}

function showLoading() {
    loading.classList.remove("hidden");
    weatherDisplay.classList.add("hidden");
    forecast.classList.add("hidden");
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(message) {
    error.textContent = message;
    error.classList.remove("hidden");
}

function hideError() {
    error.classList.add("hidden");
}

function saveToHistory(city) {
    let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];

    history = history.filter(item => item.toLowerCase() !== city.toLowerCase());

    history.unshift(city);

    history = history.slice(0, 5);

    localStorage.setItem("weatherHistory", JSON.stringify(history));

    loadHistory();
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem("weatherHistory")) || [];

    searchHistory.innerHTML = "";

    history.forEach(city => {
        const li = document.createElement("li");

        li.textContent = city;

        li.style.cursor = "pointer";

        li.addEventListener("click", () => {
            cityInput.value = city;
            getWeather(city);
        });

        searchHistory.appendChild(li);
    });
}

// Event Listener
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = cityInput.value.trim();

    if (city) {
        getWeather(city);
    }
});

// Initialize
loadHistory();