const apiKey = '8e8953357b1ac19611e370c5e6565729'; // Your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById('city').value;
    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        
        console.log(data); // Debugging line to check the API response

        if (data.cod === '404') {
            alert('City not found');
            return;
        } else if (data.cod !== 200) {
            alert(`Error: ${data.message}`);
            return;
        }

        displayWeather(data);
    } catch (error) {
        alert('An error occurred: ' + error.message);
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.style.display = 'block';
    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}
