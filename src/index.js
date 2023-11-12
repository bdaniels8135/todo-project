import './style.css';
import { format } from 'date-fns';
import { buildPageHtml } from './pageLoadHtmlBuilders';
import { buildLabeledDateInputHtml } from './htmlBuilders';
import { buildTaskTableHtml, buildTaskTableHeaderHtml, buildTaskRowHtml } from './taskTableHtmlBuilders'
import { buildTaskForm } from './taskForm';
import { Task } from './task.js';
import { isSameDay, isPast, endOfDay, isWithinInterval, startOfDay, parseISO } from 'date-fns';

// Page initialization

const tasksList = [];

const tagsList = [];

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

// Display functions

function clearMain() { 
    main.innerHTML = '';
}

function deleteTaskTable() { 
    const table = main.querySelector('table');
    if (table) main.removeChild(table);
}

function displayTaskTableHeader(headerText) { 
    const header = buildTaskTableHeaderHtml(headerText);
    parent.appendChild(header); 
}

function displayUpcomingDateInput() {
    const labelText = 'Display tasks due between now and:';
    const labeledDateInputContainer = buildLabeledDateInputHtml(labelText);
    const upcomingDateInput = labeledDateInputContainer.querySelector('input');
    upcomingDateInput.min = format(new Date(), 'yyyy-MM-dd');
    upcomingDateInput.value = format(new Date(), 'yyyy-MM-dd');
    main.appendChild(labeledDateInputContainer);
}

function displayTaskForm(taskForm) {
    clearMain();
    main.appendChild(taskForm.html);
}

function displayTaskTable(tasksToDisplay, tagsList) {
    const taskTable = buildTaskTableHtml();
    for (let task of tasksToDisplay) {
        const newRow = buildTaskRowHtml(task.title, task.shortDesc, task.dueDate);
        const taskForm = buildTaskForm(task, tagsList);
        newRow.addEventListener('click', () => displayTaskForm(taskForm));
        taskTable.appendChild(newRow);
    }
    main.appendChild(taskTable);
}


// Page logic functions

const main = document.querySelector('main');

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
    clearMain();
    displayTaskTableHeader('All Tasks');
    displayTaskTable(tasksList, tagsList);
}

const resolveTodayBtnClick = () => {
    clearMain();
    const todayTasks = tasksList.filter(task => isSameDay(new Date(), task.dueDate));
    displayTaskTableHeader('Today\'s Tasks');
    displayTaskTable(todayTasks, tagsList);
}

const resolveUpcomingBtnClick = () => {
    clearMain();
    displayTaskTableHeader('Upcoming Tasks');
    displayUpcomingDateInput();
    const dateInput = document.querySelector('input[type=date]');
    dateInput.addEventListener('change', (event) => {
        const upcomingDate = endOfDay(parseISO(event.target.value));
        const upcomingInterval = {start: startOfDay(new Date()), end: upcomingDate};
        const upcomingTasks = tasksList.filter(task => isWithinInterval(task.dueDate, upcomingInterval));
        deleteTaskTable();
        displayTaskTable(upcomingTasks, tagsList);
    })
}

const resolvePastDueBtnClick = () => {
    clearMain();
    const pastDueTasks = tasksList.filter(task => isPast(task.dueDate));
    displayTaskTableHeader('Past Due Tasks');
    displayTaskTable(pastDueTasks, tagsList);
}

const resolveNewTaskBtnClick = () => { console.log('New Task Button Pressed!') }

const resolveNewTagBtnClick = () => { console.log('New Tag Button Pressed!') }

resolveAllBtnClick();