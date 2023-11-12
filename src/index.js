import './style.css';
import { format } from 'date-fns';
import { buildPageHtml } from './pageLoadHtmlBuilders';
import { buildLabeledDateInputHtml } from './htmlBuilders';
import { buildTaskTableHtml, buildTaskTableHeaderHtml, buildTaskRowHtml } from './taskTableHtmlBuilders';
import { buildTaskForm } from './taskForm';
import { Task } from './task';
import { Tag } from './tag';
import { isSameDay, isPast, endOfDay, isWithinInterval, startOfDay, parseISO } from 'date-fns';

const TASKS_LIST = [];
const TAGS_LIST = [new Tag('Important'), new Tag('Household'), new Tag('Generic Tag 3')];

const body = document.querySelector('body');
const pageHtml = buildPageHtml();
body.appendChild(pageHtml);

function buildTaskTableElements(headerText, isUpcoming, tasksToDisplay) {
    return (() => {
        const elements = document.createDocumentFragment();
        
        const taskTableHeaderHtml = buildTaskTableHeaderHtml(headerText);
        elements.appendChild(taskTableHeaderHtml);

        const labeledUpcomingDateInputHtml = buildLabeledDateInputHtml('Display tasks due between now and:');
        const upcomingDateInput = labeledUpcomingDateInputHtml.querySelector('input');
        upcomingDateInput.min = format(new Date(), 'yyyy-MM-dd');
        if (isUpcoming) elements.appendChild(labeledUpcomingDateInputHtml);

        const taskTableHtml = buildTaskTableHtml();
        tasksToDisplay.forEach(task => {
            const taskRowHtml = buildTaskRowHtml(task.title, task.shortDesc, task.dueDate);
            const taskForm = buildTaskForm(task, TAGS_LIST);
            taskRowHtml.addEventListener('click', () => {
                main.innerHTML = '';
                main.appendChild(taskForm.html);
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

const compareTasksByDate = (firstTask, secondTask) => {
    if (firstTask.dueDate < secondTask.dueDate) return -1;
    if (firstTask.dueDate > secondTask.dueDate) return 1;
    return 0;
}

const sortTaskListByDate = taskList => { taskList.sort((firstTask, secondTask) => compareTasksByDate(firstTask,secondTask)) }


const resolveAllBtnClick = () => { 
    main.innerHTML = '';
    sortTaskListByDate(TASKS_LIST)
    const taskTableElements = buildTaskTableElements('All Tasks', false, TASKS_LIST);
    main.appendChild(taskTableElements.elements);
}

const resolveTodayBtnClick = () => {
    main.innerHTML = '';
    const todayTasks = TASKS_LIST.filter(task => isSameDay(new Date(), task.dueDate));
    sortTaskListByDate(todayTasks);
    const taskTableElements = buildTaskTableElements('Today\'s Tasks', false, todayTasks);
    main.appendChild(taskTableElements.elements);
}

const resolveUpcomingBtnClick = () => {
    main.innerHTML = '';
    const taskTableElements = buildTaskTableElements('Upcoming Tasks', true, []);
    main.appendChild(taskTableElements.elements);
    const dateInput = document.querySelector('input[type=date]');
    dateInput.addEventListener('change', () => {
        const upcomingDate = endOfDay(parseISO(dateInput.value));
        const upcomingInterval = {start: startOfDay(new Date()), end: upcomingDate};
        const upcomingTasks = TASKS_LIST.filter(task => isWithinInterval(task.dueDate, upcomingInterval));
        const table = main.querySelector('table');
        main.removeChild(table);
        sortTaskListByDate(upcomingTasks);
        const taskTableElements = buildTaskTableElements('Upcoming Tasks', true, upcomingTasks);
        main.appendChild(taskTableElements.taskTableHtml);
    })
}

const resolvePastDueBtnClick = () => {
    main.innerHTML = '';
    const pastDueTasks = TASKS_LIST.filter(task => isPast(task.dueDate));
    sortTaskListByDate(pastDueTasks);
    const taskTableElements = buildTaskTableElements('Past Due Tasks', false, pastDueTasks);
    main.appendChild(taskTableElements.elements);
}

const resolveNewTaskBtnClick = () => {
    const newTask = new Task(endOfDay(new Date()))
    TASKS_LIST.push(newTask)
    const taskForm = buildTaskForm(newTask, TAGS_LIST);
    main.innerHTML = '';
    main.appendChild(taskForm.html);
}

const tagsNav = document.querySelector('#tags-nav');

const resolveTagBtnClick = tag => {
    main.innerHTML = '';
    const taggedTasks = TASKS_LIST.filter(task => task.hasTag(tag));
    sortTaskListByDate(taggedTasks);
    const taskTableElements = buildTaskTableElements(`${tag.text} Tasks`, false, taggedTasks);
    main.appendChild(taskTableElements.elements);
}

const createNewTagItem = newTag => {
    const tagItem = document.createElement('li');
    tagItem.innerHTML = newTag.text;
    tagItem.addEventListener('click', () => resolveTagBtnClick(newTag));
    tagsNav.appendChild(tagItem);
}

TAGS_LIST.forEach(tag => createNewTagItem(tag));

const resolveNewTagBtnClick = () => { 
    const newTagInput = document.createElement('input');
    newTagInput.type = 'text';
    newTagInput.maxLength = 15;
    newTagInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const trimmedInputValue = newTagInput.value.trim();
            const tagAlreadyExists = TAGS_LIST.some(tag => tag.text === trimmedInputValue);
            if (trimmedInputValue && !tagAlreadyExists) {
                const newTag = new Tag(trimmedInputValue);
                createNewTagItem(newTag);
                TAGS_LIST.push(newTag);
            }
            tagsNav.removeChild(newTagInput);
        }
    })
    tagsNav.appendChild(newTagInput);
    newTagInput.focus();
}

resolveAllBtnClick();