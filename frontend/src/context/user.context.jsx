import React from "react";

const UserContext = React.createContext();

// This is the provider component that wraps the entire app
export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [likedItems, setLikedItems] = React.useState([])

  // This is the function that is called when the user logs in
  function login (email, first, last) {
    setEmail(email);
    setFirstName(first);
    setLastName(last);
    setLoggedIn(true);
  };

  // This is the function that is called when the user logs out
  const logout = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setLoggedIn(false);
  };

  // This is the function that is called when the user changes their email
  const changeEmail = (email)  => {
    setEmail(email)
  }

  // This is the value that is passed to the context provider
  const userValue = { loggedIn, firstName, lastName, email, login, logout, changeEmail, likedItems, setLikedItems };

  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
};

// This is the hook that is used to access the context
const useUserContext = () => {
  const { loggedIn, firstName, lastName, email, login, logout, changeEmail, likedItems, setLikedItems } =
    React.useContext(UserContext);

  return { loggedIn, firstName, lastName, email, login, logout, changeEmail, likedItems, setLikedItems };
};

export default useUserContext;
