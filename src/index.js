import './style.css';
import { format } from 'date-fns';
import { buildPageHtml } from './pageLoadHtmlBuilders';
import { buildLabeledDateInputHtml } from './htmlBuilders';
import { buildTaskTableHtml, buildTaskTableHeaderHtml, buildTaskRowHtml } from './taskTableHtmlBuilders'
import { buildTaskForm } from './taskForm';
import { Task } from './task.js';
import { isSameDay, isPast, endOfDay, isWithinInterval, startOfDay, parseISO } from 'date-fns';

const tasksList = [];

export const tagsList = [];

const testTask1 = new Task('Test Task 1', new Date(2025, 11, 5), 'This is the first test task.');
tasksList.push(testTask1);
testTask1.createChecklistItem('This is a checklist item.');

const testTask2 = new Task('Test Task 2', endOfDay(new Date()), 'This is the second test task.');
tasksList.push(testTask2);

const testTask3 = new Task('Test Task 3', new Date(2020, 5, 10), 'This is the third test task.');
tasksList.push(testTask3);

const importantTag = 'Important';
tagsList.push(importantTag);
testTask2.addTag(importantTag);
testTask1.addTag(importantTag);

const testTag2 = 'Test Tag 2';
tagsList.push(testTag2);
testTask1.addTag(testTag2);

const body = document.querySelector('body');
const pageHtml = buildPageHtml();
body.appendChild(pageHtml);

const main = document.querySelector('main');

function clearContainer(container) { 
    container.innerHTML = '';
}

function deleteTableFrom(parent) { 
    const table = parent.querySelector('table');
    if (table) parent.removeChild(table);
}

function displayHeader(headerText) { 
    const header = buildTaskTableHeaderHtml(headerText);
    parent.appendChild(header); 
}

function displayUpcomingDateInputOn(main) {
    const labelText = 'Display tasks due between now and:';
    const labeledDateInputContainer = buildLabeledDateInputHtml(labelText);
    const upcomingDateInput = labeledDateInputContainer.querySelector('input');
    upcomingDateInput.min = format(new Date(), 'yyyy-MM-dd');
    upcomingDateInput.value = format(new Date(), 'yyyy-MM-dd');
    main.appendChild(labeledDateInputContainer);
}

function displayTaskFormOn(main, taskForm) {
    clearContainer(main);
    main.appendChild(taskForm.html);
}

function displayTaskTableOn(main, tasksToDisplay, tagsList) {
    const taskTable = buildTaskTableHtml();
    for (let task of tasksToDisplay) {
        const newRow = buildTaskRowHtml(task.title, task.shortDesc, task.dueDate);
        const taskForm = buildTaskForm(task, tagsList);
        newRow.addEventListener('click', () => displayTaskFormOn(main, taskForm));
        taskTable.appendChild(newRow);
    }
    main.appendChild(taskTable);
}

const BUTTONS = {
    allBtn: document.getElementById('all-btn'),
    todayBtn: document.getElementById('today-btn'),
    upcomingBtn: document.getElementById('upcoming-btn'),
    pastDueBtn: document.getElementById('past-due-btn'),
    newTaskBtn: document.getElementById('new-task-btn'),
    newTagBtn: document.getElementById('new-tag-btn'),
}

for (let key in BUTTONS) {
    const newClickFn = 'resolve' + key[0].toUpperCase() + key.slice(1) + 'Click';
    BUTTONS[key].addEventListener('click', () => {eval(newClickFn)()});
}

const resolveAllBtnClick = () => { 
    clearContainer(main);
    displayHeader('All Tasks');
    displayTaskTableOn(main, tasksList, tagsList);
}

const resolveTodayBtnClick = () => {
    clearContainer(main);
    const todayTasks = tasksList.filter(task => isSameDay(new Date(), task.dueDate));
    displayHeader('Today\'s Tasks');
    displayTaskTableOn(main, todayTasks, tagsList);
}

const resolveUpcomingBtnClick = () => {
    clearContainer(main);
    displayHeader('Upcoming Tasks');
    displayUpcomingDateInputOn(main);
    const dateInput = document.querySelector('input[type=date]');
    dateInput.addEventListener('change', (event) => {
        const upcomingDate = endOfDay(parseISO(event.target.value));
        const upcomingInterval = {start: startOfDay(new Date()), end: upcomingDate};
        const upcomingTasks = tasksList.filter(task => isWithinInterval(task.dueDate, upcomingInterval));
        deleteTableFrom(main);
        displayTaskTableOn(main, upcomingTasks, tagsList);
    })
}

const resolvePastDueBtnClick = () => {
    clearContainer(main);
    const pastDueTasks = tasksList.filter(task => isPast(task.dueDate));
    displayHeader('Past Due Tasks');
    displayTaskTableOn(main, pastDueTasks, tagsList);
}

const resolveNewTaskBtnClick = () => { console.log('New Task Button Pressed!') }

const resolveNewTagBtnClick = () => { console.log('New Tag Button Pressed!') }

resolveAllBtnClick();