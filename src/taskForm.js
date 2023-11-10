import { buildEmptyTaskForm, buildChecklistItem, buildTagListItem } from "./taskFormBuilder";

export const taskForm = (() => {
    const html = buildEmptyTaskForm();

    const CHECKLIST = html.querySelector('.checklist');
    const TAG_LIST = html.querySelector('.tags-list');
    const SAVE_BTN = html.querySelector('#save-btn');

    const INPUTS = {
        date : html.querySelector('#date-input'),
        title: html.querySelector('#title-input'),
        shortDesc: html.querySelector('#short-desc-input'),
        notes: html.querySelector('#notes-input'),
        newChecklistItem: html.querySelector('#new-checklist-item-input'),
        newTagInput: html.querySelector('#new-tag-input'),
    }

    const populateTaskInfo = task => {
        INPUTS.date.value = task.dueDate;
        INPUTS.title.value = task.title;
        INPUTS.shortDesc.value = task.shortDesc;
        INPUTS.notes.value = task.notes;
        task.checklist.forEach(checklistItem => appendChecklistItem(checklistItem));
        task.tags.forEach(tag => appendTag(tag));
    }

    const appendChecklistItem = checklistItemToAppend => {
        const index = CHECKLIST.childElementCount;
        const newChecklistItem = buildChecklistItem(checklistItemToAppend, index);
        const removeBtn = newChecklistItem.querySelector('img');
        removeBtn.addEventListener('click', event => console.log(event));
        CHECKLIST.appendChild(newChecklistItem);
    }

    const removeCheckListItem = checklistItemToRemove => {
        CHECKLIST.removeChild(checklistItemToRemove);
    }

    const appendTag = tagToAppend => {
        const newTagItem = buildTagListItem(tagToAppend);
        const removeBtn = newTagItem.querySelector('img');
        removeBtn.addEventListener('click', event => console.log(event));
        TAG_LIST.appendChild(newTagItem);
    }

    const removeTag = tagItemToRemove => {
        TAG_LIST.removeChild(tagItemToRemove)
    }

    return {
        html,
        populateTaskInfo,
        appendChecklistItem,
        removeCheckListItem,
        appendTag,
        removeTag,
    }
})();