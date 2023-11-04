export class ChecklistItem {
    #isChecked = false;

    constructor(text) {
        this.text = text;
    }   

    get isChecked() { return this.#isChecked }

    toggleCheck() { this.#isChecked = !this.#isChecked }
}