import './style.css';
import removeIcon from './img/close-circle.svg';
import { buildPageElementsHtml } from './pageLoadHtmlBuilders';
import { buildInputHtml, wrapHtmlElements, buildIconHtml, buildTextHtml } from './htmlBuilders';
import { buildTaskForm } from './taskForm';
import { isSameDay, isPast, endOfDay, isWithinInterval, startOfDay, parseISO } from 'date-fns';
import { buildTaskList } from './taskList';
import { buildTagsList } from './tagsList';
import { buildTaskTable } from './taskTable';

const DEFAULT_TAG_STRINGS = ['Important'];

const body = document.querySelector('body');
const pageHtml = buildPageElementsHtml();
body.appendChild(pageHtml);

const tasksList = buildTaskList();
const tagsList = buildTagsList(DEFAULT_TAG_STRINGS);

const tagsNav = document.querySelector('#tags-nav');
const tagsNavList = tagsNav.querySelector('ul');
populateTagsNavList();

const main = document.querySelector('main');

const BUTTONS = {
    allBtn: document.getElementById('all-btn'),
    todayBtn: document.getElementById('today-btn'),
    upcomingBtn: document.getElementById('upcoming-btn'),
    pastDueBtn: document.getElementById('past-due-btn'),
    newTaskBtn: document.getElementById('new-task-btn'),
    newTagBtn: document.getElementById('new-tag-btn'),
}

function clearContainer(container) {
    container.innerHTML = ''
}

// Define button event listener functions
function resolveAllBtnClick() { 
    clearContainer(main);
    const taskTable = buildTaskTable('All Tasks', false, tagsList);
    taskTable.appendTasks(tasksList.getTasks());
    main.appendChild(taskTable.HTML);
}

function resolveTodayBtnClick() {
    clearContainer(main);
    const todayTasks = tasksList.getTasks().filter(task => isSameDay(new Date(), task.dueDate));
    const taskTable = buildTaskTable('Today\'s Tasks', false, tagsList);
    taskTable.appendTasks(todayTasks);
    main.appendChild(taskTable.HTML);
}

function resolveUpcomingBtnClick() {
    clearContainer(main);
    const taskTable = buildTaskTable('Upcoming Tasks', true, tagsList);
    main.appendChild(taskTable.HTML);
    const dateInput = document.querySelector('input[type=date]');
    dateInput.addEventListener('change', () => {
        const startingDate = startOfDay(new Date());
        const upcomingDate = endOfDay(parseISO(dateInput.value));
        const upcomingInterval = {start: startingDate, end: upcomingDate};
        const upcomingTasks = tasksList.getTasks().filter(task => isWithinInterval(task.dueDate, upcomingInterval));
        taskTable.appendTasks(upcomingTasks);
    })
}

function resolvePastDueBtnClick() {
    clearContainer(main);
    const pastDueTasks = tasksList.getTasks().filter(task => isPast(task.dueDate));
    const taskTable = buildTaskTable('Past Due Tasks', false, tagsList);
    taskTable.appendTasks(pastDueTasks);
    main.appendChild(taskTable.HTML);
}

function resolveNewTaskBtnClick() {
    const newTask = tasksList.createNewTask()    
    const taskForm = buildTaskForm(newTask, tagsList);
    clearContainer(main);
    main.appendChild(taskForm.HTML);
}

// tags functions
function resolveTagBtnClick(tag) {
    clearContainer(main);
    const taggedTasks = tasksList.getTasks().filter(task => task.hasTag(tag));
    const taskTable = buildTaskTable(`${tag.text} Tasks`, false, tagsList);
    taskTable.appendTasks(taggedTasks);
    main.appendChild(taskTable.HTML);
}

function buildTagNavListItemHtml(text) {
    const tagNavListItemTextHtml = buildTextHtml(text);
    const tagNavListItemIconHtml = buildIconHtml(removeIcon);
    const tagNavListItemHtml = wrapHtmlElements('li', tagNavListItemTextHtml, tagNavListItemIconHtml);

    return tagNavListItemHtml;
}

function appendTagItem(tag) {
    const tagNavListItemHtml = buildTagNavListItemHtml(tag.text);
    tagNavListItemHtml.addEventListener('click', () => { resolveTagBtnClick(tag) });
    tagsNavList.appendChild(tagNavListItemHtml);
}

function populateTagsNavList() {
    tagsList.getTags().forEach(tag => { appendTagItem(tag) });
}

function updateTagsNavList() {
    clearContainer(tagsNavList);
    populateTagsNavList();
}

function resolveTagNavNewTagInput(event) {
    const trimmedInputValue = event.target.value.trim();
        if (trimmedInputValue) {
            tagsList.createNewTag(trimmedInputValue);
        }
    updateTagsNavList();
    BUTTONS.newTagBtn.addEventListener('click', resolveNewTagBtnClick);
}

function resolveNewTagBtnClick() {
    BUTTONS.newTagBtn.removeEventListener('click', resolveNewTagBtnClick);
    const tagNavNewTagInput = buildInputHtml('text');
    tagNavNewTagInput.maxLength = 15;
    tagNavNewTagInput.addEventListener('focusout', event => { resolveTagNavNewTagInput(event) });
    tagNavNewTagInput.addEventListener('keypress', event => { if (event.key === 'Enter') resolveTagNavNewTagInput(event) });
    tagsNavList.appendChild(tagNavNewTagInput);
    tagNavNewTagInput.focus();
}

// Add button event listeners
BUTTONS.allBtn.addEventListener('click', resolveAllBtnClick);
BUTTONS.todayBtn.addEventListener('click', resolveTodayBtnClick);
BUTTONS.upcomingBtn.addEventListener('click', resolveUpcomingBtnClick);
BUTTONS.pastDueBtn.addEventListener('click', resolvePastDueBtnClick);
BUTTONS.newTaskBtn.addEventListener('click', resolveNewTaskBtnClick);
BUTTONS.newTagBtn.addEventListener('click', resolveNewTagBtnClick);

// Initialize the page
resolveAllBtnClick();