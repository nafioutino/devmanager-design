// Données des projets en dur
let projects = [
    {
        id: 1,
        title: "Refonte API",
        description: "Mise à jour majeure de l'API",
        manager: "John Doe",
        team: ["John Doe", "Jane Smith"],
        startDate: "2024-01-01",
        deadline: "2024-12-31",
        status: "en cours",
        progress: 75
    },
    {
        id: 2,
        title: "Dashboard Analytics",
        description: "Création d'un tableau de bord analytique",
        manager: "Jane Smith",
        team: ["Sarah Brown", "Tom Wilson"],
        startDate: "2024-01-05",
        deadline: "2024-01-15",
        status: "en attente",
        progress: 30
    },
    {
        id: 3,
        title: "Application Mobile",
        description: "Développement application mobile iOS/Android",
        manager: "Mike Johnson",
        team: ["Emily Davis", "David Miller"],
        startDate: "2024-02-01",
        deadline: "2024-05-31",
        status: "en cours",
        progress: 45
    }
];

// Fonction pour ouvrir le modal
function openProjectModal() {
    const modal = document.getElementById('new-project-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

// Fonction pour fermer le modal
function closeProjectModal() {
    const modal = document.getElementById('new-project-modal');
    const form = document.getElementById('new-project-form');
    if (modal) {
        modal.classList.add('hidden');
    }
    if (form) {
        form.reset();
    }
}

// Fonction pour ajouter un nouveau projet
function addNewProject(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const newProject = {
        id: projects.length + 1,
        title: formData.get('title'),
        description: formData.get('description'),
        manager: formData.get('manager'),
        team: Array.from(event.target.querySelector('[name="team"]').selectedOptions).map(opt => opt.value),
        startDate: formData.get('startDate'),
        deadline: formData.get('deadline'),
        status: "en cours",
        progress: 0
    };

    projects.push(newProject);
    renderProjects();
    closeProjectModal();
}

// Fonction pour afficher les projets
function renderProjects() {
    const container = document.querySelector('.grid');
    if (!container) return;

    container.innerHTML = projects.map(project => `
        <div class="bg-white rounded-lg shadow p-6">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="text-lg font-semibold">${project.title}</h3>
                    <p class="text-sm text-gray-600">${project.description}</p>
                </div>
                <span class="px-2 py-1 ${getStatusColor(project.status)} rounded-full text-sm">
                    ${project.status}
                </span>
            </div>
            <div class="space-y-3">
                <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Progression</span>
                    <span class="font-medium">${project.progress}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-blue-600 h-2 rounded-full" style="width: ${project.progress}%"></div>
                </div>
                <div class="flex justify-between items-center text-sm text-gray-600">
                    <div>Chef: ${project.manager}</div>
                    <div>Équipe: ${project.team.join(', ')}</div>
                </div>
                <div class="text-sm text-gray-600">
                    Date limite: ${new Date(project.deadline).toLocaleDateString('fr-FR')}
                </div>
            </div>
        </div>
    `).join('');
}

// Fonction pour la couleur du statut
function getStatusColor(status) {
    switch (status) {
        case 'en cours': return 'bg-green-100 text-green-800';
        case 'en attente': return 'bg-yellow-100 text-yellow-800';
        case 'terminé': return 'bg-blue-100 text-blue-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM chargé, initialisation...');
    
    // Afficher les projets initiaux
    renderProjects();
    
    // Bouton nouveau projet
    const newProjectBtn = document.getElementById('new-project-btn');
    console.log('Bouton nouveau projet:', newProjectBtn);
    if (newProjectBtn) {
        newProjectBtn.addEventListener('click', openProjectModal);
    }
    
    // Boutons fermer modal
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', closeProjectModal);
    });
    
    // Formulaire nouveau projet
    const projectForm = document.getElementById('new-project-form');
    if (projectForm) {
        projectForm.addEventListener('submit', addNewProject);
    }
});
