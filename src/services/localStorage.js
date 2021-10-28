export const getLoaclStorage = () => {
  let favorites = JSON.parse(localStorage.getItem("favoriteCity"));

  if (!favorites) {
    return [];
  } else {
    return favorites;
  }
};

export const saveToLocalStorage = (data) => {
  return localStorage.setItem("favoriteCity", JSON.stringify(data));
};
export const removeCityFromLocalStorage = (key) => {
  const favorites = getLoaclStorage();
  const exist = favorites.find((city) => city.cityKey === key);
  if (exist) {
    const temp = favorites.filter((city) => city.cityKey !== exist.cityKey);

    saveToLocalStorage(temp);
  } else {
    alert("Cant remove");
  }
};
