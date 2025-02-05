const apiKey = 'efd6a5311922d90c0b589dcea7f1663e';
const cities = ["Tbilisi", "London", "New York", "Paris", "Tokyo", "Berlin", "Moscow", "Beijing"];

let unit = localStorage.getItem('unit') || 'metric';

function setUnit(selectedUnit) {
    unit = selectedUnit;
    localStorage.setItem('unit', selectedUnit);
  
    // Highlight the selected unit button
    const buttons = document.querySelectorAll('.menu-options button');
    buttons.forEach(button => {
      button.style.backgroundColor = button.textContent.toLowerCase() === selectedUnit ? '#ddd' : '';
    });
  
    console.log(`Unit set to ${unit}`);
  }

function getWeather() {
  const city = document.getElementById('cityInput').value.trim();

  if (!city) {
    alert('Please enter or select a city.');
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  // Show loading placeholder before the fetch completes
  showWeatherPlaceholder();

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      showWeatherResult(data);
    })
    .catch(error => {
      showWeatherError(error.message);
    });
}

function showWeatherPlaceholder() {
  const weatherResultContainer = document.getElementById('weatherResult');
  weatherResultContainer.innerHTML = `
    <p><strong>City:</strong> NA</p>
    <p><strong>Temperature:</strong> NA</p>
    <p><strong>Weather:</strong> NA</p>
    <p><strong>Humidity:</strong> NA</p>
    <p><strong>Wind Speed:</strong> NA</p>
  `;
}

function showWeatherResult(data) {
  const weatherResultContainer = document.getElementById('weatherResult');
  weatherResultContainer.innerHTML = `
    <p><strong>City:</strong> ${data.name}</p>
    <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
    <p><strong>Weather:</strong> ${data.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;
}

function showWeatherError(message) {
  const weatherResultContainer = document.getElementById('weatherResult');
  weatherResultContainer.innerHTML = `<p style="color: red;">${message}</p>`;
}

function initializeCityList() {
  const cityList = document.getElementById('cityList');

  cities.forEach(city => {
    const cityOption = document.createElement('div');
    cityOption.textContent = city;
    cityOption.onclick = () => setCity(city);
    cityList.appendChild(cityOption);
  });
}

function toggleCityList() {
  const cityList = document.getElementById('cityList');
  cityList.style.display = cityList.style.display === 'block' ? 'none' : 'block';
}

function setCity(cityName) {
  document.getElementById('cityInput').value = cityName;
  toggleCityList();
}

document.getElementById('cityInput').addEventListener('input', filterCityList);

function filterCityList() {
  const input = document.getElementById('cityInput').value.toLowerCase();
  const cityList = document.getElementById('cityList');

  cityList.innerHTML = '';

  cities.forEach(city => {
    if (city.toLowerCase().includes(input)) {
      const cityOption = document.createElement('div');
      cityOption.textContent = city;
      cityOption.onclick = () => setCity(city);
      cityList.appendChild(cityOption);
    }
  });

  cityList.style.display = cityList.children.length > 0 ? 'block' : 'none';
}

initializeCityList();