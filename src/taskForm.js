import { buildEmptyTaskForm, buildChecklistItem, buildTagListItem } from "./taskFormBuilder";
import { format } from 'date-fns';

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
        INPUTS.date.value = format(task.dueDate, 'yyyy-MM-dd');
        INPUTS.date.min = format(new Date(), 'yyyy-MM-dd');
        INPUTS.title.value = task.title;
        INPUTS.shortDesc.value = task.shortDesc;
        INPUTS.notes.value = task.notes;
        CHECKLIST.innerHTML = '';
        task.checklist.forEach(checklistItem => appendChecklistItem(checklistItem));
        TAG_LIST.innerHTML = '';
        task.tags.forEach(tag => appendTag(tag));
    }

    const appendChecklistItem = checklistItemToAppend => {
        const index = CHECKLIST.childElementCount;
        const newChecklistItem = buildChecklistItem(checklistItemToAppend.text, checklistItemToAppend.isChecked, index);
        const removeBtn = newChecklistItem.querySelector('img');
        removeBtn.addEventListener('click', event => CHECKLIST.removeChild(event.currentTarget.parentNode));
        CHECKLIST.appendChild(newChecklistItem);
    }

    const removeCheckListItem = checklistItemToRemove => {
        CHECKLIST.removeChild(checklistItemToRemove);
    }

    const appendTag = tagToAppend => {
        const newTagItem = buildTagListItem(tagToAppend);
        const removeBtn = newTagItem.querySelector('img');
        removeBtn.addEventListener('click', event => TAG_LIST.removeChild(event.currentTarget.parentNode));
        TAG_LIST.appendChild(newTagItem);
    }

    const removeTag = tagItemToRemove => {
        TAG_LIST.removeChild(tagItemToRemove);
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