import allIcon from './img/inbox.svg';
import todayIcon from './img/calendar-today.svg';
import upcomingIcon from './img/calendar-search.svg';
import pastDueIcon from './img/exclamation-thick.svg';
import plusIcon from './img/plus-thick.svg';

function buildHeaderTextHtml(headerText, headerLevel) {
    const headerTextHtml = document.createElement(`h${headerLevel}`);
    headerTextHtml.innerHTML = headerText;

    return headerTextHtml;
}

function buildPageHeaderHtml(headerText, subheaderText){
    const pageHeaderHtml = document.createElement('header');
    
    const headerTextHtml = buildHeaderTextHtml(headerText, 1);
    pageHeaderHtml.appendChild(headerTextHtml);
    
    const subheaderTextHtml = buildHeaderTextHtml(subheaderText, 2);
    pageHeaderHtml.appendChild(subheaderTextHtml);
    
    return pageHeaderHtml;
}

function buildNavHtml() {
    
}

function buildListHtml(isOrdered) {
    const listType = isOrdered ? 'ol' : 'ul';
    const listHtml = document.createElement(listType);

    return listHtml;
}


function buildTaskNavHtml() {
    const taskNav = document.createElement('ul');
    taskNav.id = 'task-nav';

    const taskNavHeaderContainer = document.createElement('div');
    taskNav.appendChild(taskNavHeaderContainer);

    const taskNavHeaderText = document.createElement('h1');
    taskNavHeaderText.innerText = 'Tasks';
    taskNavHeaderContainer.appendChild(taskNavHeaderText);

    const newTaskIcon = document.createElement('img');
    newTaskIcon.src = plusIcon;
    newTaskIcon.id = 'new-task-btn';
    taskNavHeaderContainer.appendChild(newTaskIcon);

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
            label: 'Past Due',
            icon: pastDueIcon,
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

    return taskNav;
}

function buildTagsNavHtml() {
    const tagsNav = document.createElement('ul');
    tagsNav.id = 'tags-nav';

    const tagsNavHeaderContainer = document.createElement('div');
    tagsNav.appendChild(tagsNavHeaderContainer);

    const tagsNavHeaderText = document.createElement('h1');
    tagsNavHeaderText.innerText = 'Tags';
    tagsNavHeaderContainer.appendChild(tagsNavHeaderText);

    const newTagIcon = document.createElement('img');
    newTagIcon.src = plusIcon;
    newTagIcon.id = 'new-tag-btn';
    tagsNavHeaderContainer.appendChild(newTagIcon);

    return tagsNav;
}

function buildSidebarHtml() {
    const sidebar = document.createElement('aside');
    sidebar.appendChild(buildTaskNavHtml());
    sidebar.appendChild(buildTagsNavHtml());

    return sidebar;
}

export function buildPageHtml() {
    const fragment = document.createDocumentFragment();
    const headerText = 'Task-ticle'
    const subheaderText = 'How <em>you</em> TO-DOin\'?';
    const pageHeader = buildPageHeaderHtml(headerText, subheaderText);
    fragment.appendChild(pageHeader);
    const sidebar = buildSidebarHtml();
    fragment.appendChild(sidebar);
    const main = document.createElement('main');
    fragment.appendChild(main);

    return fragment;
}