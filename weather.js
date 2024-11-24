const Weather_Current = class {
    constructor(apiKey, resultsBlockSelector) {
        this.apiKey = apiKey;
        this.currentWeatherLink = `https://api.openweathermap.org/data/2.5/weather?q={query}&appid=${apiKey}&units=metric&lang=pl`;
        this.iconLink = "https://openweathermap.org/img/wn/{iconName}@2x.png";
        this.resultsBlock = document.querySelector(resultsBlockSelector);
    }

    getCurrentWeather(query) {
        if (!query.trim()) {
            alert("Bląd : Wpisz miasto!");
            return;
        }

        this.resultsBlock.innerHTML = '';
        let url = this.currentWeatherLink.replace("{query}", query);
        let req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.addEventListener("load", () => {
            if (req.status !== 200) {
                alert("Bląd : Wpisz poprawne miasto!");
                return;
            }
            const currentWeather = JSON.parse(req.responseText);
            console.log(currentWeather);
            const weatherBlock = this.createWeatherBlock(currentWeather);
            this.resultsBlock.appendChild(weatherBlock);
        });
        req.send();
    }

    createWeatherBlock(weatherData) {
        const date = new Date(weatherData.dt * 1000);
        const dateTimeString = `${date.toLocaleDateString("pl-PL")} ${date.toLocaleTimeString("pl-PL")}`;
        const temperature = weatherData.main.temp;
        const feelsLikeTemperature = weatherData.main.feels_like;
        const iconName = weatherData.weather[0].icon;
        const description = weatherData.weather[0].description;

        let weatherBlock = document.createElement("div");
        weatherBlock.className = "block_pogody";

        weatherBlock.innerHTML = `
            <div class="weather_time">${dateTimeString}</div>
            <div class="weather_temp">${temperature} &deg;C</div>
            <div class="weather_temp_feel">Odczuwalna: ${feelsLikeTemperature} &deg;C</div>
            <img class="weather_icon" src="${this.iconLink.replace("{iconName}", iconName)}" />
            <div class="weather_description">${description}</div>
        `;
        return weatherBlock;
    }
};

const Weather_Forecast = class {
    constructor(apiKey, resultsBlockSelector) {
        this.apiKey = apiKey;
        this.forecastLink = `https://api.openweathermap.org/data/2.5/forecast?q={query}&appid=${apiKey}&units=metric&lang=pl`;
        this.iconLink = "https://openweathermap.org/img/wn/{iconName}@2x.png";
        this.resultsBlock = document.querySelector(resultsBlockSelector);
    }

    getForecast(query) {
        if (!query.trim()) {
            alert("Bląd : Wpisz miasto!");
            return;
        }

        this.resultsBlock.innerHTML = '';
        let url = this.forecastLink.replace("{query}", query);
        fetch(url).then(response => {
            if (!response.ok) {
                alert("Bląd : Wpisz poprawne miasto!");
            }
            return response.json();
        }).then(data => {
            console.log(data);
            const forecastBlocks = this.createForecastBlocks(data.list);
            forecastBlocks.forEach(block => this.resultsBlock.appendChild(block));
        });
    }

    createForecastBlocks(forecastData) {
        const blocks = [];
        forecastData.forEach(weather => {
            const date = new Date(weather.dt * 1000);
            const dateTimeString = `${date.toLocaleDateString("pl-PL")} ${date.toLocaleTimeString("pl-PL")}`;
            const temperature = weather.main.temp;
            const feelsLikeTemperature = weather.main.feels_like;
            const iconName = weather.weather[0].icon;
            const description = weather.weather[0].description;

            let weatherBlock = document.createElement("div");
            weatherBlock.className = "block_pogody";

            weatherBlock.innerHTML = `
                <div class="weather_time">${dateTimeString}</div>
                <div class="weather_temp">${temperature} &deg;C</div>
                <div class="weather_temp_feel">Odczuwalna: ${feelsLikeTemperature} &deg;C</div>
                <img class="weather_icon" src="${this.iconLink.replace("{iconName}", iconName)}" />
                <div class="weather_description">${description}</div>
            `;
            blocks.push(weatherBlock);
        });
        return blocks;
    }
};

const currentWeather = new Weather_Current("c74d5c3cd458bd0f60babbcf5d1363fc", "#results");
const forecastWeather = new Weather_Forecast("c74d5c3cd458bd0f60babbcf5d1363fc", "#results");

document.querySelector("#current_Button").addEventListener("click", function() {
    const query = document.querySelector("#Pole_Input").value;
    currentWeather.getCurrentWeather(query);
});

document.querySelector("#forecast_Button").addEventListener("click", function() {
    const query = document.querySelector("#Pole_Input").value;
    currentWeather.getCurrentWeather(query);
    forecastWeather.getForecast(query);
});
