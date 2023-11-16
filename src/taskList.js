import { Task } from './task'

export function buildTaskList() {
    return (() => {
        const tasks = [];

        function deleteTask(task){
            const deleteIndex = tasks.indexOf(task);
            tasks.splice(deleteIndex, 1);
        }

        function createNewTask() {
            const newTask = new Task();
            tasks.push(newTask);

            return newTask;
        }

        function _compareTasksByDate(firstTask, secondTask) {
            if (firstTask.dueDate < secondTask.dueDate) return -1;
            if (firstTask.dueDate > secondTask.dueDate) return 1;
            return 0;
        }

        function _sortTasksByDate() {
            tasks.sort((firstTask, secondTask) => _compareTasksByDate(firstTask,secondTask));
        }

        function getTasks() {
            _sortTasksByDate();

            return [...tasks];
        }

        function scrubTagFromAllTasks(tagToScrub) {
            for (let task of tasks) if (task.hasTag(tagToScrub)) task.removeTag(tagToScrub);
        }

        return {
            deleteTask,
            createNewTask,
            getTasks,
            scrubTagFromAllTasks,
        }

    })();
}