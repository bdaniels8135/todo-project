export class Project {
    #name;
    #tasks;

    constructor(name) {
        this.#name = name;
        this.#tasks = [];
    }

    set name(newName) {
        if (!newName) throw Error('A project must have a name.');
        this.#name = newName;
    }

    get name() {
        return this.#name;
    }

    addTask(newTask) {
        this.#tasks.push(newTask);
    }

    get tasks() {
        return this.#tasks.map((task) => task.name);
    }
}