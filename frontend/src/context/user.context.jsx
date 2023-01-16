import React from "react";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [likedItems, setLikedItems] = React.useState([])

  function login (email, first, last) {
    setEmail(email);
    setFirstName(first);
    setLastName(last);
    setLoggedIn(true);
  };

  const logout = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setLoggedIn(false);
  };

  const changeEmail = (email)  => {
    setEmail(email)
  }

  const userValue = { loggedIn, firstName, lastName, email, login, logout, changeEmail, likedItems, setLikedItems };

  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
};

const useUserContext = () => {
  const { loggedIn, firstName, lastName, email, login, logout, changeEmail, likedItems, setLikedItems } =
    React.useContext(UserContext);

  return { loggedIn, firstName, lastName, email, login, logout, changeEmail, likedItems, setLikedItems };
};

export default useUserContext;
