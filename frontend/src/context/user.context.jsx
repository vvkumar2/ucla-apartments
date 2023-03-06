import React from "react";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");

    function login(email, first, last) {
        setEmail(email);
        setFirstName(first);
        setLastName(last);
        setLoggedIn(true);
    }

    const logout = () => {
        setEmail("");
        setFirstName("");
        setLastName("");
        setLoggedIn(false);
    };

    const changeEmail = (email) => {
        setEmail(email);
    };

    const userValue = {
        loggedIn,
        firstName,
        lastName,
        email,
        login,
        logout,
        changeEmail,
    };

    return <UserContext.Provider value={userValue}>{children}</UserContext.Provider>;
};

// This is the hook that is used to access the context
const useUserContext = () => {
    const { loggedIn, firstName, lastName, email, login, logout, changeEmail } = React.useContext(UserContext);

    return {
        loggedIn,
        firstName,
        lastName,
        email,
        login,
        logout,
        changeEmail,
    };
};

export default useUserContext;
