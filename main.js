// Navigation Toggle
const navigation = document.getElementById('navigation');
const iconBar = document.getElementById('iconBar');
const closeIcon = document.getElementById('close-icon');

function toggleNavigation() {
    navigation.classList.toggle('hide');
    iconBar.style.display = navigation.classList.contains('hide') ? 'block' : 'none';
}

iconBar?.addEventListener('click', toggleNavigation);
closeIcon?.addEventListener('click', toggleNavigation);

// Comment & Reply System
function toggleElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.toggle('hide');
    }
}

// Enhanced Comment/Reply Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Handle comment submission
    const commentForms = document.querySelectorAll('.comment-area');
    commentForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const textarea = form.querySelector('textarea');
            if (textarea.value.trim()) {
                // Here you would typically send the comment to a server
                console.log('Comment submitted:', textarea.value);
                textarea.value = '';
                form.classList.add('hide');
            }
        });
    });

    // Search functionality
    const searchForm = document.querySelector('.search-box');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchInput = searchForm.querySelector('input[type="text"]');
            const searchSelect = searchForm.querySelector('select');
            console.log('Search:', {
                term: searchInput.value,
                category: searchSelect.value
            });
        });
    }
});

// Responsive table handling
function makeTablesResponsive() {
    const tables = document.querySelectorAll('.posts-table');
    tables.forEach(table => {
        const wrapper = document.createElement('div');
        wrapper.style.overflowX = 'auto';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });
}

// Initialize responsive features
document.addEventListener('DOMContentLoaded', () => {
    makeTablesResponsive();
});

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});