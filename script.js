function getCity() {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value;
  
    if (!cityName) {
      alert('Please enter a city name.');
      return;
    }
  
    const apiKey = 'ebe9823a5ee7c13ad05879fa1b4bddce';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found.');
        }
        return response.json();
      })
      .then(data => {
        displayWeather(data); // Corrected function name
      })
      .catch(error => {
        alert(error.message);
      });
  }
  
  function displayWeather(data) { // Corrected function name
    const weatherInfoDiv = document.getElementById('weatherInfo');
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15); // Kelvin to Celsius
    const humidity = `${data.main.humidity}%`;
    const description = data.weather[0].description;
  
    const weatherText = `Weather in ${cityName}: ${temperature}°C, ${description}`;
    weatherInfoDiv.textContent = weatherText;
  
    const imageURL = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    const iconImage = document.createElement('img');
    iconImage.src = imageURL;
    iconImage.alt = description;
    weatherInfoDiv.appendChild(iconImage);
  
    const infoList = document.createElement('ul');
    infoList.classList.add('info-list');
  
    const humidityItem = document.createElement('li');
    humidityItem.innerText = "Humidity: ";
    humidityItem.appendChild(document.createTextNode(humidity));
    infoList.appendChild(humidityItem);
  
    weatherInfoDiv.appendChild(infoList);
  }
  