import removeIcon from "./img/close-circle.svg";
import { wrapHtmlElements, buildIconHtml, buildTextHtml } from "./htmlBuilders";

export default function buildTagsNavList(tagsNav, tagsList) {
  return (() => {
    const HTML = tagsNav.querySelector("ul");

    function buildTagNavListItemHtml(
      tag,
      removeTag,
      displayDeleteConfirmationModal,
    ) {
      const tagNavListItemTextHtml = buildTextHtml(tag.text);
      const tagNavListItemIconHtml = buildIconHtml(removeIcon);
      const TAG_DELETE_MODAL_CONFIRMATION_MESSAGE = `Are you sure you want to permanently delete the "${tag.text}" tag and remove it from all tasks?`;
      tagNavListItemIconHtml.addEventListener("click", () => {
        displayDeleteConfirmationModal(
          TAG_DELETE_MODAL_CONFIRMATION_MESSAGE,
          tag,
          removeTag,
        );
      });
      const tagNavListItemHtml = wrapHtmlElements(
        "li",
        tagNavListItemTextHtml,
        tagNavListItemIconHtml,
      );
      return tagNavListItemHtml;
    }

    function appendTagItem(
      tag,
      resolveTagBtnClick,
      removeTag,
      displayDeleteConfirmationModal,
    ) {
      const tagNavListItemHtml = buildTagNavListItemHtml(
        tag,
        removeTag,
        displayDeleteConfirmationModal,
      );
      const tagNavListItemTextHtml = tagNavListItemHtml.querySelector("p");
      tagNavListItemTextHtml.addEventListener("click", () => {
        resolveTagBtnClick(tag);
      });
      HTML.appendChild(tagNavListItemHtml);
    }

    function populateTagsNavList(
      resolveTagBtnClick,
      removeTag,
      displayDeleteConfirmationModal,
    ) {
      tagsList.getTags().forEach((tag) => {
        appendTagItem(
          tag,
          resolveTagBtnClick,
          removeTag,
          displayDeleteConfirmationModal,
        );
      });
    }

    function updateTagsNavList(
      resolveTagBtnClick,
      removeTag,
      displayDeleteConfirmationModal,
    ) {
      HTML.innerHTML = "";
      populateTagsNavList(
        resolveTagBtnClick,
        removeTag,
        displayDeleteConfirmationModal,
      );
    }

    return {
      HTML,
      updateTagsNavList,
    };
  })();
}
