const apikey = "c38b2ebf4e734d2488112508242407";
const form = document.querySelector("form");
const input = document.querySelector("input");
const temp = document.querySelector(".temperature");
const city = document.querySelector(".city");
const weather_img = document.querySelector(".weather-img");
const humidity = document.querySelector("#humidity");
const wind_speed = document.querySelector("#wind-speed");

async function getWeatherByCity(cityName) {
    const url = `http://api.weatherapi.com/v1/current.json?q=${cityName}&key=${apikey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        updateDOM(data);
    } catch (error) {
        alert("Error fetching weather: " + error.message);
    }
}

async function getWeatherByCoordinates(lat, lon) {
    const url = `http://api.weatherapi.com/v1/current.json?q=${lat},${lon}&key=${apikey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Location not found");
        const data = await response.json();
        updateDOM(data);
    } catch (error) {
        alert("Error fetching location-based weather: " + error.message);
    }
}

function updateDOM(data) {
    const temperature = data.current;
    const location = data.location;

    temp.innerText = `${temperature.temp_c}`;
    city.innerText = location.name;
    weather_img.setAttribute("src", temperature.condition.icon);
    humidity.innerText = `${temperature.humidity}`;
    wind_speed.innerText = `${temperature.wind_kph}`;
}

// Handle form submit for manual city search
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityName = input.value.trim();
    if (cityName) {
        getWeatherByCity(cityName);
    } else {
        alert("Please enter a city name.");
    }
});

// On load, get current location
window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeatherByCoordinates(lat, lon);
            },
            (error) => {
                alert("Geolocation not allowed. Using default city (Varanasi).");
                getWeatherByCity("Varanasi");
            }
        );
    } else {
        alert("Geolocation not supported. Using default city (Varanasi).");
        getWeatherByCity("Varanasi");
    }
});
