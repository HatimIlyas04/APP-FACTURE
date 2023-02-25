const getLocalStorage = (key, initial) => {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return data ? data : []
  } catch (error) {
    return initial;
  }
};
export default getLocalStorage;
