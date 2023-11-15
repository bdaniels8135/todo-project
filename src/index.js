import './style.css';
import removeIcon from './img/close-circle.svg';
import { format } from 'date-fns';
import { buildPageElementsHtml } from './pageLoadHtmlBuilders';
import { buildLabeledDateInputHtml, buildHeaderTextHtml, buildInputHtml, wrapHtmlElements, buildIconHtml, buildTextHtml } from './htmlBuilders';
import { buildTaskTableHtml, buildTaskRowHtml } from './taskTableHtmlBuilders';
import { buildTaskForm } from './taskForm';
import { isSameDay, isPast, endOfDay, isWithinInterval, startOfDay, parseISO } from 'date-fns';
import { buildTaskList } from './taskList';
import { buildTagsList } from './tagsList';

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

function buildTaskTableElements(headerText, isUpcoming, tasksToDisplay) {
    return (() => {
        const elements = document.createDocumentFragment();
        
        const taskTableHeaderHtml = buildHeaderTextHtml(headerText, 1);
        elements.appendChild(taskTableHeaderHtml);

        const upcomingDateInputLabelText = 'Display tasks due between now and:'
        const labeledUpcomingDateInputHtml = buildLabeledDateInputHtml(upcomingDateInputLabelText);
        const upcomingDateInput = labeledUpcomingDateInputHtml.querySelector('input');
        upcomingDateInput.min = format(new Date(), 'yyyy-MM-dd');
        if (isUpcoming) elements.appendChild(labeledUpcomingDateInputHtml);

        const taskTableHtml = buildTaskTableHtml();
        tasksToDisplay.forEach(task => {
            const taskRowHtml = buildTaskRowHtml(task.title, task.shortDesc, task.dueDate);
            const taskForm = buildTaskForm(task, tagsList.getTags());
            const taskDeleteButton = taskForm.HTML.querySelector('#task-delete-btn');
            taskDeleteButton.addEventListener('click', () => {
                tasksList.deleteTask(task);
                resolveAllBtnClick();
            })
            taskRowHtml.addEventListener('click', () => {
                clearContainer(main);
                main.appendChild(taskForm.HTML);
            })
            taskTableHtml.appendChild(taskRowHtml);
        })
        elements.appendChild(taskTableHtml);

        return {
            elements,
            taskTableHtml
        }
    })()
}

function clearContainer(container) {
    container.innerHTML = ''
}

// Define button event listener functions
function resolveAllBtnClick() { 
    clearContainer(main);
    const taskTableElements = buildTaskTableElements('All Tasks', false, tasksList.getTasks());
    main.appendChild(taskTableElements.elements);
}

function resolveTodayBtnClick() {
    clearContainer(main);
    const todayTasks = tasksList.getTasks().filter(task => isSameDay(new Date(), task.dueDate));
    const taskTableElements = buildTaskTableElements('Today\'s Tasks', false, todayTasks);
    main.appendChild(taskTableElements.elements);
}

function resolveUpcomingBtnClick() {
    clearContainer(main);
    const taskTableElements = buildTaskTableElements('Upcoming Tasks', true, []);
    main.appendChild(taskTableElements.elements);
    const dateInput = document.querySelector('input[type=date]');
    dateInput.addEventListener('change', () => {
        const upcomingDate = endOfDay(parseISO(dateInput.value));
        const upcomingInterval = {start: startOfDay(new Date()), end: upcomingDate};
        const upcomingTasks = tasksList.getTasks().filter(task => isWithinInterval(task.dueDate, upcomingInterval));
        const table = main.querySelector('table');
        main.removeChild(table);
        const taskTableElements = buildTaskTableElements('Upcoming Tasks', true, upcomingTasks);
        main.appendChild(taskTableElements.taskTableHtml);
    })
}

function resolvePastDueBtnClick() {
    clearContainer(main);
    const pastDueTasks = tasksList.getTasks().filter(task => isPast(task.dueDate));
    const taskTableElements = buildTaskTableElements('Past Due Tasks', false, pastDueTasks);
    main.appendChild(taskTableElements.elements);
}

function resolveNewTaskBtnClick() {
    const newTask = tasksList.createNewTask()    
    const taskForm = buildTaskForm(newTask, tagsList.getTags());
    clearContainer(main);
    main.appendChild(taskForm.HTML);
}

// tags functions
function resolveTagBtnClick(tag) {
    clearContainer(main);
    const taggedTasks = tasksList.getTasks().filter(task => task.hasTag(tag));
    const taskTableElements = buildTaskTableElements(`${tag.text} Tasks`, false, taggedTasks);
    main.appendChild(taskTableElements.elements);
}

function buildTagNavListItemHtml(text) {
    const tagNavListItemTextHtml = buildTextHtml(text);
    const tagNavListItemIconHtml = buildIconHtml(removeIcon);
    const tagNavListItemHtml = wrapHtmlElements('li', tagNavListItemTextHtml, tagNavListItemIconHtml)

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
            updateTagsNavList()
        }
    BUTTONS.newTagBtn.addEventListener('click', resolveNewTagBtnClick);
}

function resolveNewTagBtnClick() {
    BUTTONS.newTagBtn.removeEventListener('click', resolveNewTagBtnClick);
    const tagNavNewTagInput = buildInputHtml('text');
    tagNavNewTagInput.maxLength = 15;
    tagNavNewTagInput.addEventListener('focusout', event => { resolveTagNavNewTagInput(event) })
    tagNavNewTagInput.addEventListener('keypress', event => { if (event.key === 'Enter') resolveTagNavNewTagInput(event) })
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