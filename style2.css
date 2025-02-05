const apiKey = 'efd6a5311922d90c0b589dcea7f1663e';
const cities = ["Tbilisi", "London", "New York", "Paris", "Tokyo", "Berlin", "Moscow", "Beijing"];

let unit = localStorage.getItem('unit') || 'metric';


function setUnit(selectedUnit) {
    unit = selectedUnit;

    localStorage.setItem('unit', selectedUnit);

    // Update the active button style
    const buttons = document.querySelectorAll('.unit-button');
    buttons.forEach(button => {
        if (button.dataset.unit === selectedUnit) {
            // Highlight the selected unit button
            button.classList.add('active');
        } else {
            // Remove active class from the other buttons
            button.classList.remove('active');
        }
    });

    // Change background image based on the unit selected
    changeBackgroundImage(selectedUnit);

    console.log(`Unit set to ${selectedUnit}`);
}

function changeBackgroundImage(unit) {
    const body = document.body;
    if (unit === 'metric') {
        body.style.backgroundImage = "url('images/celsius-background.jpg')";
    } else if (unit === 'imperial') {
        body.style.backgroundImage = "url('images/fahrenheit-background.jpg')";
    } else if (unit === 'standard') {
        body.style.backgroundImage = "url('images/kelvin-background.jpg')";
    }
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
  
    let temp, windSpeed;
  
    // Handle the temperature based on the selected unit
    if (unit === 'metric') {
      temp = `${data.main.temp} °C`;  // Celsius for metric
      windSpeed = `${data.wind.speed} m/s`;  // m/s for metric
    } else if (unit === 'imperial') {
      // Convert temperature from Celsius to Fahrenheit
      temp = `${(data.main.temp * 9/5) + 32} °F`;
      // Convert wind speed from m/s to mph
      windSpeed = `${data.wind.speed * 2.23694} mph`;  // m/s to mph
    } else if (unit === 'standard') {
      temp = `${data.main.temp} K`;  // Kelvin for standard
      windSpeed = `${data.wind.speed} m/s`;  // m/s for standard
    }
  
    // Display the weather data
    weatherResultContainer.innerHTML = `
      <p><strong>City:</strong> ${data.name}</p>
      <p><strong>Temperature:</strong> ${temp}</p>
      <p><strong>Weather:</strong> ${data.weather[0].description}</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${windSpeed}</p>
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
function toggleUnitDropdown() {
    const unitDropdown = document.getElementById('unitDropdown');
    unitDropdown.classList.toggle('visible');
}
document.querySelectorAll('.unit-button').forEach(button => {
    button.addEventListener('click', function () {
        const selectedUnit = this.dataset.unit;
        setUnit(selectedUnit);
    });
});

initializeCityList();
