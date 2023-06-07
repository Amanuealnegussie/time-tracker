export const isAuth = () => {
  const app = window.localStorage.getItem("user");
  if (app) return true;
  return false;
};
