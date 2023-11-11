import { format } from 'date-fns';

export function buildMainHeaderHtml(headerText) {
    const header = document.createElement('h1');
    header.innerText = headerText;

    return header;
}

export function buildTaskTableHtml() {
    const taskTable = document.createElement('table');
    taskTable.classList.add('task-table');

    return taskTable;
}

function buildTitleCellHtml(title) {
    const titleCell = document.createElement('td');
    titleCell.classList.add('title-cell');
    titleCell.innerText = String(title);
    
    return titleCell;
}

function buildShortDescCellHtml(shortDesc) {
    const shortDescCell = document.createElement('td');
    shortDescCell.classList.add('short-desc-cell');
    shortDescCell.innerText = String(shortDesc);
    
    return shortDescCell;
}

function buildDueDateCellHtml(dueDate) {
    const dueDateCell = document.createElement('td');
    dueDateCell.classList.add('due-date-cell');
    dueDateCell.innerText = format(dueDate, 'MM/dd/yyyy');

    return dueDateCell
}

export function buildTaskRowHtml(task) {
    const taskRow = document.createElement('tr');

    const titleCell = buildTitleCellHtml(task.title);
    taskRow.appendChild(titleCell);

    const shortDescCell = buildShortDescCellHtml(task.shortDesc);
    taskRow.appendChild(shortDescCell);

    const newDueDateCell = buildDueDateCellHtml(task.dueDate);
    taskRow.appendChild(newDueDateCell);

    return taskRow;
}