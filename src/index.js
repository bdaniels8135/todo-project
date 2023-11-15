import './style.css';
import removeIcon from './img/close-circle.svg';
import { format } from 'date-fns';
import { buildPageElementsHtml } from './pageLoadHtmlBuilders';
import { buildLabeledDateInputHtml, buildHeaderTextHtml } from './htmlBuilders';
import { buildTaskTableHtml, buildTaskRowHtml } from './taskTableHtmlBuilders';
import { buildTaskForm } from './taskForm';
import { Task } from './task';
import { Tag } from './tag';
import { isSameDay, isPast, endOfDay, isWithinInterval, startOfDay, parseISO } from 'date-fns';

function buildTaskList() {
    return (() => {
        const tasks = [];

        function deleteTask(task){
            const deleteIndex = tasks.indexOf(task);
            tasks.splice(deleteIndex, 1);
        }

        function createNewTask() {
            const newTask = new Task(endOfDay(new Date()));
            tasks.push(newTask);

            return newTask;
        }

        function _compareTasksByDate(firstTask, secondTask) {
            if (firstTask.dueDate < secondTask.dueDate) return -1;
            if (firstTask.dueDate > secondTask.dueDate) return 1;
            return 0;
        }

        function getTasks() {
            tasks.sort((firstTask, secondTask) => _compareTasksByDate(firstTask,secondTask));
            
            return tasks;
        }

        return {
            deleteTask,
            createNewTask,
            getTasks,
        }

    })();
}

const TASKS_LIST = buildTaskList();

const DEFAULT_TAGS = [new Tag('Important')];

function buildTagsList(defaultTags) {
    return (() => {
        const tags = [...defaultTags];

        function _compareTagsAlphabetically(firstTag, secondTag) {
            if (firstTag.text.toLowerCase() < secondTag.text.toLowerCase()) return -1;
            if (firstTag.text.toLowerCase() > secondTag.text.toLowerCase()) return 1;
            return 0;
        }

        function getTags() {
            tags.sort((firstTag, secondTag) => _compareTagsAlphabetically(firstTag, secondTag));

            return tags;
        }

        function createNewTag(text) {
            const tagAlreadyExists = tags.some(tag => tag.text === text);
            if (!tagAlreadyExists) {
                const newTag = new Tag(text);
                tags.push(newTag);
                return newTag;
            }           
        }

        function deleteTag(tag) {
            const deleteIndex = tags.indexOf(tag);
            tags.splice(deleteIndex, 1);
        }

        return {
            getTags,
            createNewTag,
            deleteTag,
        }

    })();
}


const TAGS_LIST = buildTagsList(DEFAULT_TAGS);

const body = document.querySelector('body');
const pageHtml = buildPageElementsHtml();
body.appendChild(pageHtml);

function buildTaskTableElements(headerText, isUpcoming, tasksToDisplay) {
    return (() => {
        const elements = document.createDocumentFragment();
        
        const taskTableHeaderHtml = buildHeaderTextHtml(headerText, 1);
        elements.appendChild(taskTableHeaderHtml);

        const upcomingDateInputLabelText = 'Display tasks due between now and:'
        const labeledUpcomingDateInputHtml = buildLabeledDateInputHtml(upcomingDateInputLabelText);
        const upcomingDateInput = labeledUpcomingDateInputHtml.querySelector('input');
        upcomingDateInput.min = format(new Date(), 'yyyy-MM-dd');
        if (isUpcoming) elements.appendChild(labeledUpcomingDateInputHtml);

        const taskTableHtml = buildTaskTableHtml();
        tasksToDisplay.forEach(task => {
            const taskRowHtml = buildTaskRowHtml(task.title, task.shortDesc, task.dueDate);
            const taskForm = buildTaskForm(task, TAGS_LIST.getTags());
            const taskDeleteButton = taskForm.HTML.querySelector('#task-delete-btn');
            taskDeleteButton.addEventListener('click', () => {
                TASKS_LIST.deleteTask(task);
                resolveAllBtnClick();
            })
            taskRowHtml.addEventListener('click', () => {
                main.innerHTML = '';
                main.appendChild(taskForm.HTML);
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

function resolveAllBtnClick() { 
    main.innerHTML = '';
    const taskTableElements = buildTaskTableElements('All Tasks', false, TASKS_LIST.getTasks());
    main.appendChild(taskTableElements.elements);
}

function resolveTodayBtnClick() {
    main.innerHTML = '';
    const todayTasks = TASKS_LIST.getTasks().filter(task => isSameDay(new Date(), task.dueDate));
    const taskTableElements = buildTaskTableElements('Today\'s Tasks', false, todayTasks);
    main.appendChild(taskTableElements.elements);
}

function resolveUpcomingBtnClick() {
    main.innerHTML = '';
    const taskTableElements = buildTaskTableElements('Upcoming Tasks', true, []);
    main.appendChild(taskTableElements.elements);
    const dateInput = document.querySelector('input[type=date]');
    dateInput.addEventListener('change', () => {
        const upcomingDate = endOfDay(parseISO(dateInput.value));
        const upcomingInterval = {start: startOfDay(new Date()), end: upcomingDate};
        const upcomingTasks = TASKS_LIST.getTasks().filter(task => isWithinInterval(task.dueDate, upcomingInterval));
        const table = main.querySelector('table');
        main.removeChild(table);
        const taskTableElements = buildTaskTableElements('Upcoming Tasks', true, upcomingTasks);
        main.appendChild(taskTableElements.taskTableHtml);
    })
}

function resolvePastDueBtnClick() {
    main.innerHTML = '';
    const pastDueTasks = TASKS_LIST.getTasks().filter(task => isPast(task.dueDate));
    const taskTableElements = buildTaskTableElements('Past Due Tasks', false, pastDueTasks);
    main.appendChild(taskTableElements.elements);
}

function resolveNewTaskBtnClick() {
    const newTask = TASKS_LIST.createNewTask()    
    const taskForm = buildTaskForm(newTask, TAGS_LIST.getTags());
    main.innerHTML = '';
    main.appendChild(taskForm.HTML);
}

const tagsNav = document.querySelector('#tags-nav');
const tagsNavList = tagsNav.querySelector('ul');

populateTagsNavList();

function resolveTagBtnClick(tag) {
    main.innerHTML = '';
    const taggedTasks = TASKS_LIST.getTasks().filter(task => task.hasTag(tag));
    const taskTableElements = buildTaskTableElements(`${tag.text} Tasks`, false, taggedTasks);
    main.appendChild(taskTableElements.elements);
}

function clearTagsNavList() {
    tagsNavList.innerHTML = ''
}

function buildTagNavListItemHtml(text) {
    const tagNavListItemHtml = document.createElement('li');
    const tagNavListItemTextHtml = document.createElement('p');
    tagNavListItemTextHtml.innerText = text;
    tagNavListItemHtml.appendChild(tagNavListItemTextHtml);
    const tagNavListItemIconHtml = document.createElement('img')
    tagNavListItemIconHtml.src = removeIcon;
    tagNavListItemHtml.appendChild(tagNavListItemIconHtml);

    return tagNavListItemHtml;
}

function appendTagItem(tag) {
    const tagNavListItemHtml = buildTagNavListItemHtml(tag.text);
    tagNavListItemHtml.addEventListener('click', () => { resolveTagBtnClick(tag) });
    tagsNavList.appendChild(tagNavListItemHtml);
}

function populateTagsNavList() {
    TAGS_LIST.getTags().forEach(tag => { appendTagItem(tag) });
}

function updateTagsNavList() {
    clearTagsNavList();
    populateTagsNavList();
}

function buildTagNavNewTagInput() {
    const tagNavNewTagInput = document.createElement('input');
    tagNavNewTagInput.type = 'text';
    tagNavNewTagInput.maxLength = 15;

    return tagNavNewTagInput;
}

function resolveTagNavNewTagInput(event) {
    const trimmedInputValue = event.target.value.trim();
        if (trimmedInputValue) {
            TAGS_LIST.createNewTag(trimmedInputValue);
            updateTagsNavList()
        }
    BUTTONS.newTagBtn.addEventListener('click', resolveNewTagBtnClick);
}

function resolveNewTagBtnClick() {
    BUTTONS.newTagBtn.removeEventListener('click', resolveNewTagBtnClick);
    const tagNavNewTagInput = buildTagNavNewTagInput();
    tagNavNewTagInput.addEventListener('focusout', event => { resolveTagNavNewTagInput(event) })
    tagNavNewTagInput.addEventListener('keypress', event => { if (event.key === 'Enter') resolveTagNavNewTagInput(event) })
    tagsNavList.appendChild(tagNavNewTagInput);
    tagNavNewTagInput.focus();
}

BUTTONS.allBtn.addEventListener('click', resolveAllBtnClick);
BUTTONS.todayBtn.addEventListener('click', resolveTodayBtnClick);
BUTTONS.upcomingBtn.addEventListener('click', resolveUpcomingBtnClick);
BUTTONS.pastDueBtn.addEventListener('click', resolvePastDueBtnClick);
BUTTONS.newTaskBtn.addEventListener('click', resolveNewTaskBtnClick);
BUTTONS.newTagBtn.addEventListener('click', resolveNewTagBtnClick);

resolveAllBtnClick();