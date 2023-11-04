import { format } from 'date-fns'

const main = document.querySelector('main');

export function displayTasks(tasksToDisplay) {
    main.innerHTML = '';
    const taskTable = document.createElement('table');
    taskTable.classList.add('task-table');
    main.appendChild(taskTable);

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