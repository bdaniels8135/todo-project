import allIcon from './img/inbox.svg';
import todayIcon from './img/calendar-today.svg';
import upcomingIcon from './img/calendar-search.svg';
import pastDueIcon from './img/exclamation-thick.svg';
import plusIcon from './img/plus-thick.svg';
import { wrapHtmlElements, buildHeaderTextHtml, buildIconHtml, buildTextHtml } from './htmlBuilders';

const PAGE_HEADER_TEXT = 'Task-ticle'
const PAGE_SUBHEADER_TEXT = 'How <em>you</em> TO-DOin\'?';
const TASKS_NAV_HEADER_TEXT = 'Tasks';
const NEW_TASK_ICON = plusIcon;
const TAGS_NAV_HEADER_TEXT = 'Tags';
const NEW_TAG_ICON = plusIcon;
const TASK_NAV_ITEM_ICON_TEXT_PAIRS = [
    {
        icon: allIcon,
        text: 'All',
    },
    {
        icon: todayIcon,
        text: 'Today',
    },
    {
        icon: upcomingIcon,
        text: 'Upcoming',
    },
    {
        icon: pastDueIcon,
        text: 'Past Due',
    },
];

function buildPageHeaderHtml(){   
    const headerTextHtml = buildHeaderTextHtml(PAGE_HEADER_TEXT, 1); 
    const subheaderTextHtml = buildHeaderTextHtml(PAGE_SUBHEADER_TEXT, 2);
    const pageHeaderHtml = wrapHtmlElements('header', headerTextHtml, subheaderTextHtml);

    return pageHeaderHtml;
}

function buildNavHeaderHtml(navHeaderText, newItemIcon, btnId) {
    const navHeaderTextHtml = buildHeaderTextHtml(navHeaderText, 1);
    const newItemIconHtml = buildIconHtml(newItemIcon);
    newItemIconHtml.id = btnId;
    const navHeaderHtml = wrapHtmlElements('div', navHeaderTextHtml, newItemIconHtml);
    
    return navHeaderHtml;
}

function buildTasksNavListItemHtml(icon, text) {
    const tasksNavItemIcon = buildIconHtml(icon);
    const tasksNavItemText = buildTextHtml(text);
    const tasksNavListItemHtml = wrapHtmlElements('li', tasksNavItemIcon, tasksNavItemText);

    return tasksNavListItemHtml;
}

function buildTasksNavListHtml() {
    const tasksNavListItems = []; 
    for (let pair of TASK_NAV_ITEM_ICON_TEXT_PAIRS) {
        const tasksNavListItemHtml = buildTasksNavListItemHtml(pair.icon, pair.text);
        tasksNavListItemHtml.id = `${pair.text.toLowerCase().replace(' ', '-')}-btn`;
        tasksNavListItems.push(tasksNavListItemHtml);
    }
    const tasksNavListHtml = wrapHtmlElements('ul', ...tasksNavListItems);

    return tasksNavListHtml;
}

function buildTasksNavHtml() {
    const newTaskBtnId = 'new-task-btn';
    const tasksNavHeaderHtml = buildNavHeaderHtml(TASKS_NAV_HEADER_TEXT, NEW_TASK_ICON, newTaskBtnId);
    const tasksNavListHtml = buildTasksNavListHtml();
    const tasksNavHtml = wrapHtmlElements('nav', tasksNavHeaderHtml, tasksNavListHtml);
    tasksNavHtml.id = 'task-nav';

    return tasksNavHtml;
}

function buildTagsNavHtml() {
    const newTagBtnId = 'new-tag-btn';
    const tagsNavHeaderHtml = buildNavHeaderHtml(TAGS_NAV_HEADER_TEXT, NEW_TAG_ICON, newTagBtnId);
    const tagsNavListHtml = document.createElement('ul');
    const tagsNavHtml = wrapHtmlElements('nav', tagsNavHeaderHtml, tagsNavListHtml);
    tagsNavHtml.id = 'tags-nav';

    return tagsNavHtml;
}

function buildSidebarHtml() {
    const tasksNavHtml = buildTasksNavHtml();
    const tagsNavHtml = buildTagsNavHtml();
    const sidebarHtml = wrapHtmlElements('aside', tasksNavHtml, tagsNavHtml);

    return sidebarHtml;
}

export function buildPageElementsHtml() {
    const fragmentHtml = document.createDocumentFragment();
    const pageHeaderHtml = buildPageHeaderHtml();
    const sidebarHtml = buildSidebarHtml();
    const mainHtml = document.createElement('main');
    fragmentHtml.append(pageHeaderHtml, sidebarHtml, mainHtml);

    return fragmentHtml;
}