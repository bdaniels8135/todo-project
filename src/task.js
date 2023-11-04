export class Task {
    #checklist = [];

    constructor(title, dueDate, shortDescription) {
        this.title = title;
        this.dueDate = dueDate;
        this.shortDescription = shortDescription;
        this.notes = '';
    }

    get checklist() {
        return this.#checklist;
    }

    addChecklistItem(newItemText) {
        this.#checklist.push({text: newItemText, isChecked: false});
    }

    deleteChecklistItem(itemToDelete) {
        const deleteIndex = this.#checklist.findIndex(item => item === itemToDelete);
        if (deleteIndex > -1) this.#checklist.splice(deleteIndex, 1);
    }
}