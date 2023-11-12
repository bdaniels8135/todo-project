import { ChecklistItem } from './checklistItem';

export class Task {
    #checklist;
    #tags;

    constructor(dueDate) {
        this.title = '';
        this.dueDate = dueDate;
        this.shortDesc = '';
        this.notes = '';
        this.#checklist = [];
        this.#tags = [];
    }

    get checklist() { return this.#checklist }

    createChecklistItem(newItemText) { this.#checklist.push(new ChecklistItem(newItemText)) }

    deleteChecklistItem(itemToDelete) {
        const deleteIndex = this.#checklist.findIndex(item => item === itemToDelete);
        if (deleteIndex > -1) this.#checklist.splice(deleteIndex, 1);
    }

    get tags() { return this.#tags }

    addTag(tagToAdd) { this.#tags.push(tagToAdd) }

    removeTag(tagToRemove) {
        const removeIndex = this.#tags.findIndex(tag => tag === tagToRemove);
        if (removeIndex > -1) this.#tags.splice(removeIndex, 1);
    }

    hasTag(tagToCheck) { return this.#tags.some(tag => tag === tagToCheck) }
}