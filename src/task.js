import { ChecklistItem } from './checklistItem';

export class Task {
    #checklist;
    #tags;
    #isCompleted;

    constructor() {
        this.title = '';
        this.dueDate;
        this.shortDesc = '';
        this.notes = '';
        this.#checklist = [];
        this.#tags = [];
        this.#isCompleted = false;
    }

    get checklist() { return this.#checklist }

    createChecklistItem(newItemText) { this.#checklist.push(new ChecklistItem(newItemText)) }

    deleteChecklistItem(itemToDelete) {
        const deleteIndex = this.#checklist.indexOf(itemToDelete);
        if (deleteIndex > -1) this.#checklist.splice(deleteIndex, 1);
    }

    get tags() { return this.#tags }

    addTag(tagToAdd) { this.#tags.push(tagToAdd) }

    removeTag(tagToRemove) {
        const removeIndex = this.#tags.indexOf(tagToRemove);
        if (removeIndex > -1) this.#tags.splice(removeIndex, 1);
    }

    hasTag(tagToCheck) { return this.#tags.some(tag => tag === tagToCheck) }

    get isCompleted() { return this.#isCompleted }

    toggleIsCompleted() { this.#isCompleted = !this.#isCompleted }
}