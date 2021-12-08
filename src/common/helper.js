export const styleCombine = (...args) => {
  return args
    .join(' ')
    .replace(/\s+/g, ' ')
    .replace(/^\s+|\s+$/, '');
};

export const IsJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
