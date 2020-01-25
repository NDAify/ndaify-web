export const getItemFromSessionStorage = (key) => {
  if(typeof window === 'undefined') {
    return null;
  }
  const item = window?.sessionStorage?.getItem(key);

  if (!item) {
    return null;
  }

  return JSON.parse(item);
};

export const setItemFromSessionStorage = (key, value) => {
  window?.sessionStorage?.setItem(key, JSON.stringify(value));
};

export const clearSessionStorage = () => {
  window?.sessionStorage?.clear();
};