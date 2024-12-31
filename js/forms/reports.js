// Configuration
const PAGE_SIZE = 10;

// État global
let currentSection = 'overview';
let projectsPage = 1;
let devsPage = 1;
let tasksPage = 1;

// Données d'exemple pour les rapports
const reportsData = {
    overview: {
        stats: {
            totalProjects: 45,
            activeDevs: 12,
            activeTasks: 78,
            completionRate: '85%',
            avgTime: '14 jours',
            satisfaction: '4.5/5'
        },
        alerts: [
            { type: 'warning', message: 'Projet "E-commerce" proche de la date limite (2 jours restants)', date: '2024-01-02' },
            { type: 'success', message: 'Application mobile v1.0 déployée avec succès', date: '2024-01-01' },
            { type: 'info', message: 'Nouveau développeur Sarah Martin a rejoint l\'équipe', date: '2023-12-30' },
            { type: 'warning', message: 'Serveur de test à 85% de capacité', date: '2023-12-29' },
            { type: 'success', message: 'Module de paiement intégré et testé', date: '2023-12-28' }
        ]
    },
    projects: [
        {
            id: 1,
            name: 'E-commerce Premium',
            status: 'En cours',
            lead: 'Jean Dupont',
            progress: 75,
            deadline: '2024-02-15',
            description: 'Plateforme e-commerce haut de gamme'
        },
        {
            id: 2,
            name: 'Application Mobile',
            status: 'Planifié',
            lead: 'Marie Martin',
            progress: 30,
            deadline: '2024-03-20',
            description: 'App mobile de gestion de tâches'
        },
        {
            id: 3,
            name: 'Refonte CRM',
            status: 'En cours',
            lead: 'Lucas Bernard',
            progress: 45,
            deadline: '2024-02-28',
            description: 'Modernisation du CRM existant'
        },
        {
            id: 4,
            name: 'Dashboard Analytics',
            status: 'Terminé',
            lead: 'Sophie Dubois',
            progress: 100,
            deadline: '2023-12-15',
            description: 'Tableau de bord analytique'
        },
        {
            id: 5,
            name: 'API Gateway',
            status: 'En cours',
            lead: 'Thomas Michel',
            progress: 60,
            deadline: '2024-01-30',
            description: 'Passerelle API sécurisée'
        },
        {
            id: 6,
            name: 'Module RH',
            status: 'Planifié',
            lead: 'Claire Lefebvre',
            progress: 15,
            deadline: '2024-04-10',
            description: 'Système de gestion RH'
        },
        {
            id: 7,
            name: 'Chatbot Support',
            status: 'En révision',
            lead: 'Pierre Martin',
            progress: 90,
            deadline: '2024-01-15',
            description: 'Assistant virtuel support client'
        },
        {
            id: 8,
            name: 'Système de Facturation',
            status: 'Terminé',
            lead: 'Anne Durand',
            progress: 100,
            deadline: '2023-12-20',
            description: 'Automatisation de la facturation'
        }
    ],
    developers: [
        {
            id: 1,
            name: 'Jean Dupont',
            projects: 3,
            tasksCompleted: 45,
            performance: '95%',
            rating: 4.8,
            speciality: 'Full-stack',
            joinDate: '2022-06-15'
        },
        {
            id: 2,
            name: 'Marie Martin',
            projects: 2,
            tasksCompleted: 38,
            performance: '92%',
            rating: 4.6,
            speciality: 'Frontend',
            joinDate: '2022-08-01'
        },
        {
            id: 3,
            name: 'Lucas Bernard',
            projects: 4,
            tasksCompleted: 52,
            performance: '88%',
            rating: 4.3,
            speciality: 'Backend',
            joinDate: '2021-11-20'
        },
        {
            id: 4,
            name: 'Sophie Dubois',
            projects: 3,
            tasksCompleted: 41,
            performance: '94%',
            rating: 4.7,
            speciality: 'Data Science',
            joinDate: '2022-03-10'
        },
        {
            id: 5,
            name: 'Thomas Michel',
            projects: 2,
            tasksCompleted: 33,
            performance: '87%',
            rating: 4.2,
            speciality: 'DevOps',
            joinDate: '2023-01-15'
        },
        {
            id: 6,
            name: 'Claire Lefebvre',
            projects: 3,
            tasksCompleted: 47,
            performance: '91%',
            rating: 4.5,
            speciality: 'UX/UI',
            joinDate: '2022-09-05'
        }
    ],
    tasks: [
        {
            id: 1,
            name: 'Intégration API Paiement',
            project: 'E-commerce Premium',
            assignee: 'Jean Dupont',
            status: 'En cours',
            deadline: '2024-01-15',
            priority: 'Haute'
        },
        {
            id: 2,
            name: 'Design Interface Mobile',
            project: 'Application Mobile',
            assignee: 'Claire Lefebvre',
            status: 'Terminé',
            deadline: '2024-01-10',
            priority: 'Moyenne'
        },
        {
            id: 3,
            name: 'Optimisation Base de Données',
            project: 'Refonte CRM',
            assignee: 'Lucas Bernard',
            status: 'En cours',
            deadline: '2024-01-20',
            priority: 'Haute'
        },
        {
            id: 4,
            name: 'Tests Unitaires API',
            project: 'API Gateway',
            assignee: 'Thomas Michel',
            status: 'En révision',
            deadline: '2024-01-12',
            priority: 'Moyenne'
        },
        {
            id: 5,
            name: 'Configuration CI/CD',
            project: 'API Gateway',
            assignee: 'Thomas Michel',
            status: 'Planifié',
            deadline: '2024-01-25',
            priority: 'Haute'
        },
        {
            id: 6,
            name: 'Développement Chatbot',
            project: 'Chatbot Support',
            assignee: 'Marie Martin',
            status: 'En cours',
            deadline: '2024-01-18',
            priority: 'Moyenne'
        },
        {
            id: 7,
            name: 'Analyse des Données',
            project: 'Dashboard Analytics',
            assignee: 'Sophie Dubois',
            status: 'Terminé',
            deadline: '2023-12-28',
            priority: 'Haute'
        },
        {
            id: 8,
            name: 'Module Congés',
            project: 'Module RH',
            assignee: 'Claire Lefebvre',
            status: 'Planifié',
            deadline: '2024-02-05',
            priority: 'Basse'
        }
    ]
};

// Fonctions d'affichage des données
function displayOverview() {
    // Afficher les statistiques
    document.getElementById('total-projects').textContent = reportsData.overview.stats.totalProjects;
    document.getElementById('active-devs').textContent = reportsData.overview.stats.activeDevs;
    document.getElementById('active-tasks').textContent = reportsData.overview.stats.activeTasks;
    document.getElementById('completion-rate').textContent = reportsData.overview.stats.completionRate;
    document.getElementById('avg-time').textContent = reportsData.overview.stats.avgTime;
    document.getElementById('satisfaction').textContent = reportsData.overview.stats.satisfaction;

    // Afficher les alertes
    const alertsList = document.getElementById('alerts-list');
    alertsList.innerHTML = '';
    reportsData.overview.alerts.forEach(alert => {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'flex items-start space-x-2';
        
        let iconClass = 'ri-information-line text-blue-500';
        if (alert.type === 'warning') iconClass = 'ri-alert-line text-yellow-500';
        else if (alert.type === 'success') iconClass = 'ri-checkbox-circle-line text-green-500';
        
        alertDiv.innerHTML = `
            <i class="${iconClass} mt-1"></i>
            <div>
                <p class="text-sm text-gray-700">${alert.message}</p>
                <span class="text-xs text-gray-500">${alert.date}</span>
            </div>
        `;
        alertsList.appendChild(alertDiv);
    });
}

function displayProjects() {
    const start = (projectsPage - 1) * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, reportsData.projects.length);
    const projectsData = reportsData.projects.slice(start, end);

    // Mettre à jour les compteurs
    document.getElementById('projects-start').textContent = start + 1;
    document.getElementById('projects-end').textContent = end;
    document.getElementById('projects-total').textContent = reportsData.projects.length;

    // Activer/désactiver les boutons de pagination
    document.getElementById('projects-prev').disabled = projectsPage === 1;
    document.getElementById('projects-next').disabled = end >= reportsData.projects.length;

    // Afficher les projets
    const tbody = document.querySelector('#projects-table tbody');
    tbody.innerHTML = '';
    projectsData.forEach(project => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4">
                <div class="flex items-center">
                    <div>
                        <div class="text-sm font-medium text-gray-900">${project.name}</div>
                        <div class="text-sm text-gray-500">${project.description}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(project.status)}">
                    ${project.status}
                </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">${project.lead}</td>
            <td class="px-6 py-4">
                <div class="flex items-center">
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${project.progress}%"></div>
                    </div>
                    <span class="ml-2 text-sm text-gray-600">${project.progress}%</span>
                </div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">${project.deadline}</td>
        `;
        tbody.appendChild(row);
    });
}

function displayDevelopers() {
    const start = (devsPage - 1) * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, reportsData.developers.length);
    const devsData = reportsData.developers.slice(start, end);

    // Mettre à jour les compteurs
    document.getElementById('devs-start').textContent = start + 1;
    document.getElementById('devs-end').textContent = end;
    document.getElementById('devs-total').textContent = reportsData.developers.length;

    // Activer/désactiver les boutons de pagination
    document.getElementById('devs-prev').disabled = devsPage === 1;
    document.getElementById('devs-next').disabled = end >= reportsData.developers.length;

    // Afficher les développeurs
    const tbody = document.querySelector('#developers-table tbody');
    tbody.innerHTML = '';
    devsData.forEach(dev => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900">${dev.name}</div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">${dev.speciality}</td>
            <td class="px-6 py-4 text-sm text-gray-500">${dev.projects}</td>
            <td class="px-6 py-4 text-sm text-gray-500">${dev.tasksCompleted}</td>
            <td class="px-6 py-4">
                <div class="flex items-center">
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div class="bg-green-600 h-2.5 rounded-full" style="width: ${parseInt(dev.performance)}%"></div>
                    </div>
                    <span class="ml-2 text-sm text-gray-600">${dev.performance}</span>
                </div>
            </td>
            <td class="px-6 py-4">
                <div class="flex items-center">
                    ${getRatingStars(dev.rating)}
                    <span class="ml-1 text-sm text-gray-600">${dev.rating}</span>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function displayTasks() {
    const start = (tasksPage - 1) * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, reportsData.tasks.length);
    const tasksData = reportsData.tasks.slice(start, end);

    // Mettre à jour les compteurs
    document.getElementById('tasks-start').textContent = start + 1;
    document.getElementById('tasks-end').textContent = end;
    document.getElementById('tasks-total').textContent = reportsData.tasks.length;

    // Activer/désactiver les boutons de pagination
    document.getElementById('tasks-prev').disabled = tasksPage === 1;
    document.getElementById('tasks-next').disabled = end >= reportsData.tasks.length;

    // Afficher les tâches
    const tbody = document.querySelector('#tasks-table tbody');
    tbody.innerHTML = '';
    tasksData.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900">${task.name}</div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">${task.project}</td>
            <td class="px-6 py-4 text-sm text-gray-500">${task.assignee}</td>
            <td class="px-6 py-4">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(task.status)}">
                    ${task.status}
                </span>
            </td>
            <td class="px-6 py-4">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityClass(task.priority)}">
                    ${task.priority}
                </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">${task.deadline}</td>
        `;
        tbody.appendChild(row);
    });
}

// Fonctions utilitaires
function getStatusClass(status) {
    switch (status.toLowerCase()) {
        case 'en cours':
            return 'bg-yellow-100 text-yellow-800';
        case 'terminé':
            return 'bg-green-100 text-green-800';
        case 'planifié':
            return 'bg-blue-100 text-blue-800';
        case 'en révision':
            return 'bg-purple-100 text-purple-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

function getPriorityClass(priority) {
    switch (priority.toLowerCase()) {
        case 'haute':
            return 'bg-red-100 text-red-800';
        case 'moyenne':
            return 'bg-yellow-100 text-yellow-800';
        case 'basse':
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

function getRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="ri-star-fill text-yellow-400"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="ri-star-half-fill text-yellow-400"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="ri-star-line text-yellow-400"></i>';
    }
    return stars;
}

// Gestionnaires d'événements
document.addEventListener('DOMContentLoaded', () => {
    // Afficher la vue d'ensemble par défaut
    displayOverview();

    // Navigation entre les sections
    const navButtons = document.querySelectorAll('.report-nav-btn');
    const sections = document.querySelectorAll('.report-section');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSection = btn.dataset.section;
            
            // Mettre à jour les boutons
            navButtons.forEach(b => {
                if (b === btn) {
                    b.classList.remove('bg-gray-200');
                    b.classList.add('bg-blue-600', 'text-white');
                } else {
                    b.classList.remove('bg-blue-600', 'text-white');
                    b.classList.add('bg-gray-200');
                }
            });

            // Afficher la section appropriée
            sections.forEach(section => {
                if (section.id === `${targetSection}-section`) {
                    section.classList.remove('hidden');
                    switch(targetSection) {
                        case 'overview':
                            displayOverview();
                            break;
                        case 'projects':
                            displayProjects();
                            break;
                        case 'developers':
                            displayDevelopers();
                            break;
                        case 'tasks':
                            displayTasks();
                            break;
                    }
                } else {
                    section.classList.add('hidden');
                }
            });
        });
    });

    // Pagination des projets
    document.getElementById('projects-prev').addEventListener('click', () => {
        if (projectsPage > 1) {
            projectsPage--;
            displayProjects();
        }
    });

    document.getElementById('projects-next').addEventListener('click', () => {
        if ((projectsPage * PAGE_SIZE) < reportsData.projects.length) {
            projectsPage++;
            displayProjects();
        }
    });

    // Pagination des développeurs
    document.getElementById('devs-prev').addEventListener('click', () => {
        if (devsPage > 1) {
            devsPage--;
            displayDevelopers();
        }
    });

    document.getElementById('devs-next').addEventListener('click', () => {
        if ((devsPage * PAGE_SIZE) < reportsData.developers.length) {
            devsPage++;
            displayDevelopers();
        }
    });

    // Pagination des tâches
    document.getElementById('tasks-prev').addEventListener('click', () => {
        if (tasksPage > 1) {
            tasksPage--;
            displayTasks();
        }
    });

    document.getElementById('tasks-next').addEventListener('click', () => {
        if ((tasksPage * PAGE_SIZE) < reportsData.tasks.length) {
            tasksPage++;
            displayTasks();
        }
    });

    // Menu d'export
    const exportBtn = document.getElementById('export-btn');
    const exportMenu = document.getElementById('export-menu');
    
    exportBtn.addEventListener('click', () => {
        exportMenu.classList.toggle('hidden');
    });

    // Fermer le menu d'export en cliquant ailleurs
    document.addEventListener('click', (e) => {
        if (!exportBtn.contains(e.target) && !exportMenu.contains(e.target)) {
            exportMenu.classList.add('hidden');
        }
    });

    // Options d'export
    document.querySelectorAll('.export-option').forEach(option => {
        option.addEventListener('click', () => {
            const format = option.dataset.format;
            exportReport(format);
            exportMenu.classList.add('hidden');
        });
    });
});

// Fonctions d'export
function exportReport(format) {
    switch(format) {
        case 'pdf':
            exportToPDF();
            break;
        case 'excel':
            exportToExcel();
            break;
        case 'csv':
            exportToCSV();
            break;
    }
}

function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Titre
    doc.setFontSize(20);
    doc.text('Rapport DevManager', 20, 20);
    doc.setFontSize(12);
    
    // Vue d'ensemble
    doc.text('Vue d\'ensemble', 20, 40);
    const stats = reportsData.overview.stats;
    doc.text(`Total Projets: ${stats.totalProjects}`, 30, 50);
    doc.text(`Développeurs Actifs: ${stats.activeDevs}`, 30, 60);
    doc.text(`Tâches en Cours: ${stats.activeTasks}`, 30, 70);
    
    // Projets
    doc.addPage();
    doc.text('Projets', 20, 20);
    const projectsTableData = reportsData.projects.map(p => [
        p.name,
        p.status,
        p.lead,
        `${p.progress}%`,
        p.deadline
    ]);
    doc.autoTable({
        head: [['Nom', 'État', 'Chef de Projet', 'Progression', 'Date Limite']],
        body: projectsTableData,
        startY: 30
    });
    
    // Développeurs
    doc.addPage();
    doc.text('Développeurs', 20, 20);
    const devsTableData = reportsData.developers.map(d => [
        d.name,
        d.speciality,
        d.projects.toString(),
        d.tasksCompleted.toString(),
        d.performance,
        d.rating.toString()
    ]);
    doc.autoTable({
        head: [['Nom', 'Spécialité', 'Projets', 'Tâches', 'Performance', 'Évaluation']],
        body: devsTableData,
        startY: 30
    });
    
    // Tâches
    doc.addPage();
    doc.text('Tâches', 20, 20);
    const tasksTableData = reportsData.tasks.map(t => [
        t.name,
        t.project,
        t.assignee,
        t.status,
        t.priority,
        t.deadline
    ]);
    doc.autoTable({
        head: [['Nom', 'Projet', 'Assigné à', 'État', 'Priorité', 'Date Limite']],
        body: tasksTableData,
        startY: 30
    });
    
    doc.save('rapport-devmanager.pdf');
}

function exportToExcel() {
    const wb = XLSX.utils.book_new();
    
    // Vue d'ensemble
    const overviewData = [
        ['Statistiques'],
        ['Total Projets', reportsData.overview.stats.totalProjects],
        ['Développeurs Actifs', reportsData.overview.stats.activeDevs],
        ['Tâches en Cours', reportsData.overview.stats.activeTasks],
        ['Taux de Complétion', reportsData.overview.stats.completionRate],
        ['Délai Moyen', reportsData.overview.stats.avgTime],
        ['Satisfaction', reportsData.overview.stats.satisfaction],
        [],
        ['Alertes Récentes'],
        ...reportsData.overview.alerts.map(a => [a.date, a.message])
    ];
    const wsOverview = XLSX.utils.aoa_to_sheet(overviewData);
    XLSX.utils.book_append_sheet(wb, wsOverview, "Vue d'ensemble");
    
    // Projets
    const projectsData = [
        ['Nom', 'État', 'Chef de Projet', 'Progression', 'Date Limite', 'Description'],
        ...reportsData.projects.map(p => [
            p.name,
            p.status,
            p.lead,
            `${p.progress}%`,
            p.deadline,
            p.description
        ])
    ];
    const wsProjects = XLSX.utils.aoa_to_sheet(projectsData);
    XLSX.utils.book_append_sheet(wb, wsProjects, "Projets");
    
    // Développeurs
    const devsData = [
        ['Nom', 'Spécialité', 'Projets', 'Tâches Complétées', 'Performance', 'Évaluation'],
        ...reportsData.developers.map(d => [
            d.name,
            d.speciality,
            d.projects,
            d.tasksCompleted,
            d.performance,
            d.rating
        ])
    ];
    const wsDevs = XLSX.utils.aoa_to_sheet(devsData);
    XLSX.utils.book_append_sheet(wb, wsDevs, "Développeurs");
    
    // Tâches
    const tasksData = [
        ['Tâche', 'Projet', 'Assigné à', 'État', 'Priorité', 'Date Limite'],
        ...reportsData.tasks.map(t => [
            t.name,
            t.project,
            t.assignee,
            t.status,
            t.priority,
            t.deadline
        ])
    ];
    const wsTasks = XLSX.utils.aoa_to_sheet(tasksData);
    XLSX.utils.book_append_sheet(wb, wsTasks, "Tâches");
    
    XLSX.writeFile(wb, 'rapport-devmanager.xlsx');
}

function exportToCSV() {
    // Combiner toutes les données dans un seul CSV
    const csvData = [];
    
    // En-tête de section
    csvData.push(['STATISTIQUES']);
    csvData.push(['Métrique', 'Valeur']);
    csvData.push(['Total Projets', reportsData.overview.stats.totalProjects]);
    csvData.push(['Développeurs Actifs', reportsData.overview.stats.activeDevs]);
    csvData.push(['Tâches en Cours', reportsData.overview.stats.activeTasks]);
    csvData.push(['Taux de Complétion', reportsData.overview.stats.completionRate]);
    csvData.push(['Délai Moyen', reportsData.overview.stats.avgTime]);
    csvData.push(['Satisfaction', reportsData.overview.stats.satisfaction]);
    csvData.push([]);
    
    // Alertes
    csvData.push(['ALERTES']);
    csvData.push(['Date', 'Type', 'Message']);
    reportsData.overview.alerts.forEach(a => {
        csvData.push([a.date, a.type, a.message]);
    });
    csvData.push([]);
    
    // Projets
    csvData.push(['PROJETS']);
    csvData.push(['Nom', 'État', 'Chef de Projet', 'Progression', 'Date Limite', 'Description']);
    reportsData.projects.forEach(p => {
        csvData.push([p.name, p.status, p.lead, `${p.progress}%`, p.deadline, p.description]);
    });
    csvData.push([]);
    
    // Développeurs
    csvData.push(['DÉVELOPPEURS']);
    csvData.push(['Nom', 'Spécialité', 'Projets', 'Tâches Complétées', 'Performance', 'Évaluation']);
    reportsData.developers.forEach(d => {
        csvData.push([d.name, d.speciality, d.projects, d.tasksCompleted, d.performance, d.rating]);
    });
    csvData.push([]);
    
    // Tâches
    csvData.push(['TÂCHES']);
    csvData.push(['Tâche', 'Projet', 'Assigné à', 'État', 'Priorité', 'Date Limite']);
    reportsData.tasks.forEach(t => {
        csvData.push([t.name, t.project, t.assignee, t.status, t.priority, t.deadline]);
    });
    
    // Convertir en CSV
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'rapport-devmanager.csv';
    link.click();
}
