import removeIcon from './img/close-circle.svg';
import { clearContainer, resolveTagBtnClick, removeTag } from '.';
import { wrapHtmlElements, buildIconHtml, buildTextHtml } from './htmlBuilders';

export function buildTagsNavList(tagsNav, tagsList) {
    return (() => {
        const HTML = tagsNav.querySelector('ul');

        function _buildTagNavListItemHtml(tag) {
            const tagNavListItemTextHtml = buildTextHtml(tag.text);
            const tagNavListItemIconHtml = buildIconHtml(removeIcon);
            tagNavListItemIconHtml.addEventListener('click', () => { removeTag(tag) })
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