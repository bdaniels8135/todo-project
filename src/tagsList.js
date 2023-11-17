import { Tag } from "./tag";

export function buildTagsList(defaultTags) {
    return (() => {
        const tags = [];

        function _compareTagsAlphabetically(firstTag, secondTag) {
            if (firstTag.text.toLowerCase() < secondTag.text.toLowerCase()) return -1;
            if (firstTag.text.toLowerCase() > secondTag.text.toLowerCase()) return 1;
            return 0;
        }

        function _sortTagsAlphabetically() {
            tags.sort((firstTag, secondTag) => _compareTagsAlphabetically(firstTag, secondTag));
        }

        function getTags() {
            _sortTagsAlphabetically();

            return [...tags];
        }

        function saveTagsInLocalStorage() {
            window.localStorage.setItem(`tags`, JSON.stringify(tags));
        }

        function createNewTag(text) {
            const tagAlreadyExists = tags.some(tag => tag.text === text);
            if (!tagAlreadyExists) {
                const newTag = new Tag(text);
                tags.push(newTag);
                saveTagsInLocalStorage();
                return newTag;
            }           
        }

        function deleteTag(tag) {
            const deleteIndex = tags.indexOf(tag);
            tags.splice(deleteIndex, 1);
            saveTagsInLocalStorage();
        }

        (function _retrieveTagsFromLocalStorage() {
            const tagsFromStorage = JSON.parse(window.localStorage.getItem('tags'));
            if (tagsFromStorage) for (let item of tagsFromStorage) defaultTags.push(item.text);
        })();

        for (let tagText of defaultTags) createNewTag(tagText);

        return {
            getTags,
            createNewTag,
            deleteTag,
            saveTagsInLocalStorage,
        }

    })();
}