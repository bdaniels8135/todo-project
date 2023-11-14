import { format, endOfDay, parseISO } from 'date-fns';
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
            CHECKLIST_HTML.appendChild(checklistItemHtml);
            const newChecklistItemCheckbox = checklistItemHtml.querySelector('input[type=checkbox]');
            newChecklistItemCheckbox.addEventListener('change', checklistItemToAppend.toggleCheck());
            const newChecklistItemTextInput = checklistItemHtml.querySelector('input[type=text]');
            newChecklistItemTextInput.addEventListener('keyup', () => checklistItemToAppend.text = newChecklistItemTextInput.value);
            const removeBtn = checklistItemHtml.querySelector('img');
            removeBtn.addEventListener('click', () => {
                CHECKLIST_HTML.removeChild(checklistItemHtml);
                task.deleteChecklistItem(checklistItemToAppend);
            });
        }

        function _appendNewTag(tagToAppend) {
            const newTagItemHtml = buildTaskTagListItemHtml(tagToAppend.text);
            const removeBtn = newTagItemHtml.querySelector('img');
            TAGS_LIST_HTML.appendChild(newTagItemHtml);
            removeBtn.addEventListener('click', () => {
                TAGS_LIST_HTML.removeChild(newTagItemHtml);
                task.removeTag(tagToAppend);
            })
        }
    
        function _updateAvailableNewTags() {
            while (INPUTS.newTagSelect.childElementCount > 1) INPUTS.newTagSelect.removeChild(INPUTS.newTagSelect.lastChild);
            tagsList.forEach(tag => {
                if (!task.tags.includes(tag)) {
                    const newTagInputOptionHtml = buildSelectOption(tag.text, tag.text);
                    INPUTS.newTagSelect.appendChild(newTagInputOptionHtml);
                }
            })
        }

        INPUTS.dueDate.value = format(task.dueDate, 'yyyy-MM-dd');
        INPUTS.dueDate.min = format(new Date(), 'yyyy-MM-dd');
        INPUTS.title.value = task.title;
        INPUTS.shortDesc.value = task.shortDesc;
        INPUTS.notes.value = task.notes;
        task.checklist.forEach(checklistItem => _appendChecklistItem(checklistItem));
        task.tags.forEach(tag => _appendNewTag(tag));
        INPUTS.dueDate.addEventListener('change', () => task.dueDate = endOfDay(parseISO(INPUTS.dueDate.value)));
        INPUTS.title.addEventListener('keyup', () => task.title = INPUTS.title.value);
        INPUTS.shortDesc.addEventListener('keyup', () => task.shortDesc = INPUTS.shortDesc.value);
        INPUTS.notes.addEventListener('keyup', () => task.notes = INPUTS.notes.value);
        INPUTS.newChecklistItem.addEventListener('focus', () => {
            task.createChecklistItem('');
            const newChecklistItem = task.checklist.at(-1);
            _appendChecklistItem(newChecklistItem);
            const newChecklistItemHtml = CHECKLIST_HTML.lastElementChild;
            const newChecklistItemTextInput = newChecklistItemHtml.querySelector('input[type=text]');
            newChecklistItemTextInput.focus();
        })
        INPUTS.newTagSelect.addEventListener('mousedown', () => _updateAvailableNewTags());
        INPUTS.newTagSelect.addEventListener('change', () => {
            const tagToAdd = tagsList.find(tag => tag.text === INPUTS.newTagSelect.value);
            console.log(tagToAdd);
            task.addTag(tagToAdd);
            _appendNewTag(tagToAdd);
            INPUTS.newTagSelect.value = '';
        });
    
        return {
            HTML
        }

    })();
}