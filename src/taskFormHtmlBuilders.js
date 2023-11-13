import removeIcon from './img/close-circle.svg';
import { wrapHtmlElements, buildLabeledDateInputHtml} from './htmlBuilders'

const TITLE_MAX_LENGTH = 30;
const SHORT_DESC_MAX_LENGTH = 55;
const CHECKLIST_ITEM_MAX_LENGTH = 60;


function buildTitleInputHtml() {
    const titleInput = document.createElement('input');
    titleInput.id = 'title-input';
    titleInput.type = 'text';
    titleInput.maxLength = TITLE_MAX_LENGTH;
    titleInput.placeholder = 'Add a title';

    return titleInput;
}

function buildShortDescInputHtml() {
    const shortDescInput = document.createElement('input');
    shortDescInput.id = 'short-desc-input';
    shortDescInput.type = 'text';
    shortDescInput.maxLength = SHORT_DESC_MAX_LENGTH;
    shortDescInput.placeholder = 'Add a short description';

    return shortDescInput;
}

function buildNotesInputHtml() {
    const notesInput = document.createElement('textarea');
    notesInput.setAttribute('oninput', 'this.style.height = ""; this.style.height = this.scrollHeight + 5 + "px"');
    notesInput.id = 'notes-input';
    notesInput.placeholder = 'Add additional notes';

    return notesInput;
}

function buildChecklistHtml() {
    const checklist = document.createElement('ul');
    checklist.classList.add('checklist');

    return checklist;
}

function buildNewChecklistItemInputHtml() {
    const newChecklistItemInput = document.createElement('input');
    newChecklistItemInput.type = 'text';
    newChecklistItemInput.id = 'new-checklist-item-input';
    newChecklistItemInput.placeholder = 'Add a checklist item';

    return newChecklistItemInput;
}

function buildTaskTagsListHtml() {
    const taskTagsList = document.createElement('ul');
    taskTagsList.classList.add('tags-list');
    
    return taskTagsList;
}

function buildNewTagInputHtml() {
    const newTagInput = document.createElement('select');
    newTagInput.id = 'new-tag-input';
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.innerText = '--Add a tag--';
    newTagInput.appendChild(defaultOption);

    return newTagInput;
}

function buildTaskDeleteBtn() {
    const taskDeleteBtn = document.createElement('button');
    taskDeleteBtn.type = 'button';
    taskDeleteBtn.innerText = 'Delete Task';

    return taskDeleteBtn;
}

export function buildEmptyTaskFormHtml() {
    const form = document.createElement('form');
    
    const wrapperType = 'div';

    const titleInput = buildTitleInputHtml();
    const dueDateInputLabelText = 'Due Date:'
    const labeledDueDateInput = buildLabeledDateInputHtml(dueDateInputLabelText);
    const titleDate = wrapHtmlElements(wrapperType, titleInput, labeledDueDateInput);
    form.appendChild(titleDate);
    
    const shortDescInput = buildShortDescInputHtml();
    const shortDesc = wrapHtmlElements(wrapperType, shortDescInput);
    form.appendChild(shortDesc);
    
    const taskTagsList = buildTaskTagsListHtml();
    const newTagInput = buildNewTagInputHtml();
    const taskTagsListWithInput = wrapHtmlElements(wrapperType, taskTagsList, newTagInput);
    form.appendChild(taskTagsListWithInput);

    const notesInput = buildNotesInputHtml();
    const notes = wrapHtmlElements(wrapperType, notesInput);
    form.appendChild(notes);
    
    const checklist = buildChecklistHtml();
    const checklistItemInput = buildNewChecklistItemInputHtml();
    const checklistWithInput = wrapHtmlElements(wrapperType, checklist, checklistItemInput);
    checklistWithInput.classList.add('checklist-container');
    form.appendChild(checklistWithInput);

    const taskDeleteBtn = buildTaskDeleteBtn();
    taskDeleteBtn.id = 'task-delete-btn';
    form.appendChild(taskDeleteBtn);
    
    return form;
}

export function buildChecklistItemHtml(text, isChecked) {
    const newChecklistItem = document.createElement('li');
    const newItemCheckBox = document.createElement('input');
    newItemCheckBox.type = 'checkbox';
    if (isChecked) newItemCheckBox.setAttribute('checked', '');
    newChecklistItem.appendChild(newItemCheckBox);

    const newItemTextInput = document.createElement('input');
    newItemTextInput.type = 'text';
    newItemTextInput.maxLength = CHECKLIST_ITEM_MAX_LENGTH;
    newItemTextInput.value = text;
    newItemTextInput.placeholder = 'Enter checklist item description';
    newChecklistItem.appendChild(newItemTextInput);

    const newItemIcon = document.createElement('img');
    newItemIcon.src = removeIcon;
    newChecklistItem.appendChild(newItemIcon);

    return newChecklistItem;
}

export function buildTagListItemHtml(tag) {
    const newTagItem = document.createElement('li');
    const newItemText = document.createElement('p');
    newItemText.innerText = tag.text;
    newTagItem.appendChild(newItemText);
    const newItemIcon = document.createElement('img');
    newItemIcon.src = removeIcon;
    newTagItem.appendChild(newItemIcon);

    return newTagItem;
}

export function buildNewTagInputOptionHtml(tag) {
    const newOption = document.createElement('option');
    newOption.value = tag.text;
    newOption.innerText = tag.text;

    return newOption;
}