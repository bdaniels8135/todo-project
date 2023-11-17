export class ChecklistItem {

    constructor(text) {
        this.text = text;
        this.isChecked = false;
    }   

    toggleCheck() { this.isChecked = !this.isChecked }
}