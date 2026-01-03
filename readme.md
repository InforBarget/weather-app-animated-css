# 🌤️ Weather App - Animated CSS

> Une application météo moderne avec animations CSS avancées et effets glassmorphism

[![Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://votre-demo.github.io)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![YouTube](https://img.shields.io/badge/YouTube-Tutorial-red)](https://youtube.com/votre-video)

## ✨ Fonctionnalités

- 🌡️ Météo en temps réel via OpenWeatherMap API
- 🎨 Animations CSS avancées (pluie, neige, nuages, étoiles)
- 💎 Effet glassmorphism moderne
- 📍 Géolocalisation automatique
- 📊 Prévisions sur 5 jours
- 📱 Design 100% responsive
- 🎭 Thèmes dynamiques selon la météo
- ⚡ Vanilla JavaScript (aucune dépendance)

## 🎥 Tutoriel Vidéo

[![Tutoriel YouTube](thumbnail.jpg)](https://youtu.be/d34krm-7KhA)

**Regardez le tutoriel complet sur YouTube** : [Application Météo avec Animations CSS]([[https://youtube.com/votre-video](https://youtu.be/d34krm-7KhA)])

## 🛠️ Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Animations, Grid, Flexbox, Glassmorphism
- **JavaScript ES6+** - Logique et API
- **OpenWeatherMap API** - Données météo
- **Font Awesome** - Icônes

## 📦 Installation

### Prérequis

- Un navigateur web moderne
- Une clé API OpenWeatherMap (gratuite)

### Étapes

1. **Cloner le repository**
```bash
git clone [https://github.com/votre-username/weather-app-animated-css.git](https://github.com/InforBarget/weather-app-animated-css.git )
cd weather-app-animated-css
```

2. **Obtenir une clé API**
   - Créez un compte sur [OpenWeatherMap](https://openweathermap.org/)
   - Générez votre clé API gratuite
   - Copiez votre clé

3. **Configuration**
   - Ouvrez `script.js`
   - Remplacez `'VOTRE_CLE_API'` par votre vraie clé API :
```javascript
   const API_KEY = 'votre_cle_api_ici';
```

4. **Lancer l'application**
   - Ouvrez `index.html` dans votre navigateur
   - Ou utilisez un serveur local :
```bash
   # Avec Python
   python -m http.server 8000
   
   # Avec Node.js
   npx serve
   
   # Avec VS Code
   # Extension "Live Server"
```

## 📂 Structure du Projet
```
weather-app-animated-css/
│
├── index.html          # Structure HTML
├── styles.css          # Styles et animations CSS
├── script.js           # Logique JavaScript
├── README.md           # Documentation
├── LICENSE             # Licence MIT

```

## 🎨 Fonctionnalités CSS

### Animations Implémentées

- **Pluie** : Particules animées avec chute réaliste
- **Neige** : Flocons avec mouvement de balancement
- **Nuages** : Animation de défilement fluide
- **Étoiles** : Scintillement nocturne
- **Glassmorphism** : Arrière-plans flous et translucides
- **Transitions** : Changements de thème smooth

### Thèmes Disponibles

- ☀️ Ensoleillé (gradient bleu clair)
- 🌧️ Pluvieux (gradient bleu foncé)
- ❄️ Neigeux (gradient gris clair)
- ☁️ Nuageux (gradient gris)
- 🌙 Nocturne (gradient bleu marine)
- ⛈️ Orageux (gradient gris sombre)

## 🔧 Personnalisation

### Modifier les Couleurs

Dans `styles.css`, ajustez les variables CSS :
```css
:root {
    --primary-color: #4FACFE;
    --secondary-color: #00F2FE;
    /* ... autres variables */
}
```

### Ajouter des Animations

Créez vos propres `@keyframes` dans `styles.css` :
```css
@keyframes monAnimation {
    0% { /* état initial */ }
    100% { /* état final */ }
}
```

### Changer la Ville par Défaut

Dans `script.js`, modifiez la ligne :
```javascript
getWeatherByCity('Paris'); // Remplacez par votre ville
```

## 🌐 API OpenWeatherMap

### Endpoints Utilisés

- **Current Weather** : `/weather`
- **5 Day Forecast** : `/forecast`

### Limites (Plan Gratuit)

- 60 appels/minute
- 1 000 000 appels/mois
- Données mises à jour toutes les 10 minutes

### Documentation

📚 [Documentation officielle OpenWeatherMap](https://openweathermap.org/api)

## 🤝 Contribution

Les contributions sont les bienvenues ! 

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/amelioration`)
3. Committez vos changements (`git commit -m 'Ajout fonctionnalité'`)
4. Pushez vers la branche (`git push origin feature/amelioration`)
5. Ouvrez une Pull Request

## 📝 TODO / Améliorations Futures

- [ ] Sauvegarder les villes favorites (localStorage)
- [ ] Ajouter graphiques Chart.js
- [ ] Mode sombre/clair manuel
- [ ] Support multi-langues
- [ ] PWA (Progressive Web App)
- [ ] Notifications météo
- [ ] Partage sur réseaux sociaux
- [ ] Historique des recherches

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👨‍💻 Auteur

**Anthony - Infor'Barget**

- 🌐 Site web : [inforbarget.com](https://inforbarget.com)
- 📺 YouTube : [Infor'Barget](https://youtube.com/@inforbarget)
- 📧 Email : admin@inforbarget.com

## 🙏 Remerciements

- OpenWeatherMap pour l'API gratuite
- Font Awesome pour les icônes
- La communauté dev pour l'inspiration

## ⭐ Support

Si ce projet vous a aidé, n'hésitez pas à :
- ⭐ Mettre une étoile au repository
- 🐛 Signaler des bugs via les Issues
- 💡 Proposer des améliorations
- 📺 S'abonner à la chaîne YouTube
- 🔗 Partager le projet

---

**Fait avec ❤️ par Infor'Barget - Formation & Développement Web**

#JavaScript #CSS #HTML #WeatherApp #Tutorial #WebDevelopment
