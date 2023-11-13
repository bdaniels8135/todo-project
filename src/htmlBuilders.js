export function packageHtmlElements(...elements) {
    const container = document.createElement('div');
    elements.forEach(element => container.appendChild(element));

    return container;
}

export function buildLabelHtml(labelText) {
    const labelHtml = document.createElement('label');
    labelHtml.innerText = labelText;

    return labelHtml;
}

export function buildDateInputHtml() {
    const dateInputHtml = document.createElement('input');
    dateInputHtml.type = 'date';
    dateInputHtml.id = 'date-input';

    return dateInputHtml;
}

export function buildLabeledDateInputHtml(labelText) {
    const labelHtml = buildLabelHtml(labelText);
    const dateInputHtml = buildDateInputHtml();

    return packageHtmlElements(labelHtml, dateInputHtml);
}