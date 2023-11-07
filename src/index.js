import './style.css';
import { Task } from './task.js';
import { DisplayController as DC } from './displayController.js';
import { isSameDay, isPast, endOfDay, isWithinInterval } from 'date-fns';

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

DC.initializePageDisplay(body);

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
    DC.clearContainer(main);
    DC.displayMainHeader(main, 'All Tasks');
    DC.displayTasks(main, tasksList, tagsList);
}

const resolveTodayBtnClick = () => {
    DC.clearContainer(main);
    const todayTasks = tasksList.filter(task => isSameDay(new Date(), task.dueDate));
    DC.displayMainHeader(main, 'Today\'s Tasks');
    DC.displayTasks(main, todayTasks, tagsList);
}

const resolveUpcomingBtnClick = () => {
    DC.clearContainer(main);
    DC.displayMainHeader(main, 'Upcoming Tasks');
    DC.displayDateInput(main);
    const dateInput = document.querySelector('input[type=date]');
    dateInput.addEventListener('change', () => {
        const upcomingDate = new Date(dateInput.value);
        const upcomingInterval = {start: new Date(), end: upcomingDate};
        const upcomingTasks = tasksList.filter(task => isWithinInterval(task.dueDate, upcomingInterval));
        DC.deleteTableFrom(main);
        DC.displayTasks(main, upcomingTasks, tagsList);
    })
}

const resolvePastDueBtnClick = () => {
    DC.clearContainer(main);
    const pastDueTasks = tasksList.filter(task => isPast(task.dueDate));
    DC.displayMainHeader(main, 'Past Due Tasks');
    DC.displayTasks(main, pastDueTasks, tagsList);
}

const resolveNewTaskBtnClick = () => { console.log('New Task Button Pressed!') }

const resolveNewTagBtnClick = () => { console.log('New Tag Button Pressed!') }
