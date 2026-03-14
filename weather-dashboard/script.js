// API key from OpenWeatherMap
const apiKey ="1e3a5a57ff838ec9590f81a23fb9197b";

// Function to get current weather
function getWeather() {

let city = document.getElementById("cityInput").value;

// Check if input is empty
if (city === "") {
document.getElementById("weather").innerText = "Please enter a city name";
return;
}

// Show loading message
document.getElementById("loading").innerText = "Loading...";
document.getElementById("weather").innerHTML = "";
document.getElementById("forecast").innerHTML = "";

// Fetch current weather
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
.then(response => response.json())
.then(data => {

// Remove loading message
document.getElementById("loading").innerText = "";

// If city not found
if (data.cod !== 200 && data.cod !== "200") {
document.getElementById("weather").innerText = "City not found";
return;
}

// Display current weather
let weatherHTML = `
<h2>${data.name}</h2>
<p>Temperature: ${data.main.temp} °C</p>
<p>Weather: ${data.weather[0].description}</p>
<p>Humidity: ${data.main.humidity}%</p>
`;

document.getElementById("weather").innerHTML = weatherHTML;

// Get forecast
getForecast(city);

})

// Handle network errors
.catch(() => {
document.getElementById("loading").innerText = "";
document.getElementById("weather").innerText = "Error fetching weather data";
});

}


// Function to get 5-day forecast
function getForecast(city) {

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
.then(response => response.json())
.then(data => {

let forecastHTML = "";

// Loop for 5 days
for (let i = 0; i < 5; i++) {

let day = data.list[i * 8];

forecastHTML += `
<div class="card">
<p>${day.dt_txt.split(" ")[0]}</p>
<p>${day.main.temp} °C</p>
<p>${day.weather[0].main}</p>
</div>
`;

}

document.getElementById("forecast").innerHTML = forecastHTML;

})

// Handle forecast errors
.catch(() => {
document.getElementById("forecast").innerText = "Error loading forecast";
});

}


// Debounced search (waits before calling API)
let timer;

document.getElementById("cityInput").addEventListener("input", function () {

clearTimeout(timer);

timer = setTimeout(() => {
getWeather();
}, 500);

});