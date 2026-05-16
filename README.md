# 📚 Smart Study Dashboard

Un dashboard interactif pour aider les étudiants à gérer leurs cours, tâches et motivation. Projet universitaire créé avec **HTML, CSS et JavaScript vanilla** (sans framework).

---

## 🎯 Fonctionnalités

### 📊 Dashboard Principal
- Vue d'ensemble avec statistiques en temps réel
- Progression globale des études
- Vue d'ensemble rapide des cours

### 📖 Gestion des Cours
- ✅ Créer de nouveaux cours avec une couleur personnalisée
- 🎨 Couleur unique par cours pour une meilleure organisation
- 📊 Voir la progression de chaque cours
- 🗑️ Supprimer un cours (et ses tâches)

### ✓ Todo List par Cours
- 📝 Ajouter des tâches pour chaque cours
- ✔️ Marquer les tâches comme complétées
- 📅 Ajouter une date limite (optionnel)
- 🔍 Filtrer les tâches (Toutes / En attente / Complétées)
- 🗑️ Supprimer une tâche

### 🎯 Progression Automatique
- 📈 Barre de progression par cours
- 📊 Pourcentage de progression
- 🔄 Mise à jour en temps réel

### ⭐ Motivation
- 💡 Citation motivationnelle aléatoire (API externe)
- 🔄 Bouton pour charger une nouvelle citation
- 💪 Conseils d'étude pratiques

### 💾 Stockage Persistant
- 💾 Sauvegarde automatique via localStorage
- 🔄 Restauration des données au rechargement
- ⚡ Aucun serveur nécessaire

### 🌓 Mode Sombre/Clair
- 🌙 Basculer facilement entre les thèmes
- 💾 Préférence sauvegardée

### 📱 Responsive Design
- 💻 Design optimisé pour desktop
- 📱 Entièrement responsive sur mobile/tablette
- ⚡ Sidebar collapsible sur mobile

---

## 🛠️ Technologies Utilisées

| Technologie | Description |
|-------------|-------------|
| **HTML5** | Structure sémantique |
| **CSS3** | Design moderne avec variables CSS, flexbox, grid |
| **JavaScript Vanilla** | Logique sans dépendances externes |
| **localStorage** | Persistance des données |
| **Fetch API** | Récupération de citations (API quotable.io) |
| **Google Fonts** | Typographie (Poppins, Inter) |

---

## 📁 Structure du Projet

```
Smart-Study-Dashboard/
├── index.html          # Structure HTML complète
├── style.css           # Tous les styles (responsive)
├── script.js           # Logique JavaScript complète
└── README.md           # Documentation (ce fichier)
```

### Fichier HTML (index.html)
- Sidebar avec navigation
- Sections principales : Dashboard, Cours, Tâches, Motivation
- Modals pour ajouter cours/tâches
- Responsive avec viewport meta

### Fichier CSS (style.css)
- Variables CSS pour les couleurs et espacements
- 1000+ lignes de styles
- Mode sombre intégré
- Animations et transitions fluides
- Media queries pour mobile/tablette

### Fichier JavaScript (script.js)
- 500+ lignes de code commenté
- Gestion complète de l'interface
- Manipulation DOM
- localStorage
- Fetch API
- Logique métier

---

## 🚀 Comment Lancer le Projet

### Méthode 1 : Simple (Recommandée)
1. Téléchargez les 3 fichiers dans le même dossier
2. Double-cliquez sur `index.html` pour ouvrir dans le navigateur
3. ✅ L'application est prête à utiliser !

### Méthode 2 : Avec un serveur local (Plus sûr)
```bash
# Si vous avez Python
cd Smart-Study-Dashboard
python -m http.server 8000

# Ou avec Node.js
npx serve
```

Puis ouvrez `http://localhost:8000` dans votre navigateur.

---

## 📚 Concepts JavaScript Expliqués

### 1. **Manipulation du DOM**
La manipulation du DOM permet de modifier dynamiquement le HTML avec JavaScript.

```javascript
// Récupérer un élément
const element = document.getElementById('myId');

// Modifier le contenu
element.textContent = 'Nouveau contenu';

// Ajouter une classe
element.classList.add('active');

// Créer et insérer des éléments
const newElement = document.createElement('div');
container.appendChild(newElement);
```

**Dans le projet:**
- `renderCourses()` : génère dynamiquement les cartes de cours
- `renderTasks()` : affiche les tâches filtrées
- `updateUI()` : met à jour l'interface complète

---

### 2. **localStorage : Persistance des Données**
localStorage permet de sauvegarder des données dans le navigateur.

```javascript
// Sauvegarder des données
const data = { name: 'Math', color: '#6366f1' };
localStorage.setItem('courses', JSON.stringify(data));

// Récupérer des données
const saved = localStorage.getItem('courses');
const parsed = JSON.parse(saved);

// Supprimer des données
localStorage.removeItem('courses');
```

**Dans le projet:**
- `saveCourses()` : sauvegarde les cours
- `saveTasks()` : sauvegarde les tâches
- `loadDataFromStorage()` : charge les données au démarrage
- Données restaurées automatiquement à chaque rafraîchissement

---

### 3. **Fetch API : Appels AJAX**
Fetch permet de faire des requêtes HTTP pour récupérer des données externes.

```javascript
// Appel simple
fetch('https://api.example.com/data')
  .then(response => response.json())  // Convertir en JSON
  .then(data => console.log(data))     // Utiliser les données
  .catch(error => console.error(error)); // Gérer les erreurs

// Avec async/await (plus lisible)
async function getData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur:', error);
  }
}
```

**Dans le projet:**
- `loadMotivationalQuote()` : récupère une citation via l'API quotable.io
- Gestion d'erreur avec try/catch
- Citation par défaut en cas d'erreur

---

### 4. **Event Listeners : Interactivité**
Les event listeners permettent de réagir aux actions de l'utilisateur.

```javascript
// Ajouter un listener
button.addEventListener('click', () => {
  console.log('Bouton cliqué');
});

// Types d'événements courants
element.addEventListener('click', handler);      // Au clic
element.addEventListener('change', handler);     // Au changement
element.addEventListener('keydown', handler);    // Quand une touche est enfoncée
element.addEventListener('submit', handler);     // À la soumission d'un formulaire
```

**Dans le projet:**
- Navigation : `switchSection()` sur click
- Modals : fermeture avec Escape ou click externe
- Filtres : `filterTasks()` sur change
- Très d'événements pour une interface interactive

---

### 5. **Objets et Arrays : Structures de Données**
Pour organiser et manipuler les données.

```javascript
// Array de cours
const courses = [
  { id: 1, name: 'Math', color: '#6366f1' },
  { id: 2, name: 'Français', color: '#8b5cf6' }
];

// Ajouter un élément
courses.push({ id: 3, name: 'English', color: '#ec4899' });

// Filtrer
const math = courses.filter(c => c.name === 'Math');

// Mapper (transformer)
const names = courses.map(c => c.name);

// Trouver
const course = courses.find(c => c.id === 1);
```

**Dans le projet:**
- `courses` : array global avec tous les cours
- `tasks` : array global avec toutes les tâches
- Utilisation de `filter()`, `map()`, `find()` constamment

---

### 6. **Conditions et Boucles**
Logique de contrôle pour les décisions.

```javascript
// Conditions
if (tasks.length === 0) {
  console.log('Aucune tâche');
} else if (tasks.length < 5) {
  console.log('Peu de tâches');
} else {
  console.log('Beaucoup de tâches');
}

// Boucles
for (let i = 0; i < tasks.length; i++) {
  console.log(tasks[i]);
}

// Boucles modernes
tasks.forEach(task => console.log(task.title));

// Opérateur ternaire
const status = task.completed ? '✓ Complétée' : '⏳ En attente';
```

**Dans le projet:**
- Conditions pour afficher/masquer des éléments
- Boucles pour générer les cartes de cours
- Ternaire pour formater les dates

---

### 7. **Fonctions : Réutilisabilité du Code**
Les fonctions permettent de réutiliser du code.

```javascript
// Fonction simple
function greet(name) {
  return `Bonjour ${name}`;
}

// Fonction avec plusieurs paramètres
function addCourse(name, color) {
  // ...
}

// Fonction anonyme (callback)
button.addEventListener('click', () => {
  console.log('Cliqué');
});

// Fonction asynchrone
async function loadData() {
  const data = await fetch('/data');
  return data;
}
```

**Dans le projet:**
- 20+ fonctions bien organisées
- Chaque fonction a une responsabilité unique
- Commentaires pour expliquer chaque fonction
- Utilisation de fonctions anonymes pour les callbacks

---

## 💡 Exemple d'Utilisation Complète

### Ajouter un cours
1. Cliquez sur "➕ Ajouter un cours"
2. Entrez "Mathématiques"
3. Sélectionnez la couleur 🎨
4. Cliquez "Créer le cours"
5. ✅ Cours créé et sauvegardé dans localStorage

### Ajouter une tâche
1. Cliquez sur "➕ Ajouter une tâche"
2. Sélectionnez le cours "Mathématiques"
3. Entrez "Exercices 1-5"
4. Sélectionnez une date limite
5. Cliquez "Ajouter la tâche"
6. ✅ Tâche ajoutée et visible dans "Tâches"

### Marquer une tâche comme complétée
1. Cochez la case à côté de la tâche
2. ✅ La tâche devient grisée et la progression augmente

### Changer le thème
1. Cliquez sur 🌙 (en bas de la sidebar)
2. ✅ Le thème passe en mode sombre
3. Cliquez sur ☀️ pour revenir en mode clair
4. 💾 Votre préférence est sauvegardée

---

## 🎨 Personnalisation

### Changer les couleurs principales
Dans `style.css`, modifiez les variables CSS :

```css
:root {
    --color-primary: #6366f1;        /* Violet indigo */
    --color-secondary: #8b5cf6;      /* Violet */
    --color-background: #f8fafc;     /* Blanc */
    --color-text: #1e293b;           /* Noir */
}
```

### Ajouter une API de citations personnalisée
Dans `script.js`, modifiez `loadMotivationalQuote()` :

```javascript
// Remplacez l'URL de l'API
const response = await fetch('https://api-citations.com/random');
```

### Ajouter des fonctionnalités
Exemples :
- 📋 Export PDF des tâches
- 🔔 Notifications de rappel
- 📊 Statistiques avancées
- 🎯 Objectifs à long terme

---

## ⚡ Performance & Optimisation

- ✅ Aucune dépendance externe (sauf API)
- ✅ Chargement très rapide
- ✅ Pas de serveur nécessaire
- ✅ localStorage limité (~5MB), mais suffisant pour les données
- ✅ Code minifiable pour production

---

## 🐛 Dépannage

### Les données ne sont pas sauvegardées
- Vérifiez que localStorage est activé dans votre navigateur
- Essayez en mode non-privé/non-incognito

### La citation ne charge pas
- Vérifiez votre connexion Internet
- L'API quotable.io peut être temporairement indisponible
- Une citation par défaut s'affichera en cas d'erreur

### Le responsive ne fonctionne pas
- Vérifiez que le viewport meta tag est présent en HTML
- Testez avec les outils développeur du navigateur (F12)

---

## 📖 Ressources d'Apprentissage

- **MDN Web Docs** : https://developer.mozilla.org/
- **JavaScript.info** : https://javascript.info/
- **Google Fonts** : https://fonts.google.com/
- **API Quotable** : https://quotable.io/

---

## 📝 Licence

Ce projet est un travail universitaire. Libre d'utilisation et de modification.

---

## 🙏 Remerciements

Projet créé comme exercice pédagogique pour apprendre :
- JavaScript Vanilla
- Manipulation du DOM
- localStorage
- Fetch API
- CSS Grid & Flexbox
- Design Responsive

---

## ✨ Bon apprentissage ! 📚

N'hésitez pas à explorer le code, le modifier et ajouter vos propres fonctionnalités.

**Prochaines étapes:**
- [ ] Ajouter une page d'authentification
- [ ] Intégrer une base de données (Firebase, Supabase)
- [ ] Créer une API backend
- [ ] Ajouter des tests automatisés
- [ ] Publier en ligne (Netlify, Vercel)