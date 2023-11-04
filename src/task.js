import { ChecklistItem } from './checklist-item.js'

export class Task {
    #checklist;
    #tags;

    constructor(title, dueDate, shortDescription) {
        this.title = title;
        this.dueDate = dueDate;
        this.shortDescription = shortDescription;
        this.notes = '';
        this.#checklist = [];
        this.#tags = [];
    }

    get checklist() { return this.#checklist }

    addChecklistItem(newItemText) { this.#checklist.push(new ChecklistItem(newItemText)) }

    deleteChecklistItem(itemToDelete) {
        const deleteIndex = this.#checklist.findIndex(item => item === itemToDelete);
        if (deleteIndex > -1) this.#checklist.splice(deleteIndex, 1);
    }

    get tags() { return this.#tags }

    addTag(newTag) { this.#tags.push(newTag) }

    removeTag(tagToRemove) {
        const removeIndex = this.#tags.findIndex(tag => tag === tagToRemove);
        if (removeIndex > -1) this.#tags.splice(removeIndex, 1);
    }

    hasTag(tagToCheck) { return this.#tags.some(tag => tag === tagToCheck) }
}