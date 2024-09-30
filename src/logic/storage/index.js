export const saveGameToStorage = ({ table, turn }) => {
  // guardar la partida
  window.localStorage.setItem("table", JSON.stringify(table));
  window.localStorage.setItem("turn", turn);
};

export const resetGameStorage = () => {
  window.localStorage.removeItem("table");
  window.localStorage.removeItem("turn");
};
