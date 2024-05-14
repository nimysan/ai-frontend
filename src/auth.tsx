export const isAuthenticated = () => {
  const loggedInUser = localStorage.getItem("userData");
  if (loggedInUser) {
    // debugger;
    const foundUser = JSON.parse(loggedInUser);
    console.log(" --- " + foundUser);
    return true;
  }
  return false;
};

export const loginOut = () => {
  localStorage.removeItem("userData");
};

export default isAuthenticated;
