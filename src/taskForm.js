import { format, endOfDay, parseISO } from 'date-fns';
import { buildEmptyTaskForm, buildChecklistItem, buildTagListItem } from "./taskFormBuilder";

export function buildTaskForm(task, tagsList) {
    return (() => {
        const html = buildEmptyTaskForm();
        const CHECKLIST = html.querySelector('.checklist');
        const TAG_LIST = html.querySelector('.tags-list');
    
        const INPUTS = {
            dueDate : html.querySelector('#date-input'),
            title: html.querySelector('#title-input'),
            shortDesc: html.querySelector('#short-desc-input'),
            notes: html.querySelector('#notes-input'),
            newChecklistItem: html.querySelector('#new-checklist-item-input'),
            newTagInput: html.querySelector('#new-tag-input'),
        }
        
        const _appendNewChecklistItem = (checklistItemToAppend) => {
            const newChecklistItemText = checklistItemToAppend.text;
            const newChecklistItemIsChecked = checklistItemToAppend.isChecked;
            const newChecklistItem = buildChecklistItem(newChecklistItemText, newChecklistItemIsChecked);
            CHECKLIST.appendChild(newChecklistItem);
            const removeBtn = newChecklistItem.querySelector('img');
            removeBtn.addEventListener('click', () => {
                CHECKLIST.removeChild(newChecklistItem);
                task.deleteChecklistItem(checklistItemToAppend);
            });        
            const newChecklistItemTextInput = newChecklistItem.querySelector('input[type=text]');
            newChecklistItemTextInput.addEventListener('keyup', () => checklistItemToAppend.text = newChecklistItemTextInput.value);
            const newChecklistItemCheckbox = newChecklistItem.querySelector('input[type=checkbox]');
            newChecklistItemCheckbox.addEventListener('change', () => checklistItemToAppend.toggleCheck());
        }

        const _appendNewTag = tagToAppend => {
            const newTagItem = buildTagListItem(tagToAppend);
            const removeBtn = newTagItem.querySelector('img');
            TAG_LIST.appendChild(newTagItem);
            removeBtn.addEventListener('click', () => {
                TAG_LIST.removeChild(newTagItem);
                task.removeTag(tagToAppend);
            })
        }
    
        const _updateAvailableNewTags = () => {
            while (INPUTS.newTagInput.childElementCount > 1) INPUTS.newTagInput.removeChild(INPUTS.newTagInput.lastChild);
            tagsList.forEach(tag => {
                if (!task.tags.includes(tag)) {
                    const newOption = document.createElement('option');
                    newOption.value = tag;
                    newOption.innerText = tag;
                    INPUTS.newTagInput.appendChild(newOption);
                }
            })
        }

        INPUTS.dueDate.value = format(task.dueDate, 'yyyy-MM-dd');
        INPUTS.dueDate.min = format(new Date(), 'yyyy-MM-dd');
        INPUTS.title.value = task.title;
        INPUTS.shortDesc.value = task.shortDesc;
        INPUTS.notes.value = task.notes;
        task.checklist.forEach(checklistItem => _appendNewChecklistItem(checklistItem));
        task.tags.forEach(tag => _appendNewTag(tag));
        INPUTS.dueDate.addEventListener('change', () => task.dueDate = endOfDay(parseISO(INPUTS.dueDate.value)));
        INPUTS.title.addEventListener('keyup', () => task.title = INPUTS.title.value);
        INPUTS.shortDesc.addEventListener('keyup', () => task.shortDesc = INPUTS.shortDesc.value);
        INPUTS.notes.addEventListener('keyup', () => task.notes = INPUTS.notes.value);
        INPUTS.newChecklistItem.addEventListener('mouseup', () => {
            task.createChecklistItem('');
            const newItem = task.checklist.at(-1);
            _appendNewChecklistItem(newItem);
            const newChecklistItem = CHECKLIST.lastElementChild;
            const newChecklistItemTextInput = newChecklistItem.querySelector('input[type=text]');
            newChecklistItemTextInput.focus();
        })
        INPUTS.newTagInput.addEventListener('mousedown', () => _updateAvailableNewTags());
        INPUTS.newTagInput.addEventListener('change', event => {
            task.addTag(event.target.value);
            _appendNewTag(event.target.value);
            INPUTS.newTagInput.value = '';
        });
    
        return {
            html
        }

    })();
}