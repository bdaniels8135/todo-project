import Tag from './Tag';

export default function buildTagsList(defaultTags) {
  return (() => {
    const tags = [];

    function compareTagsAlphabetically(firstTag, secondTag) {
      if (firstTag.text.toLowerCase() < secondTag.text.toLowerCase()) return -1;
      if (firstTag.text.toLowerCase() > secondTag.text.toLowerCase()) return 1;
      return 0;
    }

    function sortTagsAlphabetically() {
      tags.sort((firstTag, secondTag) => compareTagsAlphabetically(firstTag, secondTag));
    }

    function getTags() {
      sortTagsAlphabetically();
      return [...tags];
    }

    function saveTagsInLocalStorage() {
      window.localStorage.setItem('tags', JSON.stringify(tags));
    }

    function createNewTag(text) {
      const tagAlreadyExists = tags.some((tag) => tag.text === text);
      if (!tagAlreadyExists) {
        const newTag = new Tag(text);
        tags.push(newTag);
        saveTagsInLocalStorage();
        return newTag;
      }
      return null;
    }

    function deleteTag(tag) {
      const deleteIndex = tags.indexOf(tag);
      tags.splice(deleteIndex, 1);
      saveTagsInLocalStorage();
    }

    (function retrieveTagsFromLocalStorage() {
      const tagsFromStorage = JSON.parse(window.localStorage.getItem('tags'));
      if (tagsFromStorage) tagsFromStorage.forEach((item) => { defaultTags.push(item.text); });
    }());

    defaultTags.forEach((tagText) => { createNewTag(tagText); });

    return {
      getTags,
      createNewTag,
      deleteTag,
      saveTagsInLocalStorage,
    };
  })();
}
