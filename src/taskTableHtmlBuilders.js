import { format } from 'date-fns';

export function buildTaskTableHeaderHtml(headerText) {
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
    titleCell.innerText = title ? title : '(NO TITLE)';
    
    return titleCell;
}

function buildShortDescCellHtml(shortDesc) {
    const shortDescCell = document.createElement('td');
    shortDescCell.classList.add('short-desc-cell');
    shortDescCell.innerText = shortDesc;
    
    return shortDescCell;
}

function buildDueDateCellHtml(dueDate) {
    const dueDateCell = document.createElement('td');
    dueDateCell.classList.add('due-date-cell');
    dueDateCell.innerText = format(dueDate, 'MM/dd/yyyy');

    return dueDateCell
}

export function buildTaskRowHtml(title, shortDesc, dueDate) {
    const taskRow = document.createElement('tr');

    const titleCell = buildTitleCellHtml(title);
    taskRow.appendChild(titleCell);

    const shortDescCell = buildShortDescCellHtml(shortDesc);
    taskRow.appendChild(shortDescCell);

    const newDueDateCell = buildDueDateCellHtml(dueDate);
    taskRow.appendChild(newDueDateCell);

    return taskRow;
}