import { format } from 'date-fns';
import { buildPageHtml } from './pageLoadHtmlBuilders';
import { buildLabeledDateInputHtml } from './htmlBuilders';
import { buildTaskTableHtml, buildMainHeaderHtml, buildTaskRowHtml } from './taskTableHtmlBuilders'
import { buildTaskForm } from './taskForm';

function initializePageDisplay(body) { 
    const page = buildPageHtml();
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
    const header = buildMainHeaderHtml(headerText);
    parent.appendChild(header); 
}

function displayUpcomingDateInputOn(main) {
    const labelText = 'Display tasks due between now and:';
    const labeledDateInputContainer = buildLabeledDateInputHtml(labelText);
    const upcomingDateInput = labeledDateInputContainer.querySelector('input');
    upcomingDateInput.min = format(new Date(), 'yyyy-MM-dd');
    upcomingDateInput.value = format(new Date(), 'yyyy-MM-dd');
    main.appendChild(labeledDateInputContainer);
}

function displayTaskFormOn(main, taskForm) {
    clearContainer(main);
    main.appendChild(taskForm.html);
}

function displayTaskTableOn(main, tasksToDisplay, tagsList) {
    const taskTable = buildTaskTableHtml();
    for (let task of tasksToDisplay) {
        const newRow = buildTaskRowHtml(task);
        const taskForm = buildTaskForm(task, tagsList);
        newRow.addEventListener('click', () => displayTaskFormOn(main, taskForm));
        taskTable.appendChild(newRow);
    }
    main.appendChild(taskTable);
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




