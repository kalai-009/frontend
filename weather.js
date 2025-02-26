// OpenWeatherMap API Key and Base URL
const apiKey = '07a057d8e1ece34b4a8307885e121dc8'; // Provided API Key
const apiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// DOM elements
const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const description = document.getElementById('description');
const weatherIcon = document.getElementById('weatherIcon');
const errorMessage = document.getElementById('errorMessage');
const weatherInfo = document.getElementById('weatherInfo');

// Function to fetch weather data
const getWeather = async (city) => {
  try {
    const response = await fetch(`${apiBaseUrl}?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (response.ok) {
      // Update the DOM with the weather data
      cityName.textContent = `City: ${data.name}`;
      temperature.textContent = `Temperature: ${data.main.temp} °C`;
      humidity.textContent = `Humidity: ${data.main.humidity} %`;
      description.textContent = `Description: ${data.weather[0].description}`;

      // Display weather icon
      const iconCode = data.weather[0].icon;
      weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
      weatherIcon.alt = data.weather[0].description;

      // Show the weather info section
      weatherInfo.style.display = 'block';
      errorMessage.textContent = ''; // Clear any previous error message
    } else {
      // Handle city not found or API errors
      errorMessage.textContent = `Error: ${data.message}`;
      weatherInfo.style.display = 'none';
    }
  } catch (error) {
    // Handle network or fetch errors
    errorMessage.textContent = 'Error: Unable to fetch weather data.';
    weatherInfo.style.display = 'none';
  }
};

// Event listener for button click
getWeatherBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    errorMessage.textContent = 'Please enter a city name.';
    weatherInfo.style.display = 'none';
  }
});