import { format } from 'date-fns';
import { buildPage } from './buildPage.js';
import removeIcon from './img/close-circle.svg';

function initializePageDisplay(body) { body.appendChild(buildPage()) }

function clearContainer(container) { container.innerHTML = '' }

function deleteTableFrom(parent) { 
    const table = parent.querySelector('table');
    if (table) parent.removeChild(table);
}

function displayMainHeader(main, mainHeaderText) { 
    const mainHeader = document.createElement('h1');
    mainHeader.innerText = mainHeaderText;
    main.appendChild(mainHeader); 
}

function displayDateInput(main) {
    const dateInputContainer = document.createElement('div');
    const dateInputLabel = document.createElement('label');
    dateInputLabel.innerText = 'Display tasks due between now and:';
    dateInputLabel.id = 'upcoming-date-label';
    dateInputContainer.appendChild(dateInputLabel);
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'upcoming-date-input';
    dateInput.min = new Date();
    dateInputContainer.appendChild(dateInput);
    main.appendChild(dateInputContainer);
}

function buildTaskRow(task) {
    const newRow = document.createElement('tr');

    const newTitleCell = document.createElement('td');
    newTitleCell.classList.add('title-cell');
    newTitleCell.innerText = String(task.title);
    newRow.appendChild(newTitleCell);

    const newDescCell = document.createElement('td');
    newDescCell.classList.add('desc-cell');
    newDescCell.innerText = String(task.shortDesc);
    newRow.appendChild(newDescCell);

    const newDueDateCell = document.createElement('td');
    newDueDateCell.classList.add('due-date-cell');
    newDueDateCell.innerText = format(task.dueDate, 'MM/dd/yyyy');
    newRow.appendChild(newDueDateCell);

    return newRow;
}

function displayTasks(main, tasksToDisplay, tagsList) {
    const taskTable = document.createElement('table');
    taskTable.classList.add('task-table');
    main.appendChild(taskTable);

    for (let task of tasksToDisplay) {
        const newRow = buildTaskRow(task);
        newRow.addEventListener('click', () => displayTask(main, task, tagsList));
        taskTable.appendChild(newRow);
    }
}

function buildTitleDateContainer(task) {
    const container = document.createElement('div');
    
    const titleInput = document.createElement('input');
    titleInput.id = 'title-input';
    titleInput.type = 'text';
    titleInput.value = task.title;
    titleInput.maxLength = 30;
    titleInput.placeholder = 'Add a title';
    container.appendChild(titleInput);
    
    const dueDateInputLabel = document.createElement('label');
    dueDateInputLabel.innerText = 'Due Date:';
    container.appendChild(dueDateInputLabel);
    
    const dueDateInput = document.createElement('input');
    dueDateInput.id = 'due-date-input';
    dueDateInput.type = 'date';
    dueDateInput.value = format(task.dueDate, 'yyyy-MM-dd');
    container.appendChild(dueDateInput);

    return container;
}

function buildShortDescContainer(task) {
    const container = document.createElement('div');
    
    const descInput = document.createElement('input');
    descInput.id = 'desc-input';
    descInput.type = 'text';
    descInput.value = task.shortDesc;
    descInput.maxLength = 55;
    descInput.placeholder = 'Add a short description';
    container.appendChild(descInput);

    return container;
}

function buildNotesContainer(task) {
    const container = document.createElement('div');

    const notesInput = document.createElement('textarea');
    notesInput.setAttribute('oninput', 'this.style.height = ""; this.style.height = this.scrollHeight + 5 + "px"');
    notesInput.id = 'notes-input';
    notesInput.value = task.notes;
    notesInput.placeholder = 'Add additional notes';
    container.appendChild(notesInput);

    return container;
}

function buildChecklistContainer(task) {
    const container = document.createElement('div');
    container.id = 'checklist-container';
    
    const checklist = document.createElement('ul');
    checklist.classList.add('checklist');
    container.appendChild(checklist);
    
    task.checklist.forEach((checklistItem, index) => {
        const newItem = document.createElement('li');
        newItem.id = 'checklist-item-' + String(index);
        checklist.appendChild(newItem);
        const newItemCheckBox = document.createElement('input');
        newItemCheckBox.type = 'checkbox';
        if (checklistItem.isChecked) newItemCheckBox.setAttribute('checked', '');
        newItemCheckBox.id = 'checklist-box-' + String(index);
        newItem.appendChild(newItemCheckBox);
        const newItemTextInput = document.createElement('input');
        newItemTextInput.id = 'checklist-text-' + String(index);
        newItemTextInput.type = 'text';
        newItemTextInput.maxLength = 60;
        newItemTextInput.value = checklistItem.text;
        newItemTextInput.placeholder = 'Add a checklist item';
        newItem.appendChild(newItemTextInput);
        const newItemIcon = document.createElement('img');
        newItemIcon.src = removeIcon;
        newItem.appendChild(newItemIcon);
    })
    
    const newChecklistInput = document.createElement('input');
    newChecklistInput.type = 'text';
    newChecklistInput.id = 'new-checklist-item';
    newChecklistInput.placeholder = 'Add a checklist item'
    container.appendChild(newChecklistInput);

    return container;
}

function buildTagsContainer(task, tagsList) {
    const container = document.createElement('div');

    const tags = document.createElement('ul');
    tags.classList.add('tags-list');
    container.appendChild(tags);
    
    task.tags.forEach(tag => {
        const newItem = document.createElement('li');
        newItem.id = tag + '-btn';
        tags.appendChild(newItem);
        const newItemText = document.createElement('p');
        newItemText.innerText = tag;
        newItem.appendChild(newItemText);
        const newItemIcon = document.createElement('img');
        newItemIcon.src = removeIcon;
        newItem.appendChild(newItemIcon);
    })
    
    const tagsInput = document.createElement('select');
    tagsInput.id = 'tag-input';
    container.appendChild(tagsInput);
    
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.innerText = '--Add a tag--';
    tagsInput.appendChild(defaultOption);
    
    tagsList.forEach(tag => {
        if (!task.tags.includes(tag)) {
            const newOption = document.createElement('option');
            newOption.value = tag;
            newOption.innerText = tag;
            tagsInput.appendChild(newOption);
        }
    })

    return container;
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
    displayTasks, 
    displayDateInput, 
    displayMainHeader, 
    clearContainer, 
    deleteTableFrom, 
    initializePageDisplay
}