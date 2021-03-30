const getCompoundedString = stringArray => {
  if (stringArray.length === 1) {
    return pluralize(stringArray[0]);
  }

  if (stringArray.length === 2) {
    return `${pluralize(stringArray[0])} and ${pluralize(stringArray[1])}`;
  }

  return `${stringArray
    .splice(0, stringArray.length - 1)
    .map(string => pluralize(string))
    .join(", ")} and ${pluralize(stringArray[stringArray.length - 1])}`;
};

const getUniqueTags = resources => {
  const tags = resources.map(({ tag }) => tag).filter(tag => Boolean(tag));

  return [...new Set(tags)];
};

const getUniqueTopics = resources => {
  const topics = resources
    .map(({ topic }) => topic)
    .filter(topic => Boolean(topic));

  return [...new Set(topics)];
};

const pluralize = string => `${string}s`;

const toSlug = string => string.toLowerCase().replace(/ /g, "-");

module.exports = {
  getCompoundedString,
  getUniqueTags,
  getUniqueTopics,
  pluralize,
  toSlug
};
