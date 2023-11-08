import { buildPage } from './buildPage.js';
import { buildChecklistContainer, buildHeader, buildDateInputContainer, buildNotesContainer, buildShortDescContainer, buildTagsContainer, buildTaskRow, buildTitleDateContainer } from './htmlBuilder.js'

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

function displayTasksOn(main, tasksToDisplay, tagsList) {
    const taskTable = document.createElement('table');
    taskTable.classList.add('task-table');
    main.appendChild(taskTable);

    for (let task of tasksToDisplay) {
        const newRow = buildTaskRow(task.title, task.shortDesc, task.dueDate);
        newRow.addEventListener('click', () => displayTask(main, task, tagsList));
        taskTable.appendChild(newRow);
    }
}

function displayTask(main, task, tagsList) {
    clearContainer(main);
    
    const taskCard = document.createElement('form');
    main.appendChild(taskCard);
    
    taskCard.appendChild(buildTitleDateContainer(task));
    taskCard.appendChild(buildShortDescContainer(task));
    taskCard.appendChild(buildNotesContainer(task));
    taskCard.appendChild(buildChecklistContainer(task));
    taskCard.appendChild(buildTagsContainer(task, tagsList));

    const saveBtn = document.createElement('button');
    saveBtn.type = 'button';
    saveBtn.innerText = 'Save';
    taskCard.appendChild(saveBtn);
}

export const DisplayController = {
    displayTasksOn, 
    displayDateInputOn, 
    displayHeaderOn, 
    clearContainer, 
    deleteTableFrom, 
    initializePageDisplay
}