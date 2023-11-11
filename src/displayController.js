import { buildPage } from './buildPage';
import { buildTaskTable, buildTableHeader, buildDateInputContainer} from './htmlBuilders';

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

function displayHeaderOn(parent, headerText) { 
    const header = buildTableHeader(headerText);
    parent.appendChild(header); 
}

function displayUpcomingDateInputOn(main) {
    const labelText = 'Display tasks due between now and:';
    const defaultDate = new Date();
    const dateInputContainer = buildDateInputContainer(labelText, defaultDate);
    main.appendChild(dateInputContainer);
}

function displayTaskTableOn(main, tasksToDisplay, tagsList) {
    const taskTable = buildTaskTable(main, tasksToDisplay, tagsList);
    main.appendChild(taskTable);
}

function displayTaskFormOn(main, taskForm) {
    clearContainer(main);
    main.appendChild(taskForm.html);
}

export const DisplayController = {
    displayTaskFormOn,
    displayTaskTableOn, 
    displayUpcomingDateInputOn, 
    displayHeaderOn, 
    clearContainer, 
    deleteTableFrom, 
    initializePageDisplay
}