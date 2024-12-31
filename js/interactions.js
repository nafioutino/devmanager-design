// Gestion des modales
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Gestionnaire de notifications
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="ri-${type === 'success' ? 'check' : 'error'}-line mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Gestion du menu mobile
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

// Filtres de recherche
function filterTable(inputId, tableId) {
    const input = document.getElementById(inputId);
    const filter = input.value.toLowerCase();
    const table = document.getElementById(tableId);
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let found = false;
        
        for (let j = 0; j < cells.length; j++) {
            const cell = cells[j];
            if (cell) {
                const text = cell.textContent || cell.innerText;
                if (text.toLowerCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }
        }
        
        rows[i].style.display = found ? '' : 'none';
    }
}

// Export de données
function exportData(format) {
    // Simulation d'export
    showNotification(`Export en ${format} en cours...`);
    
    setTimeout(() => {
        showNotification('Export terminé avec succès !');
    }, 2000);
}

// Gestion des graphiques
function updateCharts() {
    const charts = document.querySelectorAll('[data-chart]');
    
    charts.forEach(chart => {
        const ctx = chart.getContext('2d');
        const type = chart.dataset.chart;
        const data = JSON.parse(chart.dataset.values);
        
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

// Gestion du drag and drop
function initDragAndDrop() {
    const draggables = document.querySelectorAll('.task-card');
    const containers = document.querySelectorAll('.kanban-column');

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
            const afterElement = getDragAfterElement(container, e.clientY);
            
            if (afterElement) {
                container.insertBefore(draggable, afterElement);
            } else {
                container.appendChild(draggable);
            }
        });
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.task-card:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser les événements de modal
    document.querySelectorAll('[data-modal-target]').forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.dataset.modalTarget;
            openModal(modalId);
        });
    });

    document.querySelectorAll('[data-modal-close]').forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.dataset.modalClose;
            closeModal(modalId);
        });
    });

    // Initialiser le menu mobile
    const menuButton = document.querySelector('#mobile-menu-button');
    if (menuButton) {
        menuButton.addEventListener('click', toggleMobileMenu);
    }

    // Initialiser les filtres de recherche
    const searchInputs = document.querySelectorAll('[data-search-table]');
    searchInputs.forEach(input => {
        input.addEventListener('keyup', () => {
            filterTable(input.id, input.dataset.searchTable);
        });
    });

    // Initialiser les boutons d'export
    document.querySelectorAll('[data-export]').forEach(button => {
        button.addEventListener('click', () => {
            exportData(button.dataset.export);
        });
    });

    // Initialiser les graphiques
    updateCharts();

    // Initialiser le drag and drop
    initDragAndDrop();
});
