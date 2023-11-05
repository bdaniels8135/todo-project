import { format } from 'date-fns';

const main = document.querySelector('main');
const mainHeader = document.querySelector('main h1');
const mainContent = document.querySelector('article');

export function clearContent() { mainContent.innerHTML = '' }

export function updateMainHeader(mainHeaderText) { mainHeader.innerText = mainHeaderText }

export function displayTasks(tasksToDisplay) {
    const taskTable = document.createElement('table');
    taskTable.classList.add('task-table');
    mainContent.appendChild(taskTable);

    for (let task of tasksToDisplay) {
        const newRow = document.createElement('tr');
        const newDueDateCell = document.createElement('td');
        newDueDateCell.innerText = format(task.dueDate, 'MM/dd/yyyy');
        newRow.appendChild(newDueDateCell);
        const newTitleCell = document.createElement('td');
        newTitleCell.innerText = String(task.title);
        newRow.appendChild(newTitleCell);
        const newDescCell = document.createElement('td');
        newDescCell.innerText = String(task.shortDesc);
        newRow.appendChild(newDescCell);
        taskTable.appendChild(newRow);
    }
}

export function displayDateInput() {
    const dateInputLabel = document.createElement('label');
    dateInputLabel.innerText = 'Display tasks due between now and:';
    main.insertBefore(dateInputLabel, mainContent);
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'upcoming-date';
    dateInput.min = new Date();
    main.insertBefore(dateInput, mainContent);
}