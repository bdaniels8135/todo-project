import allIcon from './img/inbox.svg'
import todayIcon from './img/calendar-today.svg'
import upcomingIcon from './img/calendar-search.svg'
import importantIcon from './img/star.svg'
import plusIcon from './img/plus-thick.svg'

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

// Include tasks nav
const taskNav = document.createElement('ul');
taskNav.id = 'task-nav';
sidebar.appendChild(taskNav);

const taskNavHeader = document.createElement('h1');
taskNavHeader.innerText = 'Tasks';
taskNav.appendChild(taskNavHeader);

const taskLabelIconPairs = [
    {
        label: 'All',
        icon: allIcon,
    },
    {
        label: 'Today',
        icon: todayIcon,
    },
    {
        label: 'Upcoming',
        icon: upcomingIcon,
    },
    {
        label: 'Important',
        icon: importantIcon,
    },
];

for (let pair of taskLabelIconPairs) {
    const newItem = document.createElement('li');
    newItem.id = `${pair.label.toLowerCase().replace(' ', '-')}-btn`;
    taskNav.appendChild(newItem);

    const newItemIcon = document.createElement('img');
    newItemIcon.src = pair.icon;
    newItem.appendChild(newItemIcon);
    
    const newItemText = document.createElement('p');
    newItemText.innerText = pair.label;
    newItem.appendChild(newItemText);
    
}

// Include projects nav
const projectsNav = document.createElement('ul');
projectsNav.id = 'projects-nav';
sidebar.appendChild(projectsNav);

const projectsHeader = document.createElement('h1');
projectsHeader.innerText = 'Projects';
projectsNav.appendChild(projectsHeader);

// Add new project button
const newProjectBtn = document.createElement('li');
newProjectBtn.id = 'new-project-btn';
projectsNav.appendChild(newProjectBtn);

const newProjectBtnIcon = document.createElement('img');
newProjectBtnIcon.src = plusIcon;
newProjectBtn.appendChild(newProjectBtnIcon);

const newProjectBtnText = document.createElement('p');
newProjectBtnText.innerText = 'New Project';
newProjectBtn.appendChild(newProjectBtnText);


// Include Main element
const main = document.createElement('main');
main.innerText = 'Main Content'
body.appendChild(main);
