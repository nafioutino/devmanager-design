// Configuration de la pagination
const ITEMS_PER_PAGE = 6;
let currentPage = 1;

// Données des développeurs
let developers = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Full Stack Developer",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        skills: ["JavaScript", "Python", "React", "Node.js"],
        status: "disponible",
        tasksCompleted: 15,
        totalTasks: 20,
        activeProjects: 3,
        performance: 95
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "Frontend Developer",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        skills: ["HTML", "CSS", "JavaScript", "Vue.js"],
        status: "occupé",
        tasksCompleted: 12,
        totalTasks: 18,
        activeProjects: 2,
        performance: 88
    },
    {
        id: 3,
        name: "Mike Johnson",
        email: "mike.johnson@example.com",
        role: "Backend Developer",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        skills: ["Java", "Spring", "SQL", "MongoDB"],
        status: "disponible",
        tasksCompleted: 18,
        totalTasks: 25,
        activeProjects: 4,
        performance: 92
    },
    {
        id: 4,
        name: "Sarah Brown",
        email: "sarah.brown@example.com",
        role: "UI/UX Designer",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        skills: ["Figma", "Adobe XD", "Sketch", "Photoshop"],
        status: "disponible",
        tasksCompleted: 10,
        totalTasks: 15,
        activeProjects: 2,
        performance: 90
    },
    {
        id: 5,
        name: "Tom Wilson",
        email: "tom.wilson@example.com",
        role: "DevOps Engineer",
        skills: ["Docker", "Kubernetes", "AWS", "Jenkins"],
        status: "occupé",
        tasksCompleted: 20,
        totalTasks: 25,
        activeProjects: 3,
        performance: 94
    },
    {
        id: 6,
        name: "Emily Davis",
        email: "emily.davis@example.com",
        role: "Mobile Developer",
        skills: ["Flutter", "React Native", "Swift", "Kotlin"],
        status: "disponible",
        tasksCompleted: 8,
        totalTasks: 12,
        activeProjects: 1,
        performance: 85
    },
    {
        id: 7,
        name: "David Miller",
        email: "david.miller@example.com",
        role: "QA Engineer",
        skills: ["Selenium", "Jest", "Cypress", "JUnit"],
        status: "disponible",
        tasksCompleted: 25,
        totalTasks: 30,
        activeProjects: 4,
        performance: 91
    }
];

// État des filtres
let currentFilters = {
    search: '',
    status: 'all',
    role: 'all',
    skill: 'all'
};

// Fonction pour obtenir les développeurs de la page courante
function getCurrentPageDevelopers() {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filterDevelopers().slice(startIndex, endIndex);
}

// Fonction pour calculer le nombre total de pages
function getTotalPages() {
    return Math.ceil(filterDevelopers().length / ITEMS_PER_PAGE);
}

// Fonction pour mettre à jour la pagination
function updatePagination() {
    const totalPages = getTotalPages();
    const pageNumbers = document.getElementById('page-numbers');
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');

    // Mettre à jour les boutons précédent/suivant
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;

    // Générer les numéros de page
    let pagesHtml = '';
    for (let i = 1; i <= totalPages; i++) {
        pagesHtml += `
            <button class="px-3 py-1 text-sm rounded-lg ${currentPage === i ? 
                'bg-blue-600 text-white' : 
                'bg-white border hover:bg-gray-50'}"
                onclick="goToPage(${i})">
                ${i}
            </button>
        `;
    }
    pageNumbers.innerHTML = pagesHtml;
}

// Fonction pour aller à une page spécifique
function goToPage(page) {
    currentPage = page;
    renderDevelopers();
    updatePagination();
}

// Gestion du modal
function showModal() {
    console.log('Showing modal');
    const modal = document.getElementById('developer-modal');
    if (modal) {
        modal.classList.remove('hidden');
    } else {
        console.error('Modal element not found');
    }
}

function hideModal() {
    console.log('Hiding modal');
    const modal = document.getElementById('developer-modal');
    if (modal) {
        modal.classList.add('hidden');
    } else {
        console.error('Modal element not found');
    }
}

function handleAddDeveloper(event) {
    event.preventDefault();
    console.log('Handling add developer');
    
    const form = event.target;
    const formData = new FormData(form);
    
    const newDeveloper = {
        id: developers.length + 1,
        name: formData.get('name'),
        email: formData.get('email'),
        role: formData.get('role'),
        skills: formData.get('skills').split(',').map(skill => skill.trim()),
        status: 'disponible',
        tasksCompleted: 0,
        totalTasks: 0,
        activeProjects: 0,
        performance: 100,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.get('name'))}`
    };

    console.log('New developer:', newDeveloper);
    developers.push(newDeveloper);
    
    // Fermer le modal et réinitialiser le formulaire
    document.getElementById('developer-modal').classList.add('hidden');
    form.reset();

    // Mettre à jour l'affichage
    renderDevelopers();
    updatePagination();
}

document.addEventListener('DOMContentLoaded', () => {
    // Afficher les développeurs existants
    renderDevelopers();

    const newDeveloperBtn = document.getElementById('new-developer-btn');
    
    if (newDeveloperBtn) {
        newDeveloperBtn.addEventListener('click', () => {
            document.getElementById('developer-modal').classList.remove('hidden');
        });
    }

    // Fermer le modal
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('developer-modal').classList.add('hidden');
        });
    });

    // Soumission du formulaire développeur
    const developerForm = document.getElementById('developer-form');
    if (developerForm) {
        developerForm.addEventListener('submit', handleAddDeveloper);
    }

    // Initialiser la recherche et les filtres
    initializeSearchAndFilters();

    // Événements pour la pagination
    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    });

    document.getElementById('next-page').addEventListener('click', () => {
        if (currentPage < getTotalPages()) {
            goToPage(currentPage + 1);
        }
    });

    // Modal
    const addButton = document.getElementById('add-developer-btn');
    if (addButton) {
        addButton.addEventListener('click', showModal);
    }

    const closeButton = document.getElementById('close-modal');
    if (closeButton) {
        closeButton.addEventListener('click', hideModal);
    }

    const cancelButton = document.getElementById('cancel-modal');
    if (cancelButton) {
        cancelButton.addEventListener('click', hideModal);
    }

    const modal = document.getElementById('developer-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });
    }
});

// Fonction pour initialiser la recherche et les filtres
function initializeSearchAndFilters() {
    // Recherche
    const searchInput = document.getElementById('developer-search');
    searchInput?.addEventListener('input', (e) => {
        currentFilters.search = e.target.value.toLowerCase();
        renderDevelopers();
        updatePagination();
    });

    // Filtre par statut
    const statusFilter = document.getElementById('status-filter');
    statusFilter?.addEventListener('change', (e) => {
        currentFilters.status = e.target.value;
        renderDevelopers();
        updatePagination();
    });

    // Filtre par rôle
    const roleFilter = document.getElementById('role-filter');
    roleFilter?.addEventListener('change', (e) => {
        currentFilters.role = e.target.value;
        renderDevelopers();
        updatePagination();
    });

    // Filtre par compétence
    const skillFilter = document.getElementById('skill-filter');
    skillFilter?.addEventListener('change', (e) => {
        currentFilters.skill = e.target.value;
        renderDevelopers();
        updatePagination();
    });
}

// Fonction pour filtrer les développeurs
function filterDevelopers() {
    return developers.filter(dev => {
        // Filtre de recherche
        const searchMatch = 
            dev.name.toLowerCase().includes(currentFilters.search) ||
            dev.email.toLowerCase().includes(currentFilters.search) ||
            dev.role.toLowerCase().includes(currentFilters.search) ||
            dev.skills.some(skill => skill.toLowerCase().includes(currentFilters.search));

        // Filtre de statut
        const statusMatch = currentFilters.status === 'all' || dev.status === currentFilters.status;

        // Filtre de rôle
        const roleMatch = currentFilters.role === 'all' || dev.role === currentFilters.role;

        // Filtre de compétence
        const skillMatch = currentFilters.skill === 'all' || dev.skills.includes(currentFilters.skill);

        return searchMatch && statusMatch && roleMatch && skillMatch;
    });
}

// Fonction pour afficher les développeurs
function renderDevelopers() {
    const container = document.querySelector('.grid');
    if (!container) return;

    const currentPageDevelopers = getCurrentPageDevelopers();
    
    container.innerHTML = currentPageDevelopers.map(dev => `
        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex justify-between items-start mb-4">
                <div class="flex items-center">
                    <img src="${dev.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(dev.name)}&background=random`}" 
                         alt="${dev.name}" 
                         class="w-12 h-12 rounded-full mr-4">
                    <div>
                        <h3 class="text-lg font-semibold">${dev.name}</h3>
                        <p class="text-sm text-gray-600">${dev.role}</p>
                        <p class="text-sm text-gray-500">${dev.email}</p>
                    </div>
                </div>
                <span class="px-2 py-1 ${getStatusColor(dev.status)} rounded-full text-sm">
                    ${dev.status}
                </span>
            </div>
            <div class="space-y-4">
                <div class="flex justify-between text-sm">
                    <div>
                        <p class="text-gray-600">Projets actifs</p>
                        <p class="font-semibold">${dev.activeProjects}</p>
                    </div>
                    <div>
                        <p class="text-gray-600">Tâches complétées</p>
                        <p class="font-semibold">${dev.tasksCompleted}/${dev.totalTasks}</p>
                    </div>
                    <div>
                        <p class="text-gray-600">Performance</p>
                        <p class="font-semibold">${dev.performance}%</p>
                    </div>
                </div>
                <div>
                    <p class="text-sm font-medium text-gray-600 mb-2">Compétences</p>
                    <div class="flex flex-wrap gap-2">
                        ${dev.skills.map(skill => `
                            <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                                ${skill}
                            </span>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Fonction pour obtenir la couleur du statut
function getStatusColor(status) {
    switch (status) {
        case 'disponible':
            return 'bg-green-100 text-green-700';
        case 'occupé':
            return 'bg-red-100 text-red-700';
        default:
            return 'bg-gray-100 text-gray-700';
    }
}

// Attacher les événements aux boutons d'action
function attachDeveloperEvents() {
    // Gestion du statut
    document.querySelectorAll('.developer-status-toggle').forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            const developerId = parseInt(e.target.dataset.developerId);
            const developer = developers.find(d => d.id === developerId);
            if (developer) {
                developer.status = e.target.checked ? 'occupé' : 'disponible';
            }
        });
    });

    // Édition
    document.querySelectorAll('.edit-developer').forEach(button => {
        button.addEventListener('click', (e) => {
            const developerId = parseInt(e.target.closest('[data-developer-id]').dataset.developerId);
            const developer = developers.find(d => d.id === developerId);
            if (developer) {
                // TODO: Remplir le formulaire avec les données du développeur
                document.getElementById('developer-modal').classList.remove('hidden');
            }
        });
    });

    // Suppression
    document.querySelectorAll('.delete-developer').forEach(button => {
        button.addEventListener('click', (e) => {
            const developerId = parseInt(e.target.closest('[data-developer-id]').dataset.developerId);
            if (confirm('Êtes-vous sûr de vouloir supprimer ce développeur ?')) {
                developers = developers.filter(d => d.id !== developerId);
                renderDevelopers();
                updatePagination();
            }
        });
    });
}

// Exporter les développeurs pour qu'ils soient disponibles dans d'autres fichiers
window.getDevelopers = function() {
    return developers;
};

// Données d'exemple des développeurs
const developersExample = [
    {
        id: 1,
        name: 'Jean Dupont',
        avatar: '../assets/avatars/dev1.jpg',
        speciality: 'Frontend',
        experience: 5,
        rating: 4.8,
        availability: 'partial',
        projects: ['E-commerce Premium', 'Dashboard Analytics'],
        skills: ['React', 'TypeScript', 'Tailwind CSS'],
        completedTasks: 45,
        activeProjects: 2
    },
    {
        id: 2,
        name: 'Marie Martin',
        avatar: '../assets/avatars/dev2.jpg',
        speciality: 'Backend',
        experience: 7,
        rating: 4.9,
        availability: 'busy',
        projects: ['API Gateway', 'CRM System'],
        skills: ['Node.js', 'Python', 'MongoDB'],
        completedTasks: 67,
        activeProjects: 3
    },
    {
        id: 3,
        name: 'Lucas Bernard',
        avatar: '../assets/avatars/dev3.jpg',
        speciality: 'Full-stack',
        experience: 4,
        rating: 4.5,
        availability: 'available',
        projects: ['Mobile App'],
        skills: ['Vue.js', 'Laravel', 'MySQL'],
        completedTasks: 38,
        activeProjects: 1
    },
    {
        id: 4,
        name: 'Sophie Dubois',
        avatar: '../assets/avatars/dev4.jpg',
        speciality: 'Mobile',
        experience: 3,
        rating: 4.6,
        availability: 'partial',
        projects: ['iOS App', 'Android App'],
        skills: ['Swift', 'Kotlin', 'Flutter'],
        completedTasks: 29,
        activeProjects: 2
    },
    {
        id: 5,
        name: 'Thomas Michel',
        avatar: '../assets/avatars/dev5.jpg',
        speciality: 'DevOps',
        experience: 6,
        rating: 4.7,
        availability: 'available',
        projects: ['CI/CD Pipeline'],
        skills: ['Docker', 'Kubernetes', 'AWS'],
        completedTasks: 52,
        activeProjects: 1
    }
];

// Configuration pour le filtrage
const FILTER_PAGE_SIZE = 8;
let filterCurrentPage = 1;
let filteredDevelopers = [...developersExample];

// État des filtres
const filterState = {
    search: '',
    speciality: '',
    experience: '',
    availability: '',
    sort: ''
};

// Gestion du modal
function showModal() {
    console.log('Showing modal');
    const modal = document.getElementById('developer-modal');
    if (modal) {
        modal.classList.remove('hidden');
    } else {
        console.error('Modal element not found');
    }
}

function hideModal() {
    console.log('Hiding modal');
    const modal = document.getElementById('developer-modal');
    if (modal) {
        modal.classList.add('hidden');
    } else {
        console.error('Modal element not found');
    }
}

function handleAddDeveloper(event) {
    event.preventDefault();
    console.log('Handling add developer');
    
    const form = event.target;
    const formData = new FormData(form);
    
    const newDeveloper = {
        id: developersExample.length + 1,
        name: formData.get('name'),
        avatar: '../assets/avatars/default.jpg',
        speciality: formData.get('speciality'),
        experience: parseInt(formData.get('experience')),
        rating: 5.0,
        availability: formData.get('availability'),
        projects: [],
        skills: formData.get('skills').split(',').map(skill => skill.trim()),
        completedTasks: 0,
        activeProjects: 0
    };
    
    console.log('New developer:', newDeveloper);
    developersExample.push(newDeveloper);
    filteredDevelopers = [...developersExample];
    filterDevelopersExample();
    hideModal();
    form.reset();
}

// Fonctions de filtrage et tri
function filterDevelopersExample() {
    let results = [...developersExample];

    // Recherche textuelle
    if (filterState.search) {
        const searchLower = filterState.search.toLowerCase();
        results = results.filter(dev => 
            dev.name.toLowerCase().includes(searchLower) ||
            dev.skills.some(skill => skill.toLowerCase().includes(searchLower)) ||
            dev.projects.some(project => project.toLowerCase().includes(searchLower))
        );
    }

    // Filtre par spécialité
    if (filterState.speciality) {
        results = results.filter(dev => dev.speciality.toLowerCase() === filterState.speciality.toLowerCase());
    }

    // Filtre par expérience
    if (filterState.experience) {
        switch (filterState.experience) {
            case 'junior':
                results = results.filter(dev => dev.experience < 3);
                break;
            case 'intermediate':
                results = results.filter(dev => dev.experience >= 3 && dev.experience <= 5);
                break;
            case 'senior':
                results = results.filter(dev => dev.experience > 5);
                break;
        }
    }

    // Filtre par disponibilité
    if (filterState.availability) {
        results = results.filter(dev => dev.availability === filterState.availability);
    }

    // Tri
    if (filterState.sort) {
        switch (filterState.sort) {
            case 'name-asc':
                results.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                results.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'rating-desc':
                results.sort((a, b) => b.rating - a.rating);
                break;
            case 'rating-asc':
                results.sort((a, b) => a.rating - b.rating);
                break;
            case 'projects-desc':
                results.sort((a, b) => b.activeProjects - a.activeProjects);
                break;
            case 'projects-asc':
                results.sort((a, b) => a.activeProjects - b.activeProjects);
                break;
        }
    }

    filteredDevelopers = results;
    filterCurrentPage = 1;
    displayDevelopersExample();
    updateActiveFiltersExample();
}

// Affichage des développeurs
function displayDevelopersExample() {
    const container = document.querySelector('.developers-grid');
    if (!container) {
        console.error('Developers grid container not found');
        return;
    }

    const start = (filterCurrentPage - 1) * FILTER_PAGE_SIZE;
    const end = start + FILTER_PAGE_SIZE;
    const pageData = filteredDevelopers.slice(start, end);

    container.innerHTML = pageData.map(dev => `
        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center mb-4">
                <img src="${dev.avatar}" alt="${dev.name}" class="w-16 h-16 rounded-full object-cover mr-4">
                <div>
                    <h3 class="text-lg font-semibold">${dev.name}</h3>
                    <p class="text-gray-600">${dev.speciality}</p>
                </div>
            </div>
            
            <div class="mb-4">
                <div class="flex items-center mb-2">
                    <div class="flex">
                        ${getRatingStars(dev.rating)}
                    </div>
                    <span class="ml-2 text-gray-600">${dev.rating}/5</span>
                </div>
                <div class="flex items-center">
                    <span class="px-2 py-1 rounded-full text-xs ${getAvailabilityClass(dev.availability)}">
                        ${getAvailabilityText(dev.availability)}
                    </span>
                    <span class="ml-2 text-sm text-gray-600">${dev.experience} ans d'exp.</span>
                </div>
            </div>

            <div class="mb-4">
                <h4 class="text-sm font-semibold mb-2">Compétences</h4>
                <div class="flex flex-wrap gap-2">
                    ${dev.skills.map(skill => `
                        <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            ${skill}
                        </span>
                    `).join('')}
                </div>
            </div>

            <div class="border-t pt-4">
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p class="text-gray-600">Projets actifs</p>
                        <p class="font-semibold">${dev.activeProjects}</p>
                    </div>
                    <div>
                        <p class="text-gray-600">Tâches complétées</p>
                        <p class="font-semibold">${dev.completedTasks}</p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    updatePaginationExample();
}

// Mise à jour des filtres actifs
function updateActiveFiltersExample() {
    const container = document.getElementById('active-filters');
    if (!container) {
        console.error('Active filters container not found');
        return;
    }

    const activeFilters = [];

    if (filterState.search) {
        activeFilters.push({
            type: 'search',
            label: `Recherche: ${filterState.search}`
        });
    }

    if (filterState.speciality) {
        activeFilters.push({
            type: 'speciality',
            label: `Spécialité: ${filterState.speciality}`
        });
    }

    if (filterState.experience) {
        const expLabels = {
            'junior': 'Junior (0-2 ans)',
            'intermediate': 'Intermédiaire (3-5 ans)',
            'senior': 'Senior (6+ ans)'
        };
        activeFilters.push({
            type: 'experience',
            label: `Expérience: ${expLabels[filterState.experience]}`
        });
    }

    if (filterState.availability) {
        const availLabels = {
            'available': 'Disponible',
            'partial': 'Partiellement occupé',
            'busy': 'Occupé'
        };
        activeFilters.push({
            type: 'availability',
            label: `Disponibilité: ${availLabels[filterState.availability]}`
        });
    }

    container.innerHTML = activeFilters.map(filter => `
        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
            ${filter.label}
            <button class="ml-2 focus:outline-none" onclick="removeFilter('${filter.type}')">
                <i class="ri-close-line"></i>
            </button>
        </span>
    `).join('');
}

// Fonctions utilitaires
function getRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return `
        ${'<i class="ri-star-fill text-yellow-400"></i>'.repeat(fullStars)}
        ${hasHalfStar ? '<i class="ri-star-half-fill text-yellow-400"></i>' : ''}
        ${'<i class="ri-star-line text-yellow-400"></i>'.repeat(emptyStars)}
    `;
}

function getAvailabilityClass(availability) {
    switch (availability) {
        case 'available':
            return 'bg-green-100 text-green-800';
        case 'partial':
            return 'bg-yellow-100 text-yellow-800';
        case 'busy':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

function getAvailabilityText(availability) {
    switch (availability) {
        case 'available':
            return 'Disponible';
        case 'partial':
            return 'Partiellement occupé';
        case 'busy':
            return 'Occupé';
        default:
            return 'Non défini';
    }
}

function updatePaginationExample() {
    const paginationContainer = document.querySelector('.pagination');
    if (!paginationContainer) {
        console.error('Pagination container not found');
        return;
    }

    const totalPages = Math.ceil(filteredDevelopers.length / FILTER_PAGE_SIZE);
    
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    
    if (prevButton) prevButton.disabled = filterCurrentPage === 1;
    if (nextButton) nextButton.disabled = filterCurrentPage === totalPages;
    if (pageInfo) {
        pageInfo.textContent = `Page ${filterCurrentPage} sur ${totalPages} (${filteredDevelopers.length} développeurs)`;
    }
}

function removeFilter(type) {
    filterState[type] = '';
    
    const element = document.getElementById(`filter-${type}`) || document.getElementById(`dev-${type}`);
    if (element) element.value = '';
    
    filterDevelopersExample();
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    // Premier affichage
    displayDevelopersExample();
    updatePaginationExample();

    // Recherche
    const searchInput = document.getElementById('dev-search');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                filterState.search = e.target.value;
                filterDevelopersExample();
            }, 300);
        });
    }

    // Filtres
    const specialitySelect = document.getElementById('filter-speciality');
    if (specialitySelect) {
        specialitySelect.addEventListener('change', (e) => {
            filterState.speciality = e.target.value;
            filterDevelopersExample();
        });
    }

    const experienceSelect = document.getElementById('filter-experience');
    if (experienceSelect) {
        experienceSelect.addEventListener('change', (e) => {
            filterState.experience = e.target.value;
            filterDevelopersExample();
        });
    }

    const availabilitySelect = document.getElementById('filter-availability');
    if (availabilitySelect) {
        availabilitySelect.addEventListener('change', (e) => {
            filterState.availability = e.target.value;
            filterDevelopersExample();
        });
    }

    // Tri
    const sortSelect = document.getElementById('sort-developers');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            filterState.sort = e.target.value;
            filterDevelopersExample();
        });
    }

    // Réinitialisation des filtres
    const resetButton = document.getElementById('reset-filters');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            filterState.search = '';
            filterState.speciality = '';
            filterState.experience = '';
            filterState.availability = '';
            filterState.sort = '';
            
            const formElements = [
                'dev-search',
                'filter-speciality',
                'filter-experience',
                'filter-availability',
                'sort-developers'
            ];
            
            formElements.forEach(id => {
                const element = document.getElementById(id);
                if (element) element.value = '';
            });
            
            filterDevelopersExample();
        });
    }

    // Pagination
    const prevButton = document.getElementById('prev-page');
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (filterCurrentPage > 1) {
                filterCurrentPage--;
                displayDevelopersExample();
            }
        });
    }

    const nextButton = document.getElementById('next-page');
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredDevelopers.length / FILTER_PAGE_SIZE);
            if (filterCurrentPage < totalPages) {
                filterCurrentPage++;
                displayDevelopersExample();
            }
        });
    }

    // Modal
    console.log('Setting up modal handlers');
    const addButton = document.getElementById('add-developer-btn');
    if (addButton) {
        console.log('Add button found');
        addButton.addEventListener('click', () => {
            console.log('Add button clicked');
            showModal();
        });
    } else {
        console.error('Add button not found');
    }

    const closeButton = document.getElementById('close-modal');
    if (closeButton) {
        closeButton.addEventListener('click', hideModal);
    }

    const cancelButton = document.getElementById('cancel-modal');
    if (cancelButton) {
        cancelButton.addEventListener('click', hideModal);
    }

    const developerForm = document.getElementById('developer-form');
    if (developerForm) {
        developerForm.addEventListener('submit', handleAddDeveloper);
    }

    const modal = document.getElementById('developer-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });
    }
});
