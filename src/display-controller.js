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

export function displayTask(task) {
    clearMain();
    const taskCard = document.createElement('form');
    main.appendChild(taskCard);
    
    const container1 = document.createElement('div');
    taskCard.appendChild(container1);
    const titleInputLabel = document.createElement('label');
    titleInputLabel.innerText = 'Title:';
    container1.appendChild(titleInputLabel);
    const titleInput = document.createElement('input');
    titleInput.id = 'title-input';
    titleInput.type = 'text';
    titleInput.value = task.title;
    titleInput.maxLength = 30;
    container1.appendChild(titleInput);
    const dueDateInputLabel = document.createElement('label');
    dueDateInputLabel.innerText = 'Due Date:';
    container1.appendChild(dueDateInputLabel);
    const dueDateInput = document.createElement('input');
    dueDateInput.id = 'due-date-input';
    dueDateInput.type = 'date';
    dueDateInput.value = format(task.dueDate, 'yyyy-MM-dd');
    container1.appendChild(dueDateInput);

    const container2 = document.createElement('div');
    taskCard.appendChild(container2);
    const descInputLabel = document.createElement('label');
    descInputLabel.innerText = 'Description:';
    container2.appendChild(descInputLabel);
    const descInput = document.createElement('input');
    descInput.id = 'desc-input';
    descInput.type = 'text';
    descInput.value = task.shortDesc;
    descInput.maxLength = 45;
    container2.appendChild(descInput);

    const container5 = document.createElement('div');
    taskCard.appendChild(container5);
    const tagsLabel = document.createElement('label');
    tagsLabel.innerText = 'Tags:';
    container5.appendChild(tagsLabel);
    const tags = document.createElement('ul');
    tags.classList.add('tags-list');
    tags.innerText = 'List of Tags goes here!';
    container5.appendChild(tags);

    const container3 = document.createElement('div');
    taskCard.appendChild(container3);
    const notesInputLabel = document.createElement('label');
    notesInputLabel.innerText = 'Notes:';
    container3.appendChild(notesInputLabel);
    const notesInput = document.createElement('textarea');
    notesInput.setAttribute('oninput', 'this.style.height = ""; this.style.height = this.scrollHeight + 5 + "px"');
    notesInput.id = 'notes-input';
    notesInput.value = task.notes;
    container3.appendChild(notesInput);
    
    const container4 = document.createElement('div');
    taskCard.appendChild(container4);
    const checklistLabel = document.createElement('label');
    checklistLabel.innerText = 'Checklist:';
    container4.appendChild(checklistLabel);
    const checklist = document.createElement('ul');
    checklist.classList.add('checklist');
    checklist.innerText = 'Check List goes here!';
    container4.appendChild(checklist);

    const saveBtn = document.createElement('button');
    saveBtn.type = 'button';
    saveBtn.innerText = 'Save Changes';
    taskCard.appendChild(saveBtn);
}

export function displayDateInput() {
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