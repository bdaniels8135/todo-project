import { tagsList } from "./index";
import { buildEmptyTaskForm, buildChecklistItem, buildTagListItem } from "./taskFormBuilder";
import { format } from 'date-fns';

export const taskForm = (() => {
    const html = buildEmptyTaskForm();

    const CHECKLIST = html.querySelector('.checklist');
    const TAG_LIST = html.querySelector('.tags-list');
    const SAVE_BTN = html.querySelector('#save-btn');
    let currentTags;

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
        task.checklist.forEach(checklistItem => appendNewChecklistItem(checklistItem.text, checklistItem.isChecked));
        TAG_LIST.innerHTML = '';
        currentTags = [];
        task.tags.forEach(tag => currentTags.push(tag));
        currentTags.forEach(tag => appendNewTag(tag));
    }

    const appendNewChecklistItem = (text, isChecked) => {
        const newChecklistItem = buildChecklistItem(text, isChecked);
        const removeBtn = newChecklistItem.querySelector('img');
        removeBtn.addEventListener('click', () => CHECKLIST.removeChild(newChecklistItem));
        CHECKLIST.appendChild(newChecklistItem);
    }

    const appendNewTag = tagToAppend => {
        const newTagItem = buildTagListItem(tagToAppend);
        const removeBtn = newTagItem.querySelector('img');
        removeBtn.addEventListener('click', () => {
            currentTags = currentTags.filter(tag => tag !== tagToAppend);
            TAG_LIST.removeChild(newTagItem);
        })
        TAG_LIST.appendChild(newTagItem);
        currentTags.push(tagToAppend);
    }

    const updateAvailableTags = () => {
        while (INPUTS.newTagInput.childElementCount > 1) INPUTS.newTagInput.removeChild(INPUTS.newTagInput.lastChild)
        tagsList.forEach(tag => {
            if (!currentTags.includes(tag)) {
                const newOption = document.createElement('option');
                newOption.value = tag;
                newOption.innerText = tag;
                INPUTS.newTagInput.appendChild(newOption);
            }
        })
    }

    INPUTS.newChecklistItem.addEventListener('mouseup', () => {
        appendNewChecklistItem('', false);
        const newChecklistItem = CHECKLIST.lastElementChild;
        newChecklistItem.querySelector('input[type=text]').focus();
    })

    INPUTS.newTagInput.addEventListener('mousedown', () => updateAvailableTags());

    INPUTS.newTagInput.addEventListener('change', event => {
        appendNewTag(event.target.value);
        INPUTS.newTagInput.value = '';
    });

    return {
        html,
        populateTaskInfo,
    }
})();