/* ========================================
   SMART STUDY DASHBOARD - JAVASCRIPT
   ======================================== */

// ========== CONFIGURATION ==========

// Clés pour le localStorage
const STORAGE_KEYS = {
    COURSES: 'smartStudy_courses',
    TASKS: 'smartStudy_tasks',
    THEME: 'smartStudy_theme'
};

// ========== VARIABLES GLOBALES ==========

let courses = []; // Stockage des cours
let tasks = [];   // Stockage des tâches
let currentFilter = 'all'; // Filtre actuel des tâches
let currentCourseFilter = ''; // Filtre par cours

// ========== INITIALISATION ==========

document.addEventListener('DOMContentLoaded', () => {
    // Charger les données du localStorage
    loadDataFromStorage();
    
    // Initialiser le thème
    initializeTheme();
    
    // Configurer les event listeners
    setupEventListeners();
    
    // Rendre l'interface
    renderDashboard();
    loadMotivationalQuote();
});

// ========== CHARGEMENT DES DONNÉES ==========

/**
 * Charge les cours et tâches du localStorage
 */
function loadDataFromStorage() {
    const storedCourses = localStorage.getItem(STORAGE_KEYS.COURSES);
    const storedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
    
    if (storedCourses) {
        courses = JSON.parse(storedCourses);
    }
    
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

/**
 * Sauvegarde les cours dans le localStorage
 */
function saveCourses() {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
    updateUI();
}

/**
 * Sauvegarde les tâches dans le localStorage
 */
function saveTasks() {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    updateUI();
}

// ========== GESTION DU THÈME ==========

/**
 * Initialise le thème (mode clair/sombre)
 */
function initializeTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeToggleIcon();
    }
}

/**
 * Bascule entre le mode clair et sombre
 */
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem(STORAGE_KEYS.THEME, isDarkMode ? 'dark' : 'light');
    
    updateThemeToggleIcon();
}

/**
 * Met à jour l'icône du bouton de thème
 */
function updateThemeToggleIcon() {
    const themeToggle = document.getElementById('themeToggle');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
}

// ========== GESTION DE LA NAVIGATION ==========

/**
 * Bascule entre les sections
 */
function switchSection(sectionId) {
    // Masquer toutes les sections
    document.querySelectorAll('.main-content > .section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Afficher la section sélectionnée
    document.getElementById(`${sectionId}-section`).classList.add('active');
    
    // Mettre à jour le titre
    const titles = {
        'dashboard': 'Dashboard',
        'courses': 'Mes Cours',
        'tasks': 'Tâches',
        'motivation': 'Motivation'
    };
    
    document.getElementById('page-title').textContent = titles[sectionId] || 'Dashboard';
    
    // Mettre à jour la navigation active
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
    
    // Fermer le sidebar mobile si ouvert
    document.querySelector('.sidebar').classList.remove('active');
}

// ========== GESTION DES COURS ==========

/**
 * Ajoute un nouveau cours
 */
function addCourse(name, color) {
    if (!name.trim()) {
        alert('Veuillez entrer un nom de cours');
        return;
    }
    
    const newCourse = {
        id: Date.now(), // Utilise le timestamp comme ID unique
        name: name,
        color: color,
        createdAt: new Date().toISOString()
    };
    
    courses.push(newCourse);
    saveCourses();
    closeModal('addCourseModal');
}

/**
 * Supprime un cours et ses tâches associées
 */
function deleteCourse(courseId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce cours ? Toutes ses tâches seront supprimées.')) {
        // Supprimer le cours
        courses = courses.filter(course => course.id !== courseId);
        
        // Supprimer les tâches associées
        tasks = tasks.filter(task => task.courseId !== courseId);
        
        saveCourses();
        saveTasks();
    }
}

/**
 * Obtient un cours par son ID
 */
function getCourseById(courseId) {
    return courses.find(course => course.id === courseId);
}

/**
 * Calcule le pourcentage de progression d'un cours
 */
function getCoursProgress(courseId) {
    const courseTasks = tasks.filter(task => task.courseId === courseId);
    
    if (courseTasks.length === 0) return 0;
    
    const completedTasks = courseTasks.filter(task => task.completed).length;
    return Math.round((completedTasks / courseTasks.length) * 100);
}

// ========== GESTION DES TÂCHES ==========

/**
 * Ajoute une nouvelle tâche
 */
function addTask(courseId, title, deadline) {
    if (!courseId) {
        alert('Veuillez sélectionner un cours');
        return;
    }
    
    if (!title.trim()) {
        alert('Veuillez entrer un titre pour la tâche');
        return;
    }
    
    const newTask = {
        id: Date.now(),
        courseId: courseId,
        title: title,
        completed: false,
        deadline: deadline || null,
        createdAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    saveTasks();
    closeModal('addTaskModal');
}

/**
 * Bascule l'état de complétude d'une tâche
 */
function toggleTaskCompletion(taskId) {
    const task = tasks.find(t => t.id === taskId);
    
    if (task) {
        task.completed = !task.completed;
        saveTasks();
    }
}

/**
 * Supprime une tâche
 */
function deleteTask(taskId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
    }
}

/**
 * Filtre les tâches selon le statut
 */
function filterTasks(filter) {
    currentFilter = filter;
    
    // Mettre à jour les boutons de filtre
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    
    renderTasks();
}

/**
 * Filtre les tâches par cours
 */
function filterTasksByCourse(courseId) {
    currentCourseFilter = courseId;
    renderTasks();
}

/**
 * Obtient les tâches filtrées
 */
function getFilteredTasks() {
    let filtered = tasks;
    
    // Filtre par cours
    if (currentCourseFilter) {
        filtered = filtered.filter(task => task.courseId === parseInt(currentCourseFilter));
    }
    
    // Filtre par statut
    if (currentFilter === 'pending') {
        filtered = filtered.filter(task => !task.completed);
    } else if (currentFilter === 'done') {
        filtered = filtered.filter(task => task.completed);
    }
    
    return filtered;
}

// ========== AFFICHAGE (RENDERING) ==========

/**
 * Met à jour l'interface complète
 */
function updateUI() {
    renderDashboard();
    renderCourses();
    renderTasks();
    updateStatistics();
}

/**
 * Affiche le dashboard avec les statistiques
 */
function renderDashboard() {
    updateStatistics();
    renderCoursesOverview();
}

/**
 * Met à jour les statistiques
 */
function updateStatistics() {
    // Total de cours
    document.getElementById('totalCourses').textContent = courses.length;
    
    // Tâches complétées
    const completedCount = tasks.filter(task => task.completed).length;
    document.getElementById('completedTasks').textContent = completedCount;
    
    // Tâches en attente
    const pendingCount = tasks.filter(task => !task.completed).length;
    document.getElementById('pendingTasks').textContent = pendingCount;
    
    // Progression globale
    const totalTasks = tasks.length;
    const globalProgress = totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);
    document.getElementById('totalProgress').textContent = globalProgress + '%';
}

/**
 * Affiche la vue d'ensemble des cours
 */
function renderCoursesOverview() {
    const container = document.getElementById('coursesOverviewContainer');
    
    if (courses.length === 0) {
        container.innerHTML = '<p class="empty-state">Aucun cours pour le moment. Créez-en un dans "Mes Cours" ! 📖</p>';
        return;
    }
    
    container.innerHTML = courses.map(course => {
        const progress = getCoursProgress(course.id);
        const courseTasks = tasks.filter(task => task.courseId === course.id);
        const completedTasks = courseTasks.filter(task => task.completed).length;
        
        return `
            <div class="course-overview-item">
                <div class="course-color-bar" style="background-color: ${course.color};"></div>
                <div class="course-overview-info">
                    <div class="course-overview-name">${course.name}</div>
                    <div class="course-progress-bar">
                        <div class="course-progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <div class="course-overview-stats">${completedTasks}/${courseTasks.length} tâches complétées</div>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Affiche toutes les cartes de cours
 */
function renderCourses() {
    const container = document.getElementById('coursesContainer');
    
    if (courses.length === 0) {
        container.innerHTML = '<p class="empty-state">Aucun cours pour le moment. Créez-en un ! 🎓</p>';
        return;
    }
    
    container.innerHTML = courses.map(course => {
        const progress = getCoursProgress(course.id);
        const courseTasks = tasks.filter(task => task.courseId === course.id);
        const completedTasks = courseTasks.filter(task => task.completed).length;
        
        return `
            <div class="course-card">
                <div class="course-card-header" style="background: linear-gradient(90deg, ${course.color}, ${adjustColor(course.color, 30)});"></div>
                <div class="course-card-content">
                    <h3 class="course-card-title">${course.name}</h3>
                    
                    <div class="course-card-stats">
                        <div class="course-stat">
                            <span>📝</span>
                            <span>${courseTasks.length} tâches</span>
                        </div>
                        <div class="course-stat">
                            <span>✓</span>
                            <span>${completedTasks} complétées</span>
                        </div>
                    </div>
                    
                    <div class="course-progress">
                        <div class="progress-label">
                            <span>Progression</span>
                            <span>${progress}%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%; background-color: ${course.color};"></div>
                        </div>
                    </div>
                    
                    <div class="course-card-actions">
                        <button class="btn-delete" onclick="deleteCourse(${course.id})">
                            🗑️ Supprimer
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Mettre à jour les options du sélecteur de cours
    updateCourseSelectors();
}

/**
 * Affiche la liste des tâches filtrées
 */
function renderTasks() {
    const container = document.getElementById('tasksContainer');
    const filteredTasks = getFilteredTasks();
    
    if (filteredTasks.length === 0) {
        container.innerHTML = '<p class="empty-state">Aucune tâche pour le moment. Commencez à en ajouter ! ✨</p>';
        return;
    }
    
    container.innerHTML = filteredTasks.map(task => {
        const course = getCourseById(task.courseId);
        const courseName = course ? course.name : 'Cours supprimé';
        
        // Formater la date d'échéance si elle existe
        let deadlineText = '';
        if (task.deadline) {
            const date = new Date(task.deadline);
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            if (date.toDateString() === today.toDateString()) {
                deadlineText = '📅 Aujourd\'hui';
            } else if (date.toDateString() === tomorrow.toDateString()) {
                deadlineText = '📅 Demain';
            } else {
                deadlineText = `📅 ${date.toLocaleDateString('fr-FR')}`;
            }
        }
        
        return `
            <div class="task-item ${task.completed ? 'completed' : ''}">
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    ${task.completed ? 'checked' : ''} 
                    onchange="toggleTaskCompletion(${task.id})"
                >
                
                <div class="task-content">
                    <div class="task-title">${task.title}</div>
                    <div class="task-meta">
                        <span class="task-course" style="background-color: ${course ? course.color + '20' : '#f3f4f6'};${course ? `color: ${course.color};` : ''}">
                            ${courseName}
                        </span>
                        ${deadlineText ? `<span class="task-deadline">${deadlineText}</span>` : ''}
                    </div>
                </div>
                
                <div class="task-actions">
                    <button class="btn-small" onclick="deleteTask(${task.id})" title="Supprimer">
                        🗑️
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Met à jour les sélecteurs de cours (dans les modals)
 */
function updateCourseSelectors() {
    const selectors = [
        document.getElementById('taskCourse'),
        document.getElementById('courseFilter')
    ];
    
    selectors.forEach(selector => {
        if (selector) {
            // Garder l'option "Tous les cours" si elle existe
            const defaultOption = selector.querySelector('option[value=""]');
            
            selector.innerHTML = '';
            
            if (defaultOption) {
                selector.appendChild(defaultOption);
            }
            
            courses.forEach(course => {
                const option = document.createElement('option');
                option.value = course.id;
                option.textContent = course.name;
                selector.appendChild(option);
            });
        }
    });
}

// ========== CITATIONS MOTIVATIONNELLES ==========

/**
 * Charge une citation motivationnelle depuis une API externe
 */
async function loadMotivationalQuote() {
    try {
        // Utilisation de l'API "thequoteshub" pour obtenir une citation aléatoire
        const response = await fetch('https://thequoteshub.com/api/random-quote');
        
        if (!response.ok) {
            throw new Error('Erreur lors du chargement de la citation');
        }
        
        const data = await response.json();
        const quoteText = data.text || data.content || data.quote || 'Citation indisponible';
        const quoteAuthor = data.author || data.narrator || 'Auteur inconnu';
        
        document.getElementById('quoteText').textContent = `"${quoteText}"`;
        document.getElementById('quoteAuthor').textContent = `— ${quoteAuthor}`;
        
    } catch (error) {
        // En cas d'erreur, afficher une citation par défaut
        console.log('Erreur lors du chargement de la citation:', error);
        document.getElementById('quoteText').textContent = '"La réussite n\'est pas finale, l\'échec n\'est pas fatal: c\'est le courage de continuer qui compte."';
        document.getElementById('quoteAuthor').textContent = '— Winston Churchill';
    }
}

// ========== GESTION DES MODALS ==========

/**
 * Ouvre un modal
 */
function openModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
    
    // Réinitialiser les champs du formulaire
    if (modalId === 'addCourseModal') {
        document.getElementById('courseName').value = '';
        document.getElementById('courseColor').value = '#6366f1';
        document.getElementById('colorPreview').style.backgroundColor = '#6366f1';
        document.getElementById('courseName').focus();
    } else if (modalId === 'addTaskModal') {
        document.getElementById('taskTitle').value = '';
        document.getElementById('taskCourse').value = '';
        document.getElementById('taskDeadline').value = '';
        document.getElementById('taskTitle').focus();
    }
}

/**
 * Ferme un modal
 */
function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

/**
 * Ferme tous les modals
 */
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.add('hidden');
    });
}

// ========== EVENT LISTENERS ==========

/**
 * Configure tous les event listeners
 */
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.getAttribute('data-section');
            switchSection(section);
        });
    });
    
    // Thème
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Menu toggle mobile
    document.getElementById('menuToggle').addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('active');
    });
    
    // ===== MODALS COURSES =====
    document.getElementById('addCourseBtn').addEventListener('click', () => {
        openModal('addCourseModal');
    });
    
    document.getElementById('confirmAddCourse').addEventListener('click', () => {
        const name = document.getElementById('courseName').value;
        const color = document.getElementById('courseColor').value;
        addCourse(name, color);
    });
    
    // Mettre à jour la couleur en temps réel
    document.getElementById('courseColor').addEventListener('change', (e) => {
        document.getElementById('colorPreview').style.backgroundColor = e.target.value;
    });
    
    // ===== MODALS TASKS =====
    document.getElementById('addTaskBtn').addEventListener('click', () => {
        if (courses.length === 0) {
            alert('Veuillez d\'abord créer un cours');
            switchSection('courses');
            return;
        }
        openModal('addTaskModal');
    });
    
    document.getElementById('confirmAddTask').addEventListener('click', () => {
        const courseId = document.getElementById('taskCourse').value;
        const title = document.getElementById('taskTitle').value;
        const deadline = document.getElementById('taskDeadline').value;
        addTask(courseId, title, deadline);
    });
    
    // Filtres des tâches
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterTasks(e.target.getAttribute('data-filter'));
        });
    });
    
    // Sélecteur de cours
    document.getElementById('courseFilter').addEventListener('change', (e) => {
        filterTasksByCourse(e.target.value);
    });
    
    // ===== CITATION MOTIVATIONNELLE =====
    document.getElementById('refreshQuoteBtn').addEventListener('click', loadMotivationalQuote);
    
    // ===== FERMETURE MODALS =====
    // Fermer en cliquant sur la croix
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            e.target.closest('.modal').classList.add('hidden');
        });
    });
    
    // Fermer en cliquant sur Annuler
    document.querySelectorAll('.modal-cancel').forEach(cancelBtn => {
        cancelBtn.addEventListener('click', () => {
            closeAllModals();
        });
    });
    
    // Fermer en cliquant en dehors du modal
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    });
    
    // Touches clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
        
        // Entrer pour valider les modals
        if (e.key === 'Enter') {
            const addCourseModal = document.getElementById('addCourseModal');
            const addTaskModal = document.getElementById('addTaskModal');
            
            if (!addCourseModal.classList.contains('hidden')) {
                document.getElementById('confirmAddCourse').click();
            } else if (!addTaskModal.classList.contains('hidden')) {
                document.getElementById('confirmAddTask').click();
            }
        }
    });
}

// ========== UTILITAIRES ==========

/**
 * Ajuste la luminosité d'une couleur hex
 */
function adjustColor(color, percent) {
    const num = parseInt(color.replace("#",""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return "#" + (0x1000000 + R*0x10000 + G*0x100 + B).toString(16).slice(1);
}
