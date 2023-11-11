export function packageHtmlElements(...elements) {
    const container = document.createElement('div');
    elements.forEach(element => container.appendChild(element));

    return container;
}

export function buildLabelHtml(labelText) {
    const label = document.createElement('label');
    label.innerText = labelText;

    return label;
}

export function buildDateInputHtml() {
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'date-input';

    return dateInput;
}

export function buildLabeledDateInputHtml(labelText) {
    const label = buildLabelHtml(labelText);
    const dateInput = buildDateInputHtml();

    return packageHtmlElements(label, dateInput);
}