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

export function buildHeaderTextHtml(headerText, headerLevel) {
    const headerTextHtml = document.createElement(`h${headerLevel}`);
    headerTextHtml.innerHTML = headerText;

    return headerTextHtml;
}

export function buildIconHtml(icon) {
    const iconHtml = document.createElement('img');
    iconHtml.src = icon;

    return iconHtml;
}