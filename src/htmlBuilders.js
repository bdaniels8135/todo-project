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

export function buildInputHtml(type, id=null) {
    const inputHtml = document.createElement('input');
    inputHtml.type = type;
    if (id) inputHtml.id = id;
    
    return inputHtml;
}

export function buildLabeledDateInputHtml(labelText) {
    const labelHtml = buildLabelHtml(labelText);
    const dateInputHtml = buildInputHtml('date', 'date-input');
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

export function buildSelectOption(text, value) {
    const optionHtml = document.createElement('option');
    optionHtml.value = value;
    optionHtml.innerText = text;

    return optionHtml;
}