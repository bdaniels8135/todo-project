import { wrapHtmlElements, buildHeaderTextHtml, buildIconHtml } from './htmlBuilders';


function buildPageHeaderHtml(headerText, subheaderText){   
    const headerTextHtml = buildHeaderTextHtml(headerText, 1); 
    const subheaderTextHtml = buildHeaderTextHtml(subheaderText, 2);
    const wrapperType = 'header';
    const pageHeaderHtml = wrapHtmlElements(wrapperType, headerTextHtml, subheaderTextHtml);

    return pageHeaderHtml;
}

function buildNavHeaderHtml(navHeaderText, newItemIcon, btnId) {
    const navHeaderTextHtml = buildHeaderTextHtml(navHeaderText, 1);
  
    const newItemIconHtml = buildIconHtml(newItemIcon);
    newItemIconHtml.id = btnId;

    const wrapperType = 'div';
    const navHeaderHtml = wrapHtmlElements(wrapperType, navHeaderTextHtml, newItemIconHtml);
    
    return navHeaderHtml;
}

function buildTasksNavListItemHtml(icon, text) {
    const tasksNavItemIcon = document.createElement('img');
    tasksNavItemIcon.src = icon;
    
    const tasksNavItemText = document.createElement('p');
    tasksNavItemText.innerText = text;

    const wrapperType = 'li';
    const tasksNavListItemHtml = wrapHtmlElements(wrapperType, tasksNavItemIcon, tasksNavItemText);

    return tasksNavListItemHtml;
}

function buildTasksNavListHtml(tasksNavItemIconTextPairs) {
    const tasksNavListItems = []; 
    for (let pair of tasksNavItemIconTextPairs) {
        const tasksNavListItemHtml = buildTasksNavListItemHtml(pair.icon, pair.text);
        tasksNavListItemHtml.id = `${pair.text.toLowerCase().replace(' ', '-')}-btn`;
        tasksNavListItems.push(tasksNavListItemHtml);
    }

    const wrapperType = 'ul'
    const tasksNavListHtml = wrapHtmlElements(wrapperType, ...tasksNavListItems);

    return tasksNavListHtml;
}

function buildTasksNavHtml(tasksNavHeaderText, newTaskIcon, tasksNavItemIconTextPairs) {
    const newTaskBtnId = 'new-task-btn'
    const tasksNavHeaderHtml = buildNavHeaderHtml(tasksNavHeaderText, newTaskIcon, newTaskBtnId);
    const tasksNavListHtml = buildTasksNavListHtml(tasksNavItemIconTextPairs);

    const wrapperType = 'nav';
    const tasksNavHtml = wrapHtmlElements(wrapperType, tasksNavHeaderHtml, tasksNavListHtml);
    tasksNavHtml.id = 'task-nav'

    return tasksNavHtml;
}

function buildTagsNavHtml(tagNaveHeaderText, newTagIcon) {
    const newTagBtnId = 'new-tag-btn';
    const tagsNavHeaderHtml = buildNavHeaderHtml(tagNaveHeaderText, newTagIcon, newTagBtnId);
    const tagsNavListHtml = document.createElement('ul');

    const wrapperType = 'nav';
    const tagsNavHtml = wrapHtmlElements(wrapperType, tagsNavHeaderHtml, tagsNavListHtml);
    tagsNavHtml.id = 'tags-nav';

    return tagsNavHtml;
}

function buildSidebarHtml(tasksNavHeaderText, newTaskIcon, tasksNavItemIconTextPairs, tagsNavHeaderText, newTagIcon) {
    const tasksNavHtml = buildTasksNavHtml(tasksNavHeaderText, newTaskIcon, tasksNavItemIconTextPairs);
    const tagsNavHtml = buildTagsNavHtml(tagsNavHeaderText, newTagIcon);
    const wrapperType = 'aside'
    const sidebarHtml = wrapHtmlElements(wrapperType, tasksNavHtml, tagsNavHtml)

    return sidebarHtml;
}

export function buildPageHtml(pageHeaderText, pageSubheaderText, tasksNavItemIconTextPairs, tasksNavHeaderText, newTaskIcon, tagsNavHeaderText, newTagIcon) {
    
    const fragmentHtml = document.createDocumentFragment();
    const pageHeaderHtml = buildPageHeaderHtml(pageHeaderText, pageSubheaderText);
    const sidebarHtml = buildSidebarHtml(tasksNavHeaderText, newTaskIcon, tasksNavItemIconTextPairs, tagsNavHeaderText, newTagIcon);
    const mainHtml = document.createElement('main');

    fragmentHtml.append(pageHeaderHtml, sidebarHtml, mainHtml);

    return fragmentHtml;
}