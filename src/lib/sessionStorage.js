export const getItem = (key) => {
  if (typeof window === 'undefined') {
    return null;
  }

  const item = window?.sessionStorage?.getItem(key);

  if (!item) {
    return null;
  }

  return JSON.parse(item);
};

export const setItem = (key, value) => {
  // eslint-disable-next-line no-unused-expressions
  window?.sessionStorage?.setItem(key, JSON.stringify(value));
};

export const clear = () => {
  // eslint-disable-next-line no-unused-expressions
  window?.sessionStorage?.clear();
};
