import './style/index.css';
import './style/header.css';
import './style/sidebar.css';
import './style/taskTable.css';
import './style/taskForm.css';
import './style/confirmationModal.css';
import { buildPageElementsHtml } from './pageLoadHtmlBuilders';
import { buildTaskList } from './taskList';
import { buildTagsList } from './tagsList';
import { buildTaskTable } from './taskTable';
import { buildTaskForm } from './taskForm';
import { buildTagsNavList } from './tagsNavList';
import { buildInputHtml } from './htmlBuilders';
import { isSameDay, isPast, endOfDay, isWithinInterval, startOfDay, parseISO } from 'date-fns';
import { buildDeleteConfirmationModalHtml } from './deleteConfirmationModal';

const DEFAULT_TAG_STRINGS = ['Important'];

const BODY = document.querySelector('body');
const pageHtml = buildPageElementsHtml();
BODY.appendChild(pageHtml);

const TASKS_LIST = buildTaskList();
const TAGS_LIST = buildTagsList(DEFAULT_TAG_STRINGS);

const MAIN = document.querySelector('main');

const TAGS_NAV = document.querySelector('#tags-nav');
const TAGS_NAV_LIST = buildTagsNavList(TAGS_NAV, TAGS_LIST);
TAGS_NAV_LIST.updateTagsNavList();

const BUTTONS = {
    allBtn: document.getElementById('all-btn'),
    todayBtn: document.getElementById('today-btn'),
    upcomingBtn: document.getElementById('upcoming-btn'),
    pastDueBtn: document.getElementById('past-due-btn'),
    completedBtn: document.getElementById('completed-btn'),
    saveTasksBtn: document.getElementById('tasks-save-btn'),
    newTaskBtn: document.getElementById('new-task-btn'),
    newTagBtn: document.getElementById('new-tag-btn'),
}

const TASK_DELETE_MODAL_CONFIRMATION_MESSAGE = 'Are you sure you want to permanently delete this task?';

export function clearContainer(container) {
    container.innerHTML = '';
}

export function displayDeleteConfirmationModal(objectDesc, object, deleteFn) {
    const deleteConfirmationModalHtml = buildDeleteConfirmationModalHtml(objectDesc);
    const deleteConfirmationModalDeleteBtn = deleteConfirmationModalHtml.querySelector('#modal-delete-btn');
    deleteConfirmationModalDeleteBtn.addEventListener('click', () => {
        deleteFn(object);
        deleteConfirmationModalHtml.close();
    })
    const deleteConfirmationModalCancelBtn = deleteConfirmationModalHtml.querySelector('#modal-cancel-btn');
    deleteConfirmationModalCancelBtn.addEventListener('click', () => {
        deleteConfirmationModalHtml.close();
    })
    MAIN.appendChild(deleteConfirmationModalHtml)
    deleteConfirmationModalHtml.showModal();
}

export function displayTaskForm(task) {
    const taskForm = buildTaskForm(task, TAGS_LIST);
    const taskDeleteButton = taskForm.HTML.querySelector('#task-delete-btn');
    taskDeleteButton.addEventListener('click', () => { displayDeleteConfirmationModal(TASK_DELETE_MODAL_CONFIRMATION_MESSAGE, task, removeTask) });
    clearContainer(MAIN);
    MAIN.appendChild(taskForm.HTML);
}

function displayTasksTable(headerText, isUpcoming, tasksToDisplay) {
    clearContainer(MAIN);
    const taskTable = buildTaskTable(headerText, isUpcoming);
    taskTable.displayTasks(tasksToDisplay);
    MAIN.appendChild(taskTable.HTML);

    return taskTable;
}

function resolveAllBtnClick() { 
    const allTasks = TASKS_LIST.getTasks();
    displayTasksTable('All Tasks', false, allTasks);
}

function resolveTodayBtnClick() {
    const todayTasks = TASKS_LIST.getTasks().filter(task => isSameDay(new Date(), task.dueDate));
    displayTasksTable('Today\'s Tasks', false, todayTasks);
}

function resolveUpcomingBtnClick() {
    const taskTable = displayTasksTable('Upcoming Tasks', true, []);
    const dateInput = document.querySelector('input[type=date]');
    dateInput.addEventListener('change', () => {
        const startingDate = startOfDay(new Date());
        const upcomingDate = endOfDay(parseISO(dateInput.value));
        const upcomingInterval = {start: startingDate, end: upcomingDate};
        const upcomingTasks = TASKS_LIST.getTasks().filter(task => isWithinInterval(task.dueDate, upcomingInterval));
        taskTable.displayTasks(upcomingTasks);
    })
}

function resolvePastDueBtnClick() {
    const pastDueTasks = TASKS_LIST.getTasks().filter(task => isPast(task.dueDate));
    displayTasksTable('Past Due Tasks', false, pastDueTasks);
}

export function resolveTagBtnClick(tag) {
    const taggedTasks = TASKS_LIST.getTasks().filter(task => task.hasTag(tag));
    displayTasksTable(`${tag.text} Tasks`, false, taggedTasks);
}

function resolveNewTaskBtnClick() {
    const newTask = TASKS_LIST.createNewTask();
    displayTaskForm(newTask);
}

function resolveTagNavNewTagInput(event) {
    const trimmedInputValue = event.target.value.trim();
    if (trimmedInputValue) TAGS_LIST.createNewTag(trimmedInputValue);
    TAGS_NAV_LIST.updateTagsNavList();
    BUTTONS.newTagBtn.addEventListener('click', resolveNewTagBtnClick);
}

function resolveNewTagBtnClick() {
    BUTTONS.newTagBtn.removeEventListener('click', resolveNewTagBtnClick);
    const tagNavNewTagInput = buildInputHtml('text');
    tagNavNewTagInput.maxLength = 15;
    tagNavNewTagInput.addEventListener('focusout', event => { resolveTagNavNewTagInput(event) });
    tagNavNewTagInput.addEventListener('keypress', event => { if (event.key === 'Enter') resolveTagNavNewTagInput(event) });
    TAGS_NAV_LIST.HTML.appendChild(tagNavNewTagInput);
    tagNavNewTagInput.focus();
}

function removeTask(task) {
    TASKS_LIST.deleteTask(task);
    resolveAllBtnClick();
}

export function removeTag(tag) {
    TAGS_LIST.deleteTag(tag);
    TAGS_NAV_LIST.updateTagsNavList();
    TASKS_LIST.scrubTagFromAllTasks(tag);
}

function resolveCompletedBtnClick() {
    const completedTasks = TASKS_LIST.getTasks().filter(task => task.isCompleted);
    displayTasksTable('Completed Tasks', false, completedTasks);
}

function resolveSaveTasksBtnClick() {
    const jsonTasksList = [];
    for (let task of TASKS_LIST.getTasks()) {
        const jsonTask = JSON.stringify(task);
        const jsonTaskTags = JSON.stringify(task.tags);
        const jsonChecklist = JSON.stringify(task.checklist);
        const fullJsonTask = jsonTask.slice(0,-1).concat(',"checklist":', jsonChecklist, ',"tags":', jsonTaskTags, '}');
        jsonTasksList.push(fullJsonTask);
        jsonTasksList.push(',');
    }
    jsonTasksList.pop();
    const jsonTasks = '['.concat(...jsonTasksList, ']');
    window.localStorage.setItem('tasks', jsonTasks);
}

function createTaskFromJson(jsonTask) {
    const newTask = TASKS_LIST.createNewTask();
    newTask.title = jsonTask.title;
    newTask.dueDate = new Date(jsonTask.dueDate);
    newTask.shortDesc = jsonTask.shortDesc;
    newTask.notes = jsonTask.notes;
    newTask.isCompleted = jsonTask.isCompleted;
    for (let item of jsonTask.checklist) {
        const newChecklistItem = newTask.createChecklistItem(item.text);
        if (item.isChecked) newChecklistItem.toggleCheck();
    }
    for (let item of jsonTask.tags) {
        const taskTag = TAGS_LIST.getTags().find(tag => tag.text === item.text);
        newTask.addTag(taskTag);
    }
}

(function loadTasksFromLocalStorage() {
    const jsonTasksList = JSON.parse(window.localStorage.getItem('tasks'));
    console.log(jsonTasksList)
    for (let jsonTask of jsonTasksList) {
        console.log(jsonTask);
        createTaskFromJson(jsonTask);
    }
})();



BUTTONS.allBtn.addEventListener('click', resolveAllBtnClick);
BUTTONS.todayBtn.addEventListener('click', resolveTodayBtnClick);
BUTTONS.upcomingBtn.addEventListener('click', resolveUpcomingBtnClick);
BUTTONS.pastDueBtn.addEventListener('click', resolvePastDueBtnClick);
BUTTONS.newTaskBtn.addEventListener('click', resolveNewTaskBtnClick);
BUTTONS.newTagBtn.addEventListener('click', resolveNewTagBtnClick);
BUTTONS.completedBtn.addEventListener('click', resolveCompletedBtnClick);
BUTTONS.saveTasksBtn.addEventListener('click', resolveSaveTasksBtnClick);

resolveAllBtnClick();