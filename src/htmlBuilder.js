import { format } from 'date-fns';
import { DisplayController as DC } from './displayController';
import { buildTaskForm } from './taskForm';

export function buildTableHeader(headerText) {
    const header = document.createElement('h1');
    header.innerText = headerText;

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
    const dateInput = buildDateInput(defaultDate);
    container.appendChild(dateInput);

    return container;
}

function buildTaskRow(title, shortDesc, dueDate) {
    const newTaskRow = document.createElement('tr');

    const newTitleCell = document.createElement('td');
    newTitleCell.classList.add('title-cell');
    newTitleCell.innerText = String(title);
    newTaskRow.appendChild(newTitleCell);

    const newDescCell = document.createElement('td');
    newDescCell.classList.add('desc-cell');
    newDescCell.innerText = String(shortDesc);
    newTaskRow.appendChild(newDescCell);

    const newDueDateCell = document.createElement('td');
    newDueDateCell.classList.add('due-date-cell');
    newDueDateCell.innerText = format(dueDate, 'MM/dd/yyyy');
    newTaskRow.appendChild(newDueDateCell);

    return newTaskRow;
}

export function buildTaskTable(main, tasksToDisplay, tagsList) {
    const taskTable = document.createElement('table');
    taskTable.classList.add('task-table');

    for (let task of tasksToDisplay) {
        const newRow = buildTaskRow(task.title, task.shortDesc, task.dueDate);
        const taskForm = buildTaskForm(task, tagsList);
        newRow.addEventListener('click', () => DC.displayTaskFormOn(main, taskForm));
        taskTable.appendChild(newRow);
    }

    return taskTable;
}