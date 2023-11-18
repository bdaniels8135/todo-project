import {
  buildInputHtml,
  buildTextHtml,
  wrapHtmlElements,
} from "./htmlBuilders";

export default function buildDeleteConfirmationModalHtml(confirmationMessage) {
  const deleteConfirmationModalTextHtml = buildTextHtml(confirmationMessage);

  const deleteConfirmationModalDeleteBtnHtml = buildInputHtml(
    "button",
    "modal-delete-btn",
  );
  deleteConfirmationModalDeleteBtnHtml.value = "Delete";
  const deleteConfirmationModalCancelBtnHtml = buildInputHtml(
    "button",
    "modal-cancel-btn",
  );
  deleteConfirmationModalCancelBtnHtml.value = "Cancel";

  const deleteConfirmationModalButtonsHtml = wrapHtmlElements(
    "div",
    deleteConfirmationModalCancelBtnHtml,
    deleteConfirmationModalDeleteBtnHtml,
  );
  deleteConfirmationModalButtonsHtml.classList.add("modal-btns");

  const deleteConfirmationModalHtml = wrapHtmlElements(
    "dialog",
    deleteConfirmationModalTextHtml,
    deleteConfirmationModalButtonsHtml,
  );

  return deleteConfirmationModalHtml;
}
