import './style.css';
import './page-build.js';
import { Project } from './project.js';

const BUTTONS = {
    todayBtn: document.getElementById('today-btn'),
    allBtn: document.getElementById('all-btn'),
    upcomingBtn: document.getElementById('upcoming-btn'),
    importantBtn: document.getElementById('important-btn'),
    newTaskBtn: document.getElementById('new-task-btn'),
    newProjectBtn: document.getElementById('new-project-btn'),
}

for (let key in BUTTONS) {
    const newClickFn = 'resolve' + key[0].toUpperCase() + key.slice(1) + 'Click';
    BUTTONS[key].addEventListener('click', () => {eval(newClickFn)()});
}