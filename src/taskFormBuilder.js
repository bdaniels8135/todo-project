import removeIcon from './img/close-circle.svg';
import { format } from 'date-fns';

function packageElements(...elements) {
    const container = document.createElement('div');
    elements.forEach(element => container.appendChild(element));

    return container;
}

function buildLabel(labelText) {
    const label = document.createElement('label');
    label.innerText = labelText;

    return label;
}

function buildDateInput() {
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'date-input';
    dateInput.min = format(new Date(), 'yyyy-MM-dd');

    return dateInput;
}

function buildLabeledDateInput(labelText) {
    const label = buildLabel(labelText);
    const dateInput = buildDateInput();

    return packageElements(label, dateInput);
}

function buildTitleInput() {
    const titleInput = document.createElement('input');
    titleInput.id = 'title-input';
    titleInput.type = 'text';
    titleInput.maxLength = 30;
    titleInput.placeholder = 'Add a title';

    return titleInput;
}

function buildShortDescInput() {
    const shortDescInput = document.createElement('input');
    shortDescInput.id = 'short-desc-input';
    shortDescInput.type = 'text';
    shortDescInput.maxLength = 55;
    shortDescInput.placeholder = 'Add a short description';

    return shortDescInput;
}

function buildNotesInput() {
    const notesInput = document.createElement('textarea');
    notesInput.setAttribute('oninput', 'this.style.height = ""; this.style.height = this.scrollHeight + 5 + "px"');
    notesInput.id = 'notes-input';
    notesInput.placeholder = 'Add additional notes';

    return notesInput;
}

function buildChecklist() {
    const checklist = document.createElement('ul');
    checklist.classList.add('checklist');

    return checklist;
}

function buildChecklistItemInput() {
    const newChecklistItemInput = document.createElement('input');
    newChecklistItemInput.type = 'text';
    newChecklistItemInput.id = 'new-checklist-item-input';
    newChecklistItemInput.placeholder = 'Add a checklist item';

    return newChecklistItemInput;
}

function buildTags() {
    const tags = document.createElement('ul');
    tags.classList.add('tags-list');
    
    return tags;
}

function buildNewTagInput() {
    const newTagInput = document.createElement('select');
    newTagInput.id = 'new-tag-input';
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.innerText = '--Add a tag--';
    newTagInput.appendChild(defaultOption);

    return newTagInput;
}

function buildSaveBtn() {
    const saveBtn = document.createElement('button');
    saveBtn.id = 'save-btn'
    saveBtn.type = 'button';
    saveBtn.innerText = 'Save';

    return saveBtn;
}

export function buildEmptyTaskForm() {
    const form = document.createElement('form');
    
    const titleInput = buildTitleInput();
    const dueDateInput = buildLabeledDateInput('Due Date:');
    const titleDate = packageElements(titleInput, dueDateInput);
    form.appendChild(titleDate);
    
    const shortDescInput = buildShortDescInput();
    const shortDesc = packageElements(shortDescInput);
    form.appendChild(shortDesc);
    
    const notesInput = buildNotesInput();
    const notes = packageElements(notesInput);
    form.appendChild(notes);
    
    const checklist = buildChecklist();
    const checklistItemInput = buildChecklistItemInput();
    const checklistWithInput = packageElements(checklist, checklistItemInput);
    checklistWithInput.classList.add('checklist-container');
    form.appendChild(checklistWithInput);
    
    const tags = buildTags();
    const newTagInput = buildNewTagInput();
    const tagsWithInput = packageElements(tags, newTagInput);
    form.appendChild(tagsWithInput);

    const saveBtn = buildSaveBtn();
    form.appendChild(saveBtn);

    return form;
}

export function buildChecklistItem(text, isChecked, index) {
    const newChecklistItem = document.createElement('li');
    newChecklistItem.id = 'checklist-item-' + String(index);
    
    const newItemCheckBox = document.createElement('input');
    newItemCheckBox.type = 'checkbox';
    if (isChecked) newItemCheckBox.setAttribute('checked', '');
    newItemCheckBox.id = 'checklist-box-' + String(index);
    newChecklistItem.appendChild(newItemCheckBox);

    const newItemTextInput = document.createElement('input');
    newItemTextInput.id = 'checklist-text-' + String(index);
    newItemTextInput.type = 'text';
    newItemTextInput.maxLength = 60;
    newItemTextInput.value = text;
    newItemTextInput.placeholder = 'Enter checklist item description';
    newChecklistItem.appendChild(newItemTextInput);

    const newItemIcon = document.createElement('img');
    newItemIcon.src = removeIcon;
    newChecklistItem.appendChild(newItemIcon);

    return newChecklistItem;
}


export function buildTagListItem(tag) {
    const newTagItem = document.createElement('li');
    const newItemText = document.createElement('p');
    newItemText.innerText = tag;
    newTagItem.appendChild(newItemText);
    const newItemIcon = document.createElement('img');
    newItemIcon.src = removeIcon;
    newTagItem.appendChild(newItemIcon);

    return newTagItem;
}