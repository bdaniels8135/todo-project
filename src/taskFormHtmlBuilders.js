import removeIcon from './img/close-circle.svg';
import { wrapHtmlElements, buildInputHtml, buildSelectOption, buildLabeledDateInputHtml, buildIconHtml, buildTextHtml} from './htmlBuilders'

const TITLE_MAX_LENGTH = 30;
const SHORT_DESC_MAX_LENGTH = 55;
const CHECKLIST_ITEM_MAX_LENGTH = 60;
const TITLE_INPUT_PLACEHOLDER = 'Add a title';
const SHORT_DESC_PLACEHOLDER = 'Add a short description';
const NOTES_PLACEHOLDER = 'Add additional notes';
const NEW_CHECKLIST_ITEM_INPUT_PLACEHOLDER = 'Add a checklist item';
const TASK_TAG_SELECT_DEFAULT_OPTION_TEXT = '--Add a tag--';
const DUE_DATE_INPUT_LABEL_TEXT = 'Due Date:';
const TASK_DELETE_BTN_TEXT = 'Delete Task'
const CHECKLIST_ITEM_TEXT_INPUT_PLACEHOLDER = 'Enter checklist item description';
const CHECKLIST_ITEM_DELETE_ICON = removeIcon;
const TASK_TAG_LIST_ITEM_DELETE_ICON = removeIcon;

function buildTitleInputHtml() {
    const titleInputHtml = buildInputHtml('text', 'title-input');
    titleInputHtml.maxLength = TITLE_MAX_LENGTH;
    titleInputHtml.placeholder = TITLE_INPUT_PLACEHOLDER;

    return titleInputHtml;
}

function buildShortDescInputHtml() {
    const shortDescInputHtml = buildInputHtml('text', 'short-desc-input');
    shortDescInputHtml.maxLength = SHORT_DESC_MAX_LENGTH;
    shortDescInputHtml.placeholder = SHORT_DESC_PLACEHOLDER;

    return shortDescInputHtml;
}

function buildNotesInputHtml() {
    const notesInputHtml = buildInputHtml('textarea', 'notes-input');
    notesInputHtml.setAttribute('oninput', 'this.style.height = ""; this.style.height = this.scrollHeight + 5 + "px"');
    notesInputHtml.placeholder = NOTES_PLACEHOLDER;

    return notesInputHtml;
}

function buildChecklistHtml() {
    const checklistHtml = document.createElement('ul');
    checklistHtml.classList.add('checklist');

    return checklistHtml;
}

function buildNewChecklistItemInputHtml() {
    const newChecklistItemInputHtml = buildInputHtml('text', 'new-checklist-item-input');
    newChecklistItemInputHtml.placeholder = NEW_CHECKLIST_ITEM_INPUT_PLACEHOLDER;

    return newChecklistItemInputHtml;
}

function buildTaskTagsListHtml() {
    const taskTagsListHtml = document.createElement('ul');
    taskTagsListHtml.classList.add('task-tags-list');
    
    return taskTagsListHtml;
}

function buildNewTaskTagSelectHtml() {
    const newTaskTagSelectHtml = document.createElement('select');
    newTaskTagSelectHtml.id = 'new-task-tag-select';
    const newTaskTagInputDefaultOption = buildSelectOption(TASK_TAG_SELECT_DEFAULT_OPTION_TEXT, '');
    newTaskTagSelectHtml.appendChild(newTaskTagInputDefaultOption);

    return newTaskTagSelectHtml;
}

function buildTaskDeleteBtnHtml() {
    const taskDeleteBtnHtml = buildInputHtml('button', 'task-delete-btn');
    taskDeleteBtnHtml.value = TASK_DELETE_BTN_TEXT;

    return taskDeleteBtnHtml;
}

export function buildEmptyTaskFormHtml() {
    const wrapperType = 'div';

    const titleInputHtml = buildTitleInputHtml();
    const labeledDueDateInputHtml = buildLabeledDateInputHtml(DUE_DATE_INPUT_LABEL_TEXT);
    const titleDateHtml = wrapHtmlElements(wrapperType, titleInputHtml, labeledDueDateInputHtml);

    const shortDescInputHtml = buildShortDescInputHtml();
    const shortDescHtml = wrapHtmlElements(wrapperType, shortDescInputHtml);
    
    const taskTagsListHtml = buildTaskTagsListHtml();
    const newTaskTagSelectHtml = buildNewTaskTagSelectHtml();
    const taskTagsListWithSelectHtml = wrapHtmlElements(wrapperType, taskTagsListHtml, newTaskTagSelectHtml);

    const notesInputHtml = buildNotesInputHtml();
    const notesHtml = wrapHtmlElements(wrapperType, notesInputHtml);
    
    const checklistHtml = buildChecklistHtml();
    const newChecklistItemInputHtml = buildNewChecklistItemInputHtml();
    const checklistWithInputHtml = wrapHtmlElements(wrapperType, checklistHtml, newChecklistItemInputHtml);
    checklistWithInputHtml.classList.add('checklist-container');

    const taskDeleteBtnHtml = buildTaskDeleteBtnHtml();

    const formHtml = wrapHtmlElements('form', titleDateHtml, shortDescHtml, taskTagsListWithSelectHtml, notesHtml, checklistWithInputHtml, taskDeleteBtnHtml);

    return formHtml;
}

export function buildChecklistItemHtml(text, isChecked) {
    const itemCheckBoxHtml = buildInputHtml('checkbox');
    if (isChecked) itemCheckBoxHtml.setAttribute('checked', '');
    const itemTextInputHtml = buildInputHtml('text');
    itemTextInputHtml.maxLength = CHECKLIST_ITEM_MAX_LENGTH;
    itemTextInputHtml.value = text;
    itemTextInputHtml.placeholder = CHECKLIST_ITEM_TEXT_INPUT_PLACEHOLDER;
    const itemDeleteIconHtml = buildIconHtml(CHECKLIST_ITEM_DELETE_ICON);
    const newChecklistItemHtml = wrapHtmlElements('li', itemCheckBoxHtml, itemTextInputHtml, itemDeleteIconHtml);

    return newChecklistItemHtml;
}

export function buildTaskTagListItemHtml(tagText) {
    const itemTextHtml = buildTextHtml(tagText);
    const itemDeleteIconHtml = buildIconHtml(TASK_TAG_LIST_ITEM_DELETE_ICON);
    const taskTagListItemHtml = wrapHtmlElements('li', itemTextHtml, itemDeleteIconHtml);

    return taskTagListItemHtml;
}