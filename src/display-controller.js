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
        newRow.addEventListener('click', () => displayTask(task))
        taskTable.appendChild(newRow);
    }
}

function displayTask(task) {
    clearMain();
    const taskCard = document.createElement('form');
    main.appendChild(taskCard);
    
    const titleInputLabel = document.createElement('label');
    titleInputLabel.innerText = 'Title:';
    taskCard.appendChild(titleInputLabel);
    const titleInput = document.createElement('input');
    titleInput.id = 'title-input';
    titleInput.type = 'text';
    titleInput.value = task.title;
    taskCard.appendChild(titleInput);
    
    const dueDateInputLabel = document.createElement('label');
    dueDateInputLabel.innerText = 'Due Date:';
    taskCard.appendChild(dueDateInputLabel);
    const dueDateInput = document.createElement('input');
    dueDateInput.id = 'due-date-input';
    dueDateInput.type = 'date';
    dueDateInput.value = format(task.dueDate, 'yyyy-MM-dd');
    taskCard.appendChild(dueDateInput);

    const descInputLabel = document.createElement('label');
    descInputLabel.innerText = 'Description:';
    taskCard.appendChild(descInputLabel);
    const descInput = document.createElement('input');
    descInput.id = 'desc-input';
    descInput.type = 'text';
    descInput.value = task.shortDesc;
    taskCard.appendChild(descInput);

    const notesInputLabel = document.createElement('label');
    notesInputLabel.innerText = 'Notes:';
    taskCard.appendChild(notesInputLabel);
    const notesInput = document.createElement('input');
    notesInput.id = 'notes-input';
    notesInput.type = 'textarea';
    notesInput.value = task.notes;
    taskCard.appendChild(notesInput);

    const checklistLabel = document.createElement('label');
    checklistLabel.innerText = 'Checklist:';
    taskCard.appendChild(checklistLabel);
    const checklist = document.createElement('ul');
    checklist.classList.add('checklist');
    checklist.innerText = 'Check List goes here!';
    taskCard.appendChild(checklist);

    const tagsLabel = document.createElement('label');
    tagsLabel.innerText = 'Tags:';
    taskCard.appendChild(tagsLabel);
    const tags = document.createElement('ul');
    tags.classList.add('tags-list');
    tags.innerText = 'List of Tags goes here!';
    taskCard.appendChild(tags);

    const saveBtn = document.createElement('button');
    saveBtn.type = 'button';
    saveBtn.innerText = 'Save Changes';
    taskCard.appendChild(saveBtn);
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