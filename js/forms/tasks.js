// Données d'exemple pour les tâches
let tasks = {
    todo: [
        {
            id: 1,
            title: "Mise à jour API",
            description: "Implémenter les nouveaux endpoints pour la v2",
            project: "Refonte API",
            assignee: "John Doe",
            priority: "high",
            deadline: "2024-12-31",
            status: "todo"
        },
        {
            id: 4,
            title: "Conception Base de données",
            description: "Concevoir le schéma de la base de données",
            project: "CRM Integration",
            assignee: "Jane Smith",
            priority: "high",
            deadline: "2024-01-10",
            status: "todo"
        }
    ],
    "in-progress": [
        {
            id: 2,
            title: "Design Dashboard",
            description: "Créer les maquettes pour le nouveau dashboard",
            project: "Dashboard Analytics",
            assignee: "Jane Smith",
            priority: "medium",
            deadline: "2024-01-15",
            status: "in-progress"
        },
        {
            id: 5,
            title: "Développement Frontend",
            description: "Développer l'interface utilisateur",
            project: "Site E-commerce",
            assignee: "Sarah Brown",
            priority: "medium",
            deadline: "2024-01-20",
            status: "in-progress"
        }
    ],
    done: [
        {
            id: 3,
            title: "Configuration Serveur",
            description: "Configuration du nouveau serveur de production",
            project: "Infrastructure",
            assignee: "Mike Johnson",
            priority: "low",
            deadline: "2023-12-29",
            status: "done"
        },
        {
            id: 6,
            title: "Tests Unitaires",
            description: "Écrire les tests unitaires pour l'API",
            project: "Application Mobile",
            assignee: "Tom Wilson",
            priority: "medium",
            deadline: "2023-12-30",
            status: "done"
        }
    ]
};

// État des filtres
let currentFilters = {
    search: '',
    priority: 'all',
    assignee: 'all',
    project: 'all'
};

document.addEventListener('DOMContentLoaded', () => {
    // Remplir les listes déroulantes
    populateDropdowns();

    // Afficher les tâches existantes
    renderTasks();

    const newTaskBtn = document.getElementById('new-task-btn');
    
    if (newTaskBtn) {
        newTaskBtn.addEventListener('click', () => {
            document.getElementById('task-modal').classList.remove('hidden');
        });
    }

    // Fermer le modal
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('task-modal').classList.add('hidden');
        });
    });

    // Soumission du formulaire de tâche
    const taskForm = document.getElementById('task-form');
    if (taskForm) {
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(taskForm);
            
            const newTask = {
                id: Math.max(...Object.values(tasks).flat().map(t => t.id)) + 1,
                title: formData.get('title'),
                description: formData.get('description'),
                project: formData.get('project'),
                assignee: formData.get('assignee'),
                priority: formData.get('priority'),
                deadline: formData.get('deadline'),
                status: 'todo'
            };

            // Ajouter la nouvelle tâche à la liste
            tasks.todo.push(newTask);
            
            // Fermer le modal et réinitialiser le formulaire
            document.getElementById('task-modal').classList.add('hidden');
            taskForm.reset();

            // Mettre à jour l'affichage
            renderTasks();
        });
    }

    // Initialiser la recherche et les filtres
    initializeSearchAndFilters();

    // Initialiser le drag & drop
    initializeDragAndDrop();

    // Initialiser les filtres
    initializeFilters();
});

// Fonction pour initialiser la recherche et les filtres
function initializeSearchAndFilters() {
    // Recherche
    const searchInput = document.getElementById('task-search');
    searchInput?.addEventListener('input', (e) => {
        currentFilters.search = e.target.value.toLowerCase();
        renderTasks();
    });

    // Filtre par priorité
    const priorityFilter = document.getElementById('priority-filter');
    priorityFilter?.addEventListener('change', (e) => {
        currentFilters.priority = e.target.value;
        renderTasks();
    });

    // Filtre par assigné
    const assigneeFilter = document.getElementById('assignee-filter');
    assigneeFilter?.addEventListener('change', (e) => {
        currentFilters.assignee = e.target.value;
        renderTasks();
    });

    // Filtre par projet
    const projectFilter = document.getElementById('project-filter');
    projectFilter?.addEventListener('change', (e) => {
        currentFilters.project = e.target.value;
        renderTasks();
    });
}

// Fonction pour filtrer les tâches
function filterTasks() {
    const allTasks = Object.values(tasks).flat();
    return allTasks.filter(task => {
        // Filtre de recherche
        const searchMatch = 
            task.title.toLowerCase().includes(currentFilters.search) ||
            task.description.toLowerCase().includes(currentFilters.search) ||
            task.project.toLowerCase().includes(currentFilters.search) ||
            task.assignee.toLowerCase().includes(currentFilters.search);

        // Filtre de priorité
        const priorityMatch = currentFilters.priority === 'all' || task.priority === currentFilters.priority;

        // Filtre d'assigné
        const assigneeMatch = currentFilters.assignee === 'all' || task.assignee === currentFilters.assignee;

        // Filtre de projet
        const projectMatch = currentFilters.project === 'all' || task.project === currentFilters.project;

        return searchMatch && priorityMatch && assigneeMatch && projectMatch;
    });
}

// Fonction pour afficher les tâches
function renderTasks() {
    const filteredTasks = filterTasks();
    
    // Regrouper les tâches filtrées par statut
    const groupedTasks = {
        todo: filteredTasks.filter(task => task.status === 'todo'),
        'in-progress': filteredTasks.filter(task => task.status === 'in-progress'),
        done: filteredTasks.filter(task => task.status === 'done')
    };

    // Mettre à jour chaque colonne
    Object.keys(groupedTasks).forEach(status => {
        const column = document.querySelector(`[data-status="${status}"] .space-y-4`);
        if (!column) return;

        column.innerHTML = groupedTasks[status].map(task => `
            <div class="task-card bg-white p-4 rounded-lg shadow cursor-move" draggable="true" data-task-id="${task.id}" data-priority="${task.priority}">
                <div class="flex justify-between items-start mb-2">
                    <h4 class="font-semibold">${task.title}</h4>
                    <span class="text-${getPriorityColor(task.priority)}-600 bg-${getPriorityColor(task.priority)}-100 px-2 py-1 rounded-full text-xs">
                        ${getPriorityLabel(task.priority)}
                    </span>
                </div>
                <p class="text-gray-600 text-sm mb-4">${task.description}</p>
                <div class="flex justify-between items-center">
                    <div class="flex items-center">
                        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(task.assignee)}" alt="${task.assignee}" class="w-6 h-6 rounded-full">
                        <span class="text-sm text-gray-600 ml-2">${task.assignee}</span>
                    </div>
                    <span class="text-sm text-gray-500">${formatDate(task.deadline)}</span>
                </div>
                <div class="flex justify-end space-x-2 mt-4">
                    <button class="edit-task px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
                        <i class="ri-edit-line mr-1"></i> Modifier
                    </button>
                    <button class="delete-task px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200">
                        <i class="ri-delete-bin-line mr-1"></i> Supprimer
                    </button>
                </div>
            </div>
        `).join('');
    });

    // Réattacher les événements après le rendu
    attachTaskEvents();
    initializeDragAndDrop();
}

// Initialiser le drag & drop
function initializeDragAndDrop() {
    const taskCards = document.querySelectorAll('.task-card');
    const columns = document.querySelectorAll('.task-column');

    taskCards.forEach(card => {
        card.addEventListener('dragstart', () => {
            card.classList.add('dragging');
        });

        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
            const newStatus = card.closest('.task-column').dataset.status;
            const taskId = parseInt(card.dataset.taskId);
            
            // Mettre à jour le statut de la tâche
            Object.keys(tasks).forEach(status => {
                const task = tasks[status].find(t => t.id === taskId);
                if (task) {
                    tasks[status] = tasks[status].filter(t => t.id !== taskId);
                    task.status = newStatus;
                    tasks[newStatus].push(task);
                }
            });
        });
    });

    columns.forEach(column => {
        column.addEventListener('dragover', e => {
            e.preventDefault();
            const dragging = document.querySelector('.dragging');
            if (dragging) {
                column.querySelector('.space-y-4').appendChild(dragging);
            }
        });
    });
}

// Initialiser les filtres
function initializeFilters() {
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Mettre à jour l'état actif des boutons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('bg-blue-600', 'text-white');
                btn.classList.add('bg-gray-200');
            });
            button.classList.remove('bg-gray-200');
            button.classList.add('bg-blue-600', 'text-white');

            // Filtrer les tâches
            document.querySelectorAll('.task-card').forEach(card => {
                if (filter === 'all' || card.dataset.priority === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Attacher les événements aux boutons d'action
function attachTaskEvents() {
    // Édition
    document.querySelectorAll('.edit-task').forEach(button => {
        button.addEventListener('click', (e) => {
            const taskId = parseInt(e.target.closest('[data-task-id]').dataset.taskId);
            const task = Object.values(tasks).flat().find(t => t.id === taskId);
            if (task) {
                // TODO: Remplir le formulaire avec les données de la tâche
                document.getElementById('task-modal').classList.remove('hidden');
            }
        });
    });

    // Suppression
    document.querySelectorAll('.delete-task').forEach(button => {
        button.addEventListener('click', (e) => {
            const taskId = parseInt(e.target.closest('[data-task-id]').dataset.taskId);
            if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
                Object.keys(tasks).forEach(status => {
                    tasks[status] = tasks[status].filter(t => t.id !== taskId);
                });
                renderTasks();
            }
        });
    });
}

// Fonction pour remplir les listes déroulantes
function populateDropdowns() {
    // Récupérer les projets
    const projects = window.getProjects ? window.getProjects() : [];
    const projectSelect = document.querySelector('select[name="project"]');
    if (projectSelect) {
        const currentOptions = Array.from(projectSelect.options).map(opt => opt.value);
        projects.forEach(project => {
            if (!currentOptions.includes(project.title)) {
                const option = new Option(project.title, project.title);
                projectSelect.add(option);
            }
        });
    }

    // Récupérer les développeurs
    const developers = window.getDevelopers ? window.getDevelopers() : [];
    const assigneeSelect = document.querySelector('select[name="assignee"]');
    if (assigneeSelect) {
        const currentOptions = Array.from(assigneeSelect.options).map(opt => opt.value);
        developers.forEach(dev => {
            if (!currentOptions.includes(dev.name)) {
                const option = new Option(dev.name, dev.name);
                assigneeSelect.add(option);
            }
        });
    }
}

// Fonctions utilitaires
function getPriorityColor(priority) {
    switch (priority) {
        case 'high': return 'red';
        case 'medium': return 'yellow';
        case 'low': return 'green';
        default: return 'gray';
    }
}

function getPriorityLabel(priority) {
    switch (priority) {
        case 'high': return 'Haute';
        case 'medium': return 'Moyenne';
        case 'low': return 'Basse';
        default: return 'Non définie';
    }
}

function formatDate(dateString) {
    const options = { day: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}
