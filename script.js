// ============================
// CONFIGURATION DE L'API
// ============================
const API_KEY = 'VOTRE_CLE_API'; // Remplacez par votre clé API gratuite OpenWeatherMap
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// ============================
// ÉLÉMENTS DU DOM
// ============================
const elements = {
    cityInput: document.getElementById('cityInput'),
    searchBtn: document.getElementById('searchBtn'),
    locationBtn: document.getElementById('locationBtn'),
    cityName: document.getElementById('cityName'),
    currentDate: document.getElementById('currentDate'),
    weatherIcon: document.getElementById('weatherIcon'),
    temperature: document.getElementById('temperature'),
    description: document.getElementById('description'),
    feelsLike: document.getElementById('feelsLike'),
    windSpeed: document.getElementById('windSpeed'),
    humidity: document.getElementById('humidity'),
    pressure: document.getElementById('pressure'),
    visibility: document.getElementById('visibility'),
    clouds: document.getElementById('clouds'),
    minMax: document.getElementById('minMax'),
    forecastGrid: document.getElementById('forecastGrid'),
    errorMessage: document.getElementById('errorMessage')
};

// ============================
// INITIALISATION
// ============================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Application météo démarrée');
    updateDate();
    
    // Charger Paris par défaut
    getWeatherByCity('Paris');
    
    // Event listeners
    elements.searchBtn.addEventListener('click', handleSearch);
    elements.locationBtn.addEventListener('click', handleGeolocation);
    elements.cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
});

// ============================
// MISE À JOUR DE LA DATE
// ============================
function updateDate() {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const today = new Date();
    elements.currentDate.textContent = today.toLocaleDateString('fr-FR', options);
}

// ============================
// GESTION DE LA RECHERCHE
// ============================
function handleSearch() {
    const city = elements.cityInput.value.trim();
    if (city) {
        console.log('Recherche de:', city);
        getWeatherByCity(city);
        elements.cityInput.value = '';
    } else {
        showError('Veuillez entrer un nom de ville');
    }
}

// ============================
// GÉOLOCALISATION
// ============================
function handleGeolocation() {
    if (!navigator.geolocation) {
        showError('La géolocalisation n\'est pas supportée par votre navigateur');
        return;
    }
    
    console.log('Demande de géolocalisation...');
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            console.log('Position obtenue:', lat, lon);
            getWeatherByCoordinates(lat, lon);
        },
        (error) => {
            console.error('Erreur de géolocalisation:', error);
            showError('Impossible d\'obtenir votre position');
        }
    );
}

// ============================
// RÉCUPÉRATION MÉTÉO PAR VILLE
// ============================
async function getWeatherByCity(city) {
    try {
        showLoading();
        console.log('Récupération météo pour:', city);
        
        // Météo actuelle
        const weatherUrl = `${API_BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=fr`;
        console.log('URL météo:', weatherUrl);
        
        const weatherResponse = await fetch(weatherUrl);
        
        if (!weatherResponse.ok) {
            if (weatherResponse.status === 404) {
                throw new Error('Ville non trouvée. Vérifiez l\'orthographe.');
            } else if (weatherResponse.status === 401) {
                throw new Error('Clé API invalide. Vérifiez votre configuration.');
            } else {
                throw new Error(`Erreur ${weatherResponse.status}: ${weatherResponse.statusText}`);
            }
        }
        
        const weatherData = await weatherResponse.json();
        console.log('Données météo reçues:', weatherData);
        
        // Prévisions 5 jours
        const forecastUrl = `${API_BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=fr`;
        const forecastResponse = await fetch(forecastUrl);
        
        if (!forecastResponse.ok) {
            throw new Error('Erreur lors de la récupération des prévisions');
        }
        
        const forecastData = await forecastResponse.json();
        console.log('Prévisions reçues:', forecastData);
        
        // Affichage
        displayWeather(weatherData);
        displayForecast(forecastData);
        updateTheme(weatherData.weather[0].main, weatherData.weather[0].id);
        hideError();
        
    } catch (error) {
        console.error('Erreur:', error);
        showError(error.message);
    }
}

// ============================
// RÉCUPÉRATION MÉTÉO PAR COORDONNÉES
// ============================
async function getWeatherByCoordinates(lat, lon) {
    try {
        showLoading();
        console.log('Récupération météo pour coordonnées:', lat, lon);
        
        // Météo actuelle
        const weatherUrl = `${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`;
        const weatherResponse = await fetch(weatherUrl);
        
        if (!weatherResponse.ok) {
            throw new Error('Erreur lors de la récupération des données météo');
        }
        
        const weatherData = await weatherResponse.json();
        
        // Prévisions
        const forecastUrl = `${API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`;
        const forecastResponse = await fetch(forecastUrl);
        
        if (!forecastResponse.ok) {
            throw new Error('Erreur lors de la récupération des prévisions');
        }
        
        const forecastData = await forecastResponse.json();
        
        // Affichage
        displayWeather(weatherData);
        displayForecast(forecastData);
        updateTheme(weatherData.weather[0].main, weatherData.weather[0].id);
        hideError();
        
    } catch (error) {
        console.error('Erreur:', error);
        showError(error.message);
    }
}

// ============================
// AFFICHAGE MÉTÉO ACTUELLE
// ============================
function displayWeather(data) {
    console.log('Affichage des données météo');
    
    elements.cityName.textContent = `${data.name}, ${data.sys.country}`;
    elements.temperature.textContent = `${Math.round(data.main.temp)}°`;
    elements.description.textContent = data.weather[0].description;
    elements.feelsLike.textContent = `Ressenti : ${Math.round(data.main.feels_like)}°`;
    elements.windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    elements.humidity.textContent = `${data.main.humidity}%`;
    elements.pressure.textContent = `${data.main.pressure} hPa`;
    elements.visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    elements.clouds.textContent = `${data.clouds.all}%`;
    elements.minMax.textContent = `${Math.round(data.main.temp_min)}° / ${Math.round(data.main.temp_max)}°`;
    
    updateWeatherIcon(data.weather[0].id);
}

// ============================
// AFFICHAGE DES PRÉVISIONS
// ============================
function displayForecast(data) {
    console.log('Affichage des prévisions');
    
    elements.forecastGrid.innerHTML = '';
    
    // Grouper les prévisions par jour
    const dailyData = {};
    
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toLocaleDateString('fr-FR');
        
        if (!dailyData[dateKey]) {
            dailyData[dateKey] = {
                temps: [],
                temps_max: -Infinity,
                temps_min: Infinity,
                weather: item.weather[0],
                date: date
            };
        }
        
        dailyData[dateKey].temps.push(item.main.temp);
        dailyData[dateKey].temps_max = Math.max(dailyData[dateKey].temps_max, item.main.temp_max);
        dailyData[dateKey].temps_min = Math.min(dailyData[dateKey].temps_min, item.main.temp_min);
    });
    
    // Afficher les 5 premiers jours
    const days = Object.values(dailyData).slice(0, 5);
    
    days.forEach((day, index) => {
        const dayName = index === 0 ? "Aujourd'hui" : day.date.toLocaleDateString('fr-FR', { weekday: 'short' });
        
        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        forecastCard.innerHTML = `
            <div class="forecast-day">${dayName}</div>
            <i class="forecast-icon fas ${getWeatherIconClass(day.weather.id)}"></i>
            <div class="forecast-temp-range">
                <span class="forecast-temp-max">${Math.round(day.temps_max)}°</span>
                /
                <span class="forecast-temp-min">${Math.round(day.temps_min)}°</span>
            </div>
            <div class="detail-label">${day.weather.description}</div>
        `;
        
        elements.forecastGrid.appendChild(forecastCard);
    });
}

// ============================
// MISE À JOUR ICÔNE MÉTÉO
// ============================
function updateWeatherIcon(weatherId) {
    const iconClass = getWeatherIconClass(weatherId);
    elements.weatherIcon.className = `weather-icon fas ${iconClass}`;
}

// ============================
// CLASSE D'ICÔNE SELON ID
// ============================
function getWeatherIconClass(weatherId) {
    // Orage (200-232)
    if (weatherId >= 200 && weatherId < 300) return 'fa-bolt';
    // Bruine (300-321)
    if (weatherId >= 300 && weatherId < 400) return 'fa-cloud-rain';
    // Pluie (500-531)
    if (weatherId >= 500 && weatherId < 600) {
        return weatherId >= 502 ? 'fa-cloud-showers-heavy' : 'fa-cloud-rain';
    }
    // Neige (600-622)
    if (weatherId >= 600 && weatherId < 700) return 'fa-snowflake';
    // Atmosphère (701-781)
    if (weatherId >= 700 && weatherId < 800) return 'fa-smog';
    // Ciel dégagé (800)
    if (weatherId === 800) return 'fa-sun';
    // Nuageux (801-804)
    if (weatherId > 800) {
        return weatherId === 801 ? 'fa-cloud-sun' : 'fa-cloud';
    }
    
    return 'fa-cloud';
}

// ============================
// MISE À JOUR DU THÈME
// ============================
function updateTheme(weatherMain, weatherId) {
    console.log('Mise à jour du thème:', weatherMain);
    
    const body = document.body;
    body.className = '';
    
    clearBackgroundElements();
    
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour > 20;
    
    if (isNight) {
        body.classList.add('night');
        createStars();
    } else if (weatherMain === 'Thunderstorm') {
        body.classList.add('thunderstorm');
        createRainParticles();
    } else if (weatherMain === 'Rain' || weatherMain === 'Drizzle') {
        body.classList.add('rainy');
        createRainParticles();
    } else if (weatherMain === 'Snow') {
        body.classList.add('snowy');
        createSnowParticles();
    } else if (weatherMain === 'Clouds') {
        body.classList.add('cloudy');
        createClouds();
    }
}

// ============================
// NETTOYAGE ÉLÉMENTS DE FOND
// ============================
function clearBackgroundElements() {
    document.querySelector('.clouds-container').innerHTML = '';
    document.querySelector('.particles-container').innerHTML = '';
    document.querySelector('.stars-container').innerHTML = '';
}

// ============================
// CRÉATION DES NUAGES
// ============================
function createClouds() {
    const container = document.querySelector('.clouds-container');
    
    for (let i = 0; i < 5; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.width = `${100 + Math.random() * 100}px`;
        cloud.style.height = `${40 + Math.random() * 40}px`;
        cloud.style.top = `${Math.random() * 60}%`;
        cloud.style.left = `-200px`;
        cloud.style.animationDuration = `${20 + Math.random() * 20}s`;
        cloud.style.animationDelay = `${Math.random() * 10}s`;
        
        container.appendChild(cloud);
    }
}

// ============================
// CRÉATION PARTICULES PLUIE
// ============================
function createRainParticles() {
    const container = document.querySelector('.particles-container');
    
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `-${Math.random() * 100}px`;
        particle.style.animationDuration = `${0.5 + Math.random() * 0.5}s`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        
        container.appendChild(particle);
    }
}

// ============================
// CRÉATION FLOCONS NEIGE
// ============================
function createSnowParticles() {
    const container = document.querySelector('.particles-container');
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `-${Math.random() * 100}px`;
        particle.style.animationDuration = `${3 + Math.random() * 4}s`;
        particle.style.animationDelay = `${Math.random() * 3}s`;
        
        container.appendChild(particle);
    }
}

// ============================
// CRÉATION DES ÉTOILES
// ============================
function createStars() {
    const container = document.querySelector('.stars-container');
    
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${1 + Math.random() * 2}s`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        
        container.appendChild(star);
    }
}

// ============================
// AFFICHAGE DU CHARGEMENT
// ============================
function showLoading() {
    elements.temperature.textContent = '--°';
    elements.description.textContent = 'Chargement...';
    elements.cityName.textContent = 'Chargement...';
}

// ============================
// GESTION DES ERREURS
// ============================
function showError(message) {
    console.error('Affichage erreur:', message);
    elements.errorMessage.textContent = message;
    elements.errorMessage.classList.add('show');
    
    setTimeout(() => {
        hideError();
    }, 5000);
}

function hideError() {
    elements.errorMessage.classList.remove('show');
}
