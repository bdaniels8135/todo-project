import Task from './Task';

export default function buildTaskList() {
  return (() => {
    const tasks = [];

    function deleteTask(task) {
      const deleteIndex = tasks.indexOf(task);
      tasks.splice(deleteIndex, 1);
    }

    function createNewTask() {
      const newTask = new Task();
      tasks.push(newTask);

      return newTask;
    }

    function compareTasksByDate(firstTask, secondTask) {
      if (firstTask.dueDate < secondTask.dueDate) return -1;
      if (firstTask.dueDate > secondTask.dueDate) return 1;
      return 0;
    }

    function sortTasksByDate() {
      tasks.sort((firstTask, secondTask) => compareTasksByDate(firstTask, secondTask));
    }

    function getTasks() {
      sortTasksByDate();

      return [...tasks];
    }

    function scrubTagFromAllTasks(tagToScrub) {
      tasks.forEach((task) => { if (task.hasTag(tagToScrub)) task.removeTag(tagToScrub); });
    }

    return {
      deleteTask,
      createNewTask,
      getTasks,
      scrubTagFromAllTasks,
    };
  })();
}
