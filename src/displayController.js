import { buildPage } from './buildPage.js';
import { buildTaskForm, buildTaskTable, buildHeader, buildDateInputContainer} from './htmlBuilder.js'

function initializePageDisplay(body) { 
    const page = buildPage();
    body.appendChild(page);
}

function clearContainer(container) { 
    container.innerHTML = '';
}

function deleteTableFrom(parent) { 
    const table = parent.querySelector('table');
    if (table) parent.removeChild(table);
}

function displayHeaderOn(parent, text) { 
    const header = buildHeader(text);
    parent.appendChild(header); 
}

function displayDateInputOn(main) {
    const labelText = 'Display tasks due between now and:';
    const defaultDate = new Date();
    const dateInputContainer = buildDateInputContainer(labelText, defaultDate);
    main.appendChild(dateInputContainer);
}

function displayTaskTableOn(main, tasksToDisplay, tagsList) {
    const taskTable = buildTaskTable(main, tasksToDisplay, tagsList);
    main.appendChild(taskTable);
}

function displayTaskFormOn(main, task, tagsList) {
    clearContainer(main);
    const form = buildTaskForm(task, tagsList);
    main.appendChild(form);
}

export const DisplayController = {
    displayTaskFormOn,
    displayTaskTableOn, 
    displayDateInputOn, 
    displayHeaderOn, 
    clearContainer, 
    deleteTableFrom, 
    initializePageDisplay
}