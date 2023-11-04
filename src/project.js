export class Project {
    #tasks = [];

    constructor(title) {
        this.title = title;
    }

    get tasks() {
        return this.#tasks;
    }

    addTask(newTask) {
        this.#tasks.push(newTask);
    }

    deleteTask(taskToDelete) {
        const deleteIndex = this.#tasks.findIndex(task => task === taskToDelete);
        if (deleteIndex > -1) this.#tasks.splice(deleteIndex, 1);
    }
}