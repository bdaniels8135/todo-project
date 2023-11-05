import { format } from 'date-fns';

const main = document.querySelector('main');

export function clearMain() { main.innerHTML = '' }

export function clearTaskTable(parentElement) { 
    const table = main.querySelector('table');
    if (table) main.removeChild(table);
}

export function displayMainHeader(mainHeaderText) { 
    const mainHeader = document.createElement('h1');
    mainHeader.innerText = mainHeaderText;
    main.appendChild(mainHeader); 
}

export function displayTasks(tasksToDisplay) {
    const taskTable = document.createElement('table');
    taskTable.classList.add('task-table');
    main.appendChild(taskTable);

    for (let task of tasksToDisplay) {
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
        taskTable.appendChild(newRow);
    }
}

export function displayDateInput() {
    const dateInputContainer = document.createElement('div');
    const dateInputLabel = document.createElement('label');
    dateInputLabel.innerText = 'Display tasks due between now and:';
    dateInputLabel.id = 'upcoming-date-label'
    dateInputContainer.appendChild(dateInputLabel);
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'upcoming-date-input';
    dateInput.min = new Date();
    dateInputContainer.appendChild(dateInput);
    main.appendChild(dateInputContainer);
}