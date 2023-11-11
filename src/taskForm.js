import { format, endOfDay, parseISO } from 'date-fns';
import { buildEmptyTaskFormHtml, buildChecklistItemHtml, buildTagListItemHtml, buildNewTagInputOptionHtml } from "./taskFormHtmlBuilder";

export function buildTaskForm(task, tagsList) {
    return (() => {
        const html = buildEmptyTaskFormHtml();
        
        const CHECKLIST = html.querySelector('.checklist');
        const TAG_LIST = html.querySelector('.tags-list');
        const INPUTS = {
            title: html.querySelector('#title-input'),
            dueDate : html.querySelector('#date-input'),
            shortDesc: html.querySelector('#short-desc-input'),
            notes: html.querySelector('#notes-input'),
            newChecklistItem: html.querySelector('#new-checklist-item-input'),
            newTagInput: html.querySelector('#new-tag-input'),
        }
        
        const _appendNewChecklistItem = checklistItemToAppend => {
            const newChecklistItemText = checklistItemToAppend.text;
            const newChecklistItemIsChecked = checklistItemToAppend.isChecked;
            const newChecklistItemHtml = buildChecklistItemHtml(newChecklistItemText, newChecklistItemIsChecked);
            CHECKLIST.appendChild(newChecklistItemHtml);
            const newChecklistItemCheckbox = newChecklistItemHtml.querySelector('input[type=checkbox]');
            newChecklistItemCheckbox.addEventListener('change', () => checklistItemToAppend.toggleCheck());
            const newChecklistItemTextInput = newChecklistItemHtml.querySelector('input[type=text]');
            newChecklistItemTextInput.addEventListener('keyup', () => checklistItemToAppend.text = newChecklistItemTextInput.value);
            const removeBtn = newChecklistItemHtml.querySelector('img');
            removeBtn.addEventListener('click', () => {
                CHECKLIST.removeChild(newChecklistItemHtml);
                task.deleteChecklistItem(checklistItemToAppend);
            });
        }

        const _appendNewTag = tagToAppend => {
            const newTagItemHtml = buildTagListItemHtml(tagToAppend);
            const removeBtn = newTagItemHtml.querySelector('img');
            TAG_LIST.appendChild(newTagItemHtml);
            removeBtn.addEventListener('click', () => {
                TAG_LIST.removeChild(newTagItemHtml);
                task.removeTag(tagToAppend);
            })
        }
    
        const _updateAvailableNewTags = () => {
            while (INPUTS.newTagInput.childElementCount > 1) INPUTS.newTagInput.removeChild(INPUTS.newTagInput.lastChild);
            tagsList.forEach(tag => {
                if (!task.tags.includes(tag)) {
                    const newTagInputOptionHtml = buildNewTagInputOptionHtml(tag);
                    INPUTS.newTagInput.appendChild(newTagInputOptionHtml);
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
            const newChecklistItem = task.checklist.at(-1);
            _appendNewChecklistItem(newChecklistItem);
            const newChecklistItemHtml = CHECKLIST.lastElementChild;
            const newChecklistItemTextInput = newChecklistItemHtml.querySelector('input[type=text]');
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