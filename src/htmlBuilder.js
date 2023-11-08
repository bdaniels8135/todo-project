import { format } from 'date-fns';
import removeIcon from './img/close-circle.svg';
import { DisplayController as DC } from './displayController'

export function buildHeader(text) {
    const header = document.createElement('h1');
    header.innerText = text;

    return header;
}

function buildLabel(labelText) {
    const label = document.createElement('label');
    label.innerText = labelText;

    return label;
}

function buildDateInput(defaultDate) {
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'date-input';
    dateInput.value = format(defaultDate, 'yyyy-MM-dd');
    dateInput.min = format(new Date(), 'yyyy-MM-dd');

    return dateInput;
}

export function buildDateInputContainer(labelText, defaultDate) {
    const container = document.createElement('div');
    const label = buildLabel(labelText);
    container.appendChild(label);
    const dateInput = buildDateInput(defaultDate)
    container.appendChild(dateInput);

    return container;
}

function buildTaskRow(title, shortDesc, dueDate) {
    const newRow = document.createElement('tr');

    const newTitleCell = document.createElement('td');
    newTitleCell.classList.add('title-cell');
    newTitleCell.innerText = String(title);
    newRow.appendChild(newTitleCell);

    const newDescCell = document.createElement('td');
    newDescCell.classList.add('desc-cell');
    newDescCell.innerText = String(shortDesc);
    newRow.appendChild(newDescCell);

    const newDueDateCell = document.createElement('td');
    newDueDateCell.classList.add('due-date-cell');
    newDueDateCell.innerText = format(dueDate, 'MM/dd/yyyy');
    newRow.appendChild(newDueDateCell);

    return newRow;
}

export function buildTaskTable(main, tasksToDisplay, tagsList) {
    const taskTable = document.createElement('table');
    taskTable.classList.add('task-table');

    for (let task of tasksToDisplay) {
        const newRow = buildTaskRow(task.title, task.shortDesc, task.dueDate);
        newRow.addEventListener('click', () => DC.displayTaskFormOn(main, task, tagsList));
        taskTable.appendChild(newRow);
    }

    return taskTable;
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
    
    const labelText = 'Due Date:';
    const defaultDate = task.dueDate;
    const dateInputContainer = buildDateInputContainer(labelText, defaultDate);
    container.appendChild(dateInputContainer);

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

export function buildTaskForm(task, tagsList) {
    const form = document.createElement('form');
    
    const titleDateContainer = buildTitleDateContainer(task);
    form.appendChild(titleDateContainer);
    
    const shortDescContainer = buildShortDescContainer(task)
    form.appendChild(shortDescContainer);
    
    const notesContainer = buildNotesContainer(task);
    form.appendChild(notesContainer);
    
    const checklistContainer = buildChecklistContainer(task);
    form.appendChild(checklistContainer);
    
    const tagsContainer = buildTagsContainer(task, tagsList)
    form.appendChild(tagsContainer);

    const saveBtn = document.createElement('button');
    saveBtn.type = 'button';
    saveBtn.innerText = 'Save';
    form.appendChild(saveBtn);

    return form;
}