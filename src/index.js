import './style.css';
import './page-build.js';
import { Project } from './project.js';
import { Task } from './task.js';

(() => {
    const BUTTONS = {
        allBtn: document.getElementById('all-btn'),
        todayBtn: document.getElementById('today-btn'),
        upcomingBtn: document.getElementById('upcoming-btn'),
        importantBtn: document.getElementById('important-btn'),
        newTaskBtn: document.getElementById('new-task-btn'),
        newProjectBtn: document.getElementById('new-project-btn'),
    }

    for (let key in BUTTONS) {
        const newClickFn = 'resolve' + key[0].toUpperCase() + key.slice(1) + 'Click';
        BUTTONS[key].addEventListener('click', () => {eval(newClickFn)()});
    }

    const resolveAllBtnClick = () => {
        console.log('All Button Pressed!')
    }

    const resolveTodayBtnClick = () => {
        console.log('Today Button Pressed!')
    }

    const resolveUpcomingBtnClick = () => {
        console.log('Upcoming Button Pressed!')
    }

    const resolveImportantBtnClick = () => {
        console.log('Important Button Pressed!')
    }

    const resolveNewProjectBtnClick = () => {
        console.log('New Project Button Pressed!')
    }

    const resolveNewTaskBtnClick = () => {
        console.log('New Task Button Pressed!')
    }

})();
    

const project = new Project('project 1');
const task = new Task('task 1', new Date(), 'testing task', false);
task.addChecklistItem('I need to do this!');
project.addTask(task);
console.log(project);
console.log(project.tasks);
project.title = 'new title';
console.log(project.title);
project.deleteTask('123')
console.log(project.tasks);
console.log(task.checklist)