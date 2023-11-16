import removeIcon from './img/close-circle.svg';
import { clearContainer, resolveTagBtnClick, removeTag, displayDeleteConfirmationModal} from '.';
import { wrapHtmlElements, buildIconHtml, buildTextHtml } from './htmlBuilders';



export function buildTagsNavList(tagsNav, tagsList) {
    return (() => {
        const HTML = tagsNav.querySelector('ul');

        function _buildTagNavListItemHtml(tag) {
            const tagNavListItemTextHtml = buildTextHtml(tag.text);
            const tagNavListItemIconHtml = buildIconHtml(removeIcon);
            const TAG_DELETE_MODAL_CONFIRMATION_MESSAGE = `Are you sure you want to permanently delete the "${tag.text}" tag and remove it from all tasks?`;
            tagNavListItemIconHtml.addEventListener('click', () => { displayDeleteConfirmationModal(TAG_DELETE_MODAL_CONFIRMATION_MESSAGE, tag, removeTag) });
            const tagNavListItemHtml = wrapHtmlElements('li', tagNavListItemTextHtml, tagNavListItemIconHtml);
        
            return tagNavListItemHtml;
        }
        
        function _appendTagItem(tag) {
            const tagNavListItemHtml = _buildTagNavListItemHtml(tag);
            const tagNavListItemTextHtml = tagNavListItemHtml.querySelector('p');
            tagNavListItemTextHtml.addEventListener('click', () => { resolveTagBtnClick(tag) });
            HTML.appendChild(tagNavListItemHtml);
        }
        
        function _populateTagsNavList() {
            tagsList.getTags().forEach(tag => { _appendTagItem(tag) });
        }
        
        function updateTagsNavList() {
            clearContainer(HTML);
            _populateTagsNavList();
        }
                
        return {
            HTML,
            updateTagsNavList,
        }

    })();
}