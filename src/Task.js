import ChecklistItem from "./ChecklistItem";

export default class Task {
  #checklist;

  #tags;

  constructor() {
    this.title = "";
    this.dueDate = null;
    this.shortDesc = "";
    this.notes = "";
    this.#checklist = [];
    this.#tags = [];
    this.isCompleted = false;
  }

  get checklist() {
    return [...this.#checklist];
  }

  createChecklistItem(newItemText) {
    const newChecklistItem = new ChecklistItem(newItemText);
    this.#checklist.push(newChecklistItem);
    return newChecklistItem;
  }

  deleteChecklistItem(itemToDelete) {
    const deleteIndex = this.#checklist.indexOf(itemToDelete);
    if (deleteIndex > -1) this.#checklist.splice(deleteIndex, 1);
  }

  get tags() {
    return [...this.#tags];
  }

  addTag(tagToAdd) {
    this.#tags.push(tagToAdd);
  }

  removeTag(tagToRemove) {
    const removeIndex = this.#tags.indexOf(tagToRemove);
    if (removeIndex > -1) this.#tags.splice(removeIndex, 1);
  }

  hasTag(tagToCheck) {
    return this.#tags.some((tag) => tag === tagToCheck);
  }

  toggleCompleted() {
    this.isCompleted = !this.isCompleted;
  }
}
