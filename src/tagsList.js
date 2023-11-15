import { Tag } from "./tag";

export function buildTagsList(defaultTags) {
    return (() => {
        const tags = [];

        function _compareTagsAlphabetically(firstTag, secondTag) {
            if (firstTag.text.toLowerCase() < secondTag.text.toLowerCase()) return -1;
            if (firstTag.text.toLowerCase() > secondTag.text.toLowerCase()) return 1;
            return 0;
        }

        function getTags() {
            tags.sort((firstTag, secondTag) => _compareTagsAlphabetically(firstTag, secondTag));

            return tags;
        }

        function createNewTag(text) {
            const tagAlreadyExists = tags.some(tag => tag.text === text);
            if (!tagAlreadyExists) {
                const newTag = new Tag(text);
                tags.push(newTag);
                return newTag;
            }           
        }

        function deleteTag(tag) {
            const deleteIndex = tags.indexOf(tag);
            tags.splice(deleteIndex, 1);
        }

        for (let tagText of defaultTags) createNewTag(tagText);

        return {
            getTags,
            createNewTag,
            deleteTag,
        }

    })();
}