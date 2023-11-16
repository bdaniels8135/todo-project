import removeIcon from './img/close-circle.svg';
import { clearContainer, resolveTagBtnClick } from '.';
import { wrapHtmlElements, buildIconHtml, buildTextHtml } from './htmlBuilders';

export function buildTagsNavList(tagsNav, tagsList) {
    return (() => {
        const HTML = tagsNav.querySelector('ul');

        function _buildTagNavListItemHtml(tag) {
            const tagNavListItemTextHtml = buildTextHtml(tag.text);
            const tagNavListItemIconHtml = buildIconHtml(removeIcon);
            tagNavListItemIconHtml.addEventListener('click', () => {
                tagsList.deleteTag(tag);
                updateTagsNavList();
            })
            const tagNavListItemHtml = wrapHtmlElements('li', tagNavListItemTextHtml, tagNavListItemIconHtml);
        
            return tagNavListItemHtml;
        }
        
        function _appendTagItem(tag) {
            const tagNavListItemHtml = _buildTagNavListItemHtml(tag);
            tagNavListItemHtml.addEventListener('click', () => { resolveTagBtnClick(tag) });
            HTML.appendChild(tagNavListItemHtml);
        }
        
        function populateTagsNavList() {
            tagsList.getTags().forEach(tag => { _appendTagItem(tag) });
        }
        
        function updateTagsNavList() {
            clearContainer(HTML);
            populateTagsNavList();
        }
                
        return {
            HTML,
            updateTagsNavList,
        }

    })();
}