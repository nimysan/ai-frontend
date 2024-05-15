export const isAuthenticated = () => {
  // debugger;
  const loggedInUser = localStorage.getItem("userData");
  if (loggedInUser) {
    // debugger;
    const foundUser = JSON.parse(loggedInUser);
    return foundUser;
  }
};

export const loginOut = () => {
  localStorage.removeItem("userData");
};

export default isAuthenticated;
