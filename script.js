document.getElementById('location-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let location = document.getElementById('location-input').value.trim();

    if (location.length === 0) {
        alert('Please enter a location.');
        return;
    }

    let apiKey = 'your_api_key'; // Replace with your OpenWeatherMap API key
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            const weather = {
                description: data.weather[0].description,
                temperature: data.main.temp,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed
            };

            document.getElementById('weather-data').innerHTML = `
                <h2>Current Weather in ${location}</h2>
                <p><strong>Description:</strong> ${weather.description}</p>
                <p><strong>Temperature:</strong> ${weather.temperature}°C</p>
                <p><strong>Humidity:</strong> ${weather.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${weather.windSpeed} m/s</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-data').innerHTML = '<p>Weather data not available. Please try again later.</p>';
        });
});
