// Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Marquer le lien actif dans la sidebar
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.sidebar-link').forEach(link => {
        if (link.getAttribute('href').includes(currentPage)) {
            link.classList.add('bg-blue-600', 'text-white');
        }
    });

    // Initialiser les fonctionnalités spécifiques à la page
    initializePageFeatures();
});

// Initialisation des fonctionnalités spécifiques aux pages
function initializePageFeatures() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
            initDashboard();
            break;
        case 'tasks.html':
            initTasksPage();
            break;
        case 'projects.html':
            initProjectsPage();
            break;
        case 'reports.html':
            initReportsPage();
            break;
        case 'developers.html':
            initDevelopersPage();
            break;
    }
}

// Fonctions d'initialisation spécifiques aux pages
function initDashboard() {
    // Initialisation des graphiques du dashboard
    if (document.getElementById('projectsChart')) {
        const projectsCtx = document.getElementById('projectsChart').getContext('2d');
        new Chart(projectsCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
                datasets: [{
                    label: 'Performance',
                    data: [65, 59, 80, 81, 56, 85],
                    borderColor: '#2563EB',
                    tension: 0.4,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    if (document.getElementById('tasksChart')) {
        const tasksCtx = document.getElementById('tasksChart').getContext('2d');
        new Chart(tasksCtx, {
            type: 'doughnut',
            data: {
                labels: ['En cours', 'Terminé', 'En retard'],
                datasets: [{
                    data: [12, 19, 3],
                    backgroundColor: [
                        '#FCD34D',
                        '#34D399',
                        '#EF4444'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

function initTasksPage() {
    // Initialisation du drag and drop pour les tâches
    const draggables = document.querySelectorAll('.task-card');
    const containers = document.querySelectorAll('.task-column');

    if (draggables.length && containers.length) {
        initDragAndDrop();
    }

    // Initialisation des filtres
    const filters = document.querySelectorAll('.task-filter');
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            filters.forEach(f => f.classList.remove('bg-blue-600', 'text-white'));
            filter.classList.add('bg-blue-600', 'text-white');
            const status = filter.getAttribute('data-status');
            filterTasks(status);
        });
    });
}

function initProjectsPage() {
    // Initialisation du Kanban board
    if (document.getElementById('kanban-board')) {
        const kanban = new jKanban({
            element: '#kanban-board',
            boards: [
                {
                    id: 'todo',
                    title: 'À faire',
                    class: 'bg-gray-100',
                    item: [
                        {
                            title: 'Tâche exemple',
                            class: 'bg-white p-4 rounded-lg shadow mb-2'
                        }
                    ]
                },
                {
                    id: 'in-progress',
                    title: 'En cours',
                    class: 'bg-blue-100',
                    item: []
                },
                {
                    id: 'done',
                    title: 'Terminé',
                    class: 'bg-green-100',
                    item: []
                }
            ]
        });
    }
}

function initReportsPage() {
    // Initialisation des graphiques de rapport
    const charts = document.querySelectorAll('[data-chart]');
    charts.forEach(chartElement => {
        const ctx = chartElement.getContext('2d');
        const type = chartElement.dataset.type;
        const data = JSON.parse(chartElement.dataset.data || '{}');
        
        new Chart(ctx, {
            type: type,
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    });
}

function initDevelopersPage() {
    // Initialisation des toggles de statut
    const toggles = document.querySelectorAll('.developer-status-toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            const developerId = e.target.getAttribute('data-developer-id');
            updateDeveloperStatus(developerId, e.target.checked);
        });
    });

    // Initialisation des graphiques de performance
    const performanceCharts = document.querySelectorAll('.developer-performance-chart');
    performanceCharts.forEach(chart => {
        const ctx = chart.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'],
                datasets: [{
                    label: 'Productivité',
                    data: [8, 7, 9, 8, 9],
                    borderColor: '#2563EB',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    });
}

// Fonctions utilitaires
function filterTasks(status) {
    const tasks = document.querySelectorAll('.task-card');
    tasks.forEach(task => {
        if (status === 'all') {
            task.style.display = 'block';
        } else {
            const taskStatus = task.getAttribute('data-status');
            task.style.display = taskStatus === status ? 'block' : 'none';
        }
    });
}

function updateDeveloperStatus(developerId, status) {
    // Simuler une mise à jour du statut
    console.log(`Mise à jour du statut pour le développeur ${developerId}: ${status}`);
    // Ici, vous pouvez ajouter une requête API pour mettre à jour le statut
}

function initDragAndDrop() {
    const draggables = document.querySelectorAll('.task-card');
    const containers = document.querySelectorAll('.task-column');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
            updateTaskStatus(draggable);
        });
    });

    containers.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault();
            const draggable = document.querySelector('.dragging');
            container.appendChild(draggable);
        });
    });
}

function updateTaskStatus(taskElement) {
    const newStatus = taskElement.parentElement.getAttribute('data-status');
    taskElement.setAttribute('data-status', newStatus);
    // Ici, vous pouvez ajouter une requête API pour mettre à jour le statut
}
