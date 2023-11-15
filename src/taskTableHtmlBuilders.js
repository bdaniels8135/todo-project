import { wrapHtmlElements, buildTableCellHtml } from './htmlBuilders';
import { format } from 'date-fns';

const NO_TITLE_PLACEHOLDER = '(NO TITLE)';
const NO_DUE_DATE_PLACEHOLDER = '(NO DATE)';

export function buildTaskTableHtml() {
    const taskTableHtml = document.createElement('table');
    taskTableHtml.classList.add('task-table');

    return taskTableHtml;
}

export function buildTaskRowHtml(title, shortDescText, dueDate) {
    const titleText = title ? title : NO_TITLE_PLACEHOLDER;
    const titleCellHtml = buildTableCellHtml(titleText, 'title-cell');
    const shortDescCellHtml = buildTableCellHtml(shortDescText, 'short-desc-cell');
    const dueDateString = !isNaN(dueDate) ? format(dueDate, 'MM/dd/yyyy') : NO_DUE_DATE_PLACEHOLDER;
    const dueDateCellHtml = buildTableCellHtml(dueDateString, 'due-date-cell');
    const taskRowHtml = wrapHtmlElements('tr', titleCellHtml, shortDescCellHtml, dueDateCellHtml);

    return taskRowHtml;
}