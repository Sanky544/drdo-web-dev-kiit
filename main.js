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
let departments = [
    { name: 'प्रशासन/Admin' },
    { name: 'सीजीएचएस/CGHS' },
    { name: 'सीएसडी कैन्टीन / CSD Canteen' },
    { name: 'वित्त / Finance' },
    { name: 'एचआरडी / HRD' },
    { name: 'सूचना प्रौद्योगिकी समूह / Information Technology Group' },
    { name: 'यंत्रण विज्ञान / Instrumentation' },
    { name: 'पुस्तकालय / Library' },
    { name: 'मास्क फैकल्टी / Mask Faculty' },
    { name: 'क्यूएमएस समूह / QMS Group' },
    { name: 'ठोस अवस्था भौतिकी प्रयोगशाला / Solid State Physics Laboratory' },
    { name: 'सुरक्षा / Security' },
    { name: 'तकनीकी सचिवालय / Technical Secretariat' },
    { name: 'वेट कैन्टीन / Wet Canteen' },
    { name: 'वर्क्स सेक्शन / Works Section' }
];

// Function to show suggestions as you type
function showSuggestions() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let suggestionsList = document.getElementById('suggestionsList');
    
    // Clear the previous suggestions
    suggestionsList.innerHTML = '';
    
    // If input is not empty, show suggestions
    if (input) {
        let filteredDepartments = departments.filter(department => department.name.toLowerCase().includes(input));
        
        // Show suggestions if there are any matches
        if (filteredDepartments.length > 0) {
            suggestionsList.style.display = 'block';  // Show the dropdown
            filteredDepartments.forEach(department => {
                let li = document.createElement('li');
                li.textContent = department.name;
                li.onclick = function() {
                    document.getElementById('searchInput').value = department.name;  // Set the selected department
                    suggestionsList.style.display = 'none';  // Hide suggestions after selection
                };
                suggestionsList.appendChild(li);
            });
        } else {
            suggestionsList.style.display = 'none';  // Hide if no matches
        }
    } else {
        suggestionsList.style.display = 'none';  // Hide if input is empty
    }
}

// Function for search (this is where you would trigger your actual search)
function searchDepartment() {
    var searchInput = document.getElementById("searchInput").value;
    if (searchInput.trim() !== "") {
        // Redirect to posts.html with the search query as a URL parameter
        window.location.href = "./posts.html?q=" + encodeURIComponent(searchInput);
    } else {
        alert("Please enter a department to search.");
    }
}
// Show the comment box when the "Reply" button is clicked
function showComment() {
    const commentBox = document.getElementById("comment-box");
    commentBox.style.display = commentBox.style.display === "none" ? "block" : "none";
}

// Function to add emojis to the textarea when an emoji button is clicked
function addEmoji(emoji) {
    const textarea = document.querySelector(".comment-textarea");
    textarea.value += emoji;  // Append the emoji to the textarea
}

// Submit the reply (you can extend this with actual submission logic)
function submitReply() {
    const textarea = document.querySelector(".comment-textarea");
    const replyText = textarea.value.trim();

    if (replyText !== "") {
        // You can handle the submission logic here (e.g., sending it to a server)
        alert("Your reply has been submitted: " + replyText);
        
        // Clear the textarea after submission
        textarea.value = "";
        document.getElementById("comment-box").style.display = "none";  // Hide the comment box again
    } else {
        alert("Please type a reply before submitting.");
    }
}
// main.js

// Sorting functionality
function sortTable(column, isNumeric = false) {
    const tableRows = Array.from(document.querySelectorAll('.table-row'));
    const postsTable = document.querySelector('.posts-table');
    
    const sortedRows = tableRows.sort((a, b) => {
        const aValue = a.querySelector(`.${column}`).innerText.trim();
        const bValue = b.querySelector(`.${column}`).innerText.trim();

        if (isNumeric) {
            return parseInt(aValue.replace(/\D/g, '')) - parseInt(bValue.replace(/\D/g, ''));
        }
        return aValue.localeCompare(bValue);
    });

    // Append sorted rows back to the table
    sortedRows.forEach(row => postsTable.appendChild(row));
}

// Attach click events for sorting
document.querySelector('.views').addEventListener('click', () => sortTable('views', true));
document.querySelector('.reply').addEventListener('click', () => sortTable('reply', true));

// Filtering functionality
document.querySelector('.search-box input').addEventListener('input', (event) => {
    const filterText = event.target.value.toLowerCase();
    const tableRows = document.querySelectorAll('.table-row');

    tableRows.forEach(row => {
        const topic = row.querySelector('.subjects').innerText.toLowerCase();
        if (topic.includes(filterText)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const postsPerPage = 10;
    const tableRows = Array.from(document.querySelectorAll('.table-row'));
    const paginationContainer = document.querySelector('.pagination');
    const totalPages = Math.ceil(tableRows.length / postsPerPage);

    // Function to display posts for a specific page
    function displayPage(pageNumber) {
        // Hide all rows
        tableRows.forEach(row => row.style.display = 'none');

        // Calculate the start and end index for the posts to display
        const startIndex = (pageNumber - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;

        // Show only the rows for the current page
        for (let i = startIndex; i < endIndex && i < tableRows.length; i++) {
            tableRows[i].style.display = 'flex'; // Adjust to match your row layout (e.g., flex or block)
        }

        // Update active page styling
        document.querySelectorAll('.page-number').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`.page-number[data-page="${pageNumber}"]`).classList.add('active');
    }

    // Function to create pagination links
    function createPagination() {
        // Clear existing links
        paginationContainer.innerHTML = '';

        // Create "Prev" button
        const prevButton = document.createElement('a');
        prevButton.href = '#';
        prevButton.className = 'prev';
        prevButton.textContent = 'Prev';
        prevButton.addEventListener('click', () => {
            const currentPage = parseInt(document.querySelector('.page-number.active').dataset.page);
            if (currentPage > 1) {
                displayPage(currentPage - 1);
            }
        });
        paginationContainer.appendChild(prevButton);

        // Create page number links
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.className = 'page-number';
            pageLink.dataset.page = i;
            pageLink.textContent = i;
            pageLink.addEventListener('click', () => {
                displayPage(i);
            });
            paginationContainer.appendChild(pageLink);
        }

        // Create "Next" button
        const nextButton = document.createElement('a');
        nextButton.href = '#';
        nextButton.className = 'next';
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', () => {
            const currentPage = parseInt(document.querySelector('.page-number.active').dataset.page);
            if (currentPage < totalPages) {
                displayPage(currentPage + 1);
            }
        });
        paginationContainer.appendChild(nextButton);
    }

    // Initialize pagination and display the first page
    createPagination();
    displayPage(1);
});
document.querySelectorAll('.table-row .subjects a').forEach(link => {
    const row = link.parentElement.parentElement;

    // Check localStorage for read status
    if (localStorage.getItem(link.href)) {
        row.classList.add('read');
    }

    link.addEventListener('click', () => {
        // Mark the row as read
        row.classList.add('read');

        // Store read status in localStorage
        localStorage.setItem(link.href, 'read');
    });
});

