export function wrapHtmlElements(wrapperType, ...elements) {
    const container = document.createElement(wrapperType);
    container.append(...elements);

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
    const wrapperType = 'div';
    const labeledDateInputHtml = wrapHtmlElements(wrapperType, labelHtml, dateInputHtml);

    return labeledDateInputHtml;
}