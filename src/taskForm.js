import { format, endOfDay, parseISO, isValid } from 'date-fns';
import { buildEmptyTaskFormHtml, buildChecklistItemHtml, buildTaskTagListItemHtml } from "./taskFormHtmlBuilders";
import { buildSelectOption } from './htmlBuilders';

export function buildTaskForm(task, tagsList) {
    return (() => {
        const HTML = buildEmptyTaskFormHtml();
        
        const CHECKLIST_HTML = HTML.querySelector('.checklist');
        const TAGS_LIST_HTML = HTML.querySelector('.task-tags-list');
        const INPUTS = {
            title: HTML.querySelector('#title-input'),
            dueDate : HTML.querySelector('#date-input'),
            shortDesc: HTML.querySelector('#short-desc-input'),
            notes: HTML.querySelector('#notes-input'),
            newChecklistItem: HTML.querySelector('#new-checklist-item-input'),
            newTagSelect: HTML.querySelector('#new-task-tag-select'),
        }

        function _appendChecklistItem(checklistItemToAppend) {
            const checklistItemText = checklistItemToAppend.text;
            const checklistItemIsChecked = checklistItemToAppend.isChecked;
            const checklistItemHtml = buildChecklistItemHtml(checklistItemText, checklistItemIsChecked);
            const checklistItemCheckbox = checklistItemHtml.querySelector('input[type=checkbox]');
            checklistItemCheckbox.addEventListener('change', () => { checklistItemToAppend.toggleCheck() });
            const checklistItemTextInput = checklistItemHtml.querySelector('input[type=text]');
            checklistItemTextInput.addEventListener('keyup', () => { checklistItemToAppend.text = checklistItemTextInput.value });
            const removeBtn = checklistItemHtml.querySelector('img');
            removeBtn.addEventListener('click', () => {
                CHECKLIST_HTML.removeChild(checklistItemHtml);
                task.deleteChecklistItem(checklistItemToAppend);
            });
            CHECKLIST_HTML.appendChild(checklistItemHtml);
        }

        function _appendTag(tagToAppend) {
            const tagItemHtml = buildTaskTagListItemHtml(tagToAppend.text);
            const removeBtn = tagItemHtml.querySelector('img');
            removeBtn.addEventListener('click', () => {
                TAGS_LIST_HTML.removeChild(tagItemHtml);
                task.removeTag(tagToAppend);
            })
            TAGS_LIST_HTML.appendChild(tagItemHtml);
        }
    
        function _updateSelectableTags() {
            while (INPUTS.newTagSelect.childElementCount > 1) INPUTS.newTagSelect.removeChild(INPUTS.newTagSelect.lastChild);
            tagsList.getTags().forEach(tag => {
                if (!task.tags.includes(tag)) {
                    const tagInputOptionHtml = buildSelectOption(tag.text, tag.text);
                    INPUTS.newTagSelect.appendChild(tagInputOptionHtml);
                }
            })
        }

        (function _populateTaskForm() {
            INPUTS.title.value = task.title;
            const taskDueDateValueString = task.dueDate ? format(task.dueDate, 'yyyy-MM-dd') : null;
            INPUTS.dueDate.value = taskDueDateValueString;
            INPUTS.dueDate.min = format(new Date(), 'yyyy-MM-dd');
            INPUTS.shortDesc.value = task.shortDesc;
            task.checklist.forEach(checklistItem => { _appendChecklistItem(checklistItem) });
            task.tags.forEach(tag => { _appendTag(tag) });
            
        })();

        (function _addInputEventListeners() {
            INPUTS.title.addEventListener('keyup', () => { task.title = INPUTS.title.value });
            INPUTS.dueDate.addEventListener('change', () => { 
                const updatedDateValue = isValid(parseISO(INPUTS.dueDate.value)) ? endOfDay(parseISO(INPUTS.dueDate.value)) : null;
                task.dueDate = updatedDateValue;
            })
            INPUTS.shortDesc.addEventListener('keyup', () => { task.shortDesc = INPUTS.shortDesc.value });
            INPUTS.notes.value = task.notes;
            INPUTS.notes.addEventListener('keyup', () => { task.notes = INPUTS.notes.value });
            INPUTS.newChecklistItem.addEventListener('focus', () => {
                task.createChecklistItem('');
                const newChecklistItem = task.checklist.at(-1);
                _appendChecklistItem(newChecklistItem);
                const newChecklistItemHtml = CHECKLIST_HTML.lastElementChild;
                const newChecklistItemTextInput = newChecklistItemHtml.querySelector('input[type=text]');
                newChecklistItemTextInput.focus();
            })
            INPUTS.newTagSelect.addEventListener('mousedown', () => { _updateSelectableTags() });
            INPUTS.newTagSelect.addEventListener('change', () => {
                const tagToAdd = tagsList.getTags().find(tag => tag.text === INPUTS.newTagSelect.value);
                task.addTag(tagToAdd);
                _appendTag(tagToAdd);
                INPUTS.newTagSelect.value = '';
            });

        })();
   
        return {
            HTML,
        }

    })();
}