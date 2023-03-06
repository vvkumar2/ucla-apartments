import { useState, useEffect, createContext, useContext } from "react";
import {
  createSupabaseAccount,
  getSupabaseUserSession,
  sendSupabaseResetPasswordLink,
  signInToSupabase,
  signOutFromSupabase,
  sendSupabaseUpdateEmailLink,
  updateEmailInSupabase,
  resetPasswordInSupabase,
} from "../utils/supabase-utils";

const UserContext = createContext({
  loggedIn: false,
  firstName: "",
  lastName: "",
  email: "",
  memberSince: "",
  createAccount: () => {},
  login: () => {},
  logout: () => {},
  sendResetPasswordLink: () => {},
  sendUpdateEmailLink: () => {},
  updateEmail: () => {},
  resetPassword: () => {},
});

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [memberSince, setMemberSince] = useState("");

  async function updateStateFromSupabase() {
    const {
      email: supabaseEmail,
      firstName: supabaseFirstName,
      lastName: supabaseLastName,
      memberSince: supabaseMemberSince,
    } = await getSupabaseUserSession();

    setEmail(supabaseEmail);
    setFirstName(supabaseFirstName);
    setLastName(supabaseLastName);
    setLoggedIn(supabaseEmail !== "");
    setMemberSince(supabaseMemberSince);
  }

  // set initial state from supabase session
  useEffect(() => {
    updateStateFromSupabase();
  }, []);

  async function createAccount(email, password, firstName, lastName) {
    const resp = await createSupabaseAccount(
      email,
      password,
      firstName,
      lastName
    );
    if (resp === "Success") await login(email, password);
    return resp;
  }

  async function login(email, password) {
    const resp = await signInToSupabase(email, password);
    if (resp === "Success") await updateStateFromSupabase();
    return resp;
  }

  async function logout() {
    await signOutFromSupabase();
    await updateStateFromSupabase();
  }

  async function sendResetPasswordLink(email) {
    return await sendSupabaseResetPasswordLink(email);
  }

  async function sendUpdateEmailLink(email) {
    const resp = await sendSupabaseUpdateEmailLink(email);
    if (resp === "Success") await updateStateFromSupabase();
    return resp;
  }

  async function updateEmail(newEmail, oldEmail) {
    const resp = await updateEmailInSupabase(newEmail, oldEmail);
    if (resp === "Success") await updateStateFromSupabase();
    return resp;
  }

  async function resetPassword(password) {
    return await resetPasswordInSupabase(password);
  }

  const userValue = {
    loggedIn,
    firstName,
    lastName,
    createAccount,
    memberSince,
    email,
    login,
    logout,
    sendResetPasswordLink,
    sendUpdateEmailLink,
    updateEmail,
    resetPassword,
  };

  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
};

export default function useUserContext() {
  return useContext(UserContext);
}
