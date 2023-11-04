import './style.css';
import './page-build.js';
import { Task } from './task.js';
import { Tag } from './tag.js';

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

    const resolveAllBtnClick = () => {
        console.log('All Button Pressed!');
    }

    const resolveTodayBtnClick = () => {
        console.log('Today Button Pressed!');
    }

    const resolveUpcomingBtnClick = () => {
        console.log('Upcoming Button Pressed!');
    }

    const resolvePastDueBtnClick = () => {
        console.log('Past Due Button Pressed!')
    }

    const resolveNewTaskBtnClick = () => {
        console.log('New Task Button Pressed!');
    }

    const resolveNewTagBtnClick = () => {
        console.log('New Tag Button Pressed!');
    }
})();