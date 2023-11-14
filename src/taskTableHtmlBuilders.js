import { format } from 'date-fns';
import { wrapHtmlElements, buildTableCellHtml } from './htmlBuilders';

export function buildTaskTableHtml() {
    const taskTableHtml = document.createElement('table');
    taskTableHtml.classList.add('task-table');

    return taskTableHtml;
}

export function buildTaskRowHtml(title, shortDescText, dueDate) {
    const titleText = title ? title : '(NO TITLE)'
    const titleCellHtml = buildTableCellHtml(titleText, 'title-cell');
    const shortDescCellHtml = buildTableCellHtml(shortDescText, 'short-desc-cell');
    const dueDateText = format(dueDate, 'MM/dd/yyyy');
    const dueDateCellHtml = buildTableCellHtml(dueDateText, 'due-date-cell');
    const taskRowHtml = wrapHtmlElements('tr', titleCellHtml, shortDescCellHtml, dueDateCellHtml)

    return taskRowHtml;
}