import './style.css';
import { Task } from './task.js';
import { displayTasks, displayDateInput, displayMainHeader, clearContainer, clearTaskTable, initializePageDisplay } from './displayController.js';
import { isSameDay, isPast, endOfDay, isWithinInterval } from 'date-fns';

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

(() => {
    const body = document.querySelector('body');

    initializePageDisplay(body);
    
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
        clearContainer(main);
        displayMainHeader(main, 'All Tasks');
        displayTasks(main, tasksList);
    }

    const resolveTodayBtnClick = () => {
        clearContainer(main);
        const todayTasks = tasksList.filter(task => isSameDay(new Date(), task.dueDate));
        displayMainHeader(main, 'Today\'s Tasks');
        displayTasks(main, todayTasks);
    }

    const resolveUpcomingBtnClick = () => {
        clearContainer(main);
        displayMainHeader(main, 'Upcoming Tasks');
        displayDateInput(main);
        const dateInput = document.querySelector('input[type=date]');
        dateInput.addEventListener('change', () => {
            const upcomingDate = new Date(dateInput.value);
            const upcomingInterval = {start: new Date(), end: upcomingDate};
            const upcomingTasks = tasksList.filter(task => isWithinInterval(task.dueDate, upcomingInterval));
            clearTaskTable(main);
            displayTasks(main, upcomingTasks);
        })
    }

    const resolvePastDueBtnClick = () => {
        clearContainer(main);
        const pastDueTasks = tasksList.filter(task => isPast(task.dueDate));
        displayMainHeader(main, 'Past Due Tasks');
        displayTasks(main, pastDueTasks);
    }

    const resolveNewTaskBtnClick = () => { console.log('New Task Button Pressed!') }

    const resolveNewTagBtnClick = () => { console.log('New Tag Button Pressed!') }
})()