const body = document.querySelector('body')

// Add Header
const header = document.createElement('header');
body.appendChild(header);

const headerText = document.createElement('h1');
headerText.innerText = 'Task-ticle';
header.appendChild(headerText);


// Add a sidebar
const sidebar = document.createElement('aside');
body.appendChild(sidebar);

// Include filters nav
const filterNav = document.createElement('ul');
filterNav.id = 'filter-nav';
sidebar.appendChild(filterNav);

const filterNavHeader = document.createElement('h1');
filterNavHeader.innerText = 'Tasks by Date';
filterNav.appendChild(filterNavHeader);

const filterLabels = ['Today', 'This Week', 'This Month', 'Important'];
for (let text of filterLabels) {
    const newItem = document.createElement('li');
    newItem.innerText = text;
    newItem.id = `${text.toLowerCase().replace(' ', '-')}-btn`;
    filterNav.appendChild(newItem);
}

// Include projects nav
const projectsNav = document.createElement('ul');
projectsNav.id = 'projects-nav';
sidebar.appendChild(projectsNav);

const projectsHeader = document.createElement('h1');
projectsHeader.innerText = 'Tasks by Project';
projectsNav.appendChild(projectsHeader);

// Include Main element
const main = document.createElement('main');
main.innerText = 'Main Content'
body.appendChild(main);
