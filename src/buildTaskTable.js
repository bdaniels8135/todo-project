import { format } from "date-fns";
import { buildTaskTableHtml, buildTaskRowHtml } from "./taskTableHtmlBuilders";
import { buildLabeledDateInputHtml, buildHeaderTextHtml } from "./htmlBuilders";

const UPCOMING_DATE_INPUT_LABEL_TEXT = "Display tasks due between now and:";

export default function buildTaskTable(
  headerText,
  isUpcoming,
  displayTaskForm,
) {
  return (() => {
    const HTML = document.createDocumentFragment();

    const taskTableHeaderHtml = buildHeaderTextHtml(headerText, 1);
    HTML.appendChild(taskTableHeaderHtml);

    const labeledUpcomingDateInputHtml = buildLabeledDateInputHtml(
      UPCOMING_DATE_INPUT_LABEL_TEXT,
    );
    const upcomingDateInput =
      labeledUpcomingDateInputHtml.querySelector("input");
    upcomingDateInput.min = format(new Date(), "yyyy-MM-dd");
    if (isUpcoming) HTML.appendChild(labeledUpcomingDateInputHtml);

    const taskTableHtml = buildTaskTableHtml();
    HTML.appendChild(taskTableHtml);

    function displayTasks(tasksToDisplay) {
      taskTableHtml.innerHTML = "";
      tasksToDisplay.forEach((task) => {
        const taskRowHtml = buildTaskRowHtml(
          task.title,
          task.shortDesc,
          task.dueDate,
        );
        if (task.isCompleted) taskRowHtml.classList.add("completed-task-row");
        taskRowHtml.addEventListener("click", () => {
          displayTaskForm(task);
        });
        taskTableHtml.appendChild(taskRowHtml);
      });
    }

    return {
      HTML,
      displayTasks,
    };
  })();
}
