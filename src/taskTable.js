import { format } from 'date-fns';
import { buildTaskTableHtml, buildTaskRowHtml } from './taskTableHtmlBuilders';
import { buildLabeledDateInputHtml, buildHeaderTextHtml } from './htmlBuilders';

const UPCOMING_DATE_INPUT_LABEL_TEXT = 'Display tasks due between now and:';

export function buildTaskTable(headerText, isUpcoming, tagsList) {
    return (() => {
        const HTML = document.createDocumentFragment();
        
        const taskTableHeaderHtml = buildHeaderTextHtml(headerText, 1);
        HTML.appendChild(taskTableHeaderHtml);

        const labeledUpcomingDateInputHtml = buildLabeledDateInputHtml(UPCOMING_DATE_INPUT_LABEL_TEXT);
        const upcomingDateInput = labeledUpcomingDateInputHtml.querySelector('input');
        upcomingDateInput.min = format(new Date(), 'yyyy-MM-dd');
        if (isUpcoming) HTML.appendChild(labeledUpcomingDateInputHtml);

        const taskTableHtml = buildTaskTableHtml();
        HTML.appendChild(taskTableHtml);

        function appendTasks(tasksToDisplay) {
            taskTableHtml.innerHTML = '';
            tasksToDisplay.forEach(task => {
                const taskRowHtml = buildTaskRowHtml(task.title, task.shortDesc, task.dueDate);
                const taskForm = buildTaskForm(task, tagsList);
                const taskDeleteButton = taskForm.HTML.querySelector('#task-delete-btn');
                taskDeleteButton.addEventListener('click', () => {
                    tasksList.deleteTask(task);
                    resolveAllBtnClick();
                })
                taskRowHtml.addEventListener('click', () => {
                    clearContainer(main);
                    main.appendChild(taskForm.HTML);
                })
                taskTableHtml.appendChild(taskRowHtml);
            })
        }

        return {
            HTML,
            appendTasks,
        }

    })();
}