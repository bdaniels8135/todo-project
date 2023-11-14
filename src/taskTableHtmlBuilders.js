import { wrapHtmlElements, buildTableCellHtml } from './htmlBuilders';

const NO_TITLE_PLACEHOLDER = '(NO TITLE)';

export function buildTaskTableHtml() {
    const taskTableHtml = document.createElement('table');
    taskTableHtml.classList.add('task-table');

    return taskTableHtml;
}

export function buildTaskRowHtml(title, shortDescText, dueDateString) {
    const titleText = title ? title : NO_TITLE_PLACEHOLDER;
    const titleCellHtml = buildTableCellHtml(titleText, 'title-cell');
    const shortDescCellHtml = buildTableCellHtml(shortDescText, 'short-desc-cell');
    const dueDateCellHtml = buildTableCellHtml(dueDateString, 'due-date-cell');
    const taskRowHtml = wrapHtmlElements('tr', titleCellHtml, shortDescCellHtml, dueDateCellHtml);

    return taskRowHtml;
}