import './style.css';
import './page-build.js';
import { Task } from './task.js';
import { Tag } from './tag.js';
import { displayTasks } from './display-controller.js'
import { isSameDay, isPast, endOfDay } from 'date-fns';

const tasks = [];

const tags = [];

const testTask1 = new Task('Test Task 1', new Date(2025, 11, 5), 'This is the first test task.');
tasks.push(testTask1);

const testTask2 = new Task('Test Task 2', endOfDay(new Date()), 'This is the second test task.');
tasks.push(testTask2);

const testTask3 = new Task('Test Task 3', new Date(2020, 5, 10), 'This is the third test task.');
tasks.push(testTask3);

const importantTag = new Tag('Important', 'rgb(255, 0, 0)');
tags.push(importantTag);
testTask2.addTag(importantTag);

const testTag2 = new Tag('Test Tag 2', 'rgb(100, 100, 100)');
tags.push(testTag2);
testTask1.addTag(testTag2);

(() => {
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

    const resolveAllBtnClick = () => { displayTasks(tasks) }

    const resolveTodayBtnClick = () => {
        const todayTasks = tasks.filter(task => isSameDay(new Date(), task.dueDate));
        displayTasks(todayTasks);
    }

    const resolveUpcomingBtnClick = () => {
        console.log('Upcoming Button Pressed!');
    }

    const resolvePastDueBtnClick = () => {
        const pastDueTasks = tasks.filter(task => isPast(task.dueDate));
        displayTasks(pastDueTasks);
    }

    const resolveNewTaskBtnClick = () => {
        console.log('New Task Button Pressed!');
    }

    const resolveNewTagBtnClick = () => {
        console.log('New Tag Button Pressed!');
    }

    displayTasks(tasks);
})()