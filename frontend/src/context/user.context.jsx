import { createContext, useContext, useEffect, useState } from 'react';
import {
  addItemToSupabaseCategory,
  checkIfItemInSupabaseCategory,
  createSupabaseAccount,
  fetchSavedItemsFromSupabaseCategory,
  getSupabaseUserSession,
  resetPasswordInSupabase,
  sendSupabaseResetPasswordLink,
  sendSupabaseUpdateEmailLink,
  signInToSupabase,
  signOutFromSupabase,
  updateEmailInSupabase,
} from '../utils/supabase-utils';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [memberSince, setMemberSince] = useState('');
  const [savedApartments, setSavedApartments] = useState([]);
  const [likedApartments, setLikedApartments] = useState([]);
  const [contactingOwnerApartments, setContactingOwnerApartments] = useState([]);
  const [applicationsInProgressApartments, setApplicationsInProgressApartments] = useState([]);
  const [completedApartments, setCompletedApartments] = useState([]);

  async function updateStateFromSupabase() {
    const {
      email: supabaseEmail,
      firstName: supabaseFirstName,
      lastName: supabaseLastName,
      memberSince: supabaseMemberSince,
    } = await getSupabaseUserSession();

    const savedForLaterItemsResponse = await fetchSavedItemsFromSupabaseCategory(
      supabaseEmail,
      'SAVED_FOR_LATER',
    );
    const likedItemsResponse = await fetchSavedItemsFromSupabaseCategory(supabaseEmail, 'LIKED');
    const contactingOwnerItemsResponse = await fetchSavedItemsFromSupabaseCategory(
      supabaseEmail,
      'CONTACTING_OWNER',
    );
    const applicationsInProgressItemsResponse = await fetchSavedItemsFromSupabaseCategory(
      supabaseEmail,
      'APPLICATIONS_IN_PROGRESS',
    );
    const completedItemsResponse = await fetchSavedItemsFromSupabaseCategory(
      supabaseEmail,
      'COMPLETED',
    );

    console.log(savedForLaterItemsResponse);

    setEmail(supabaseEmail);
    setFirstName(supabaseFirstName);
    setLastName(supabaseLastName);
    setLoggedIn(supabaseEmail !== '');
    setMemberSince(supabaseMemberSince);
    setSavedApartments(savedForLaterItemsResponse);
    setLikedApartments(likedItemsResponse);
    setContactingOwnerApartments(contactingOwnerItemsResponse);
    setApplicationsInProgressApartments(applicationsInProgressItemsResponse);
    setCompletedApartments(completedItemsResponse);
  }

  // set initial state from supabase session
  useEffect(() => {
    updateStateFromSupabase();
  }, []);

  async function createAccount(email, password, firstName, lastName) {
    const resp = await createSupabaseAccount(email, password, firstName, lastName);
    if (resp === 'Success') await login(email, password);
    return resp;
  }

  async function login(email, password) {
    const resp = await signInToSupabase(email, password);
    if (resp === 'Success') await updateStateFromSupabase();
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
    if (resp === 'Success') await updateStateFromSupabase();
    return resp;
  }

  async function updateEmail(newEmail, oldEmail) {
    const resp = await updateEmailInSupabase(newEmail, oldEmail);
    if (resp === 'Success') await updateStateFromSupabase();
    return resp;
  }

  async function resetPassword(password) {
    return await resetPasswordInSupabase(password);
  }

  async function isItemLiked(item) {
    // "Liked" refers to items that are saved but not in any other category
    // "SAVED_FOR_LATER" includes ALL saved items, which is why we checked for saved items here
    return await checkIfItemInSupabaseCategory(email, item, 'SAVED_FOR_LATER');
  }

  async function checkItemCategory(item) {
    if (email !== '') {
      const categories = ['LIKED', 'CONTACTING_OWNER', 'APPLICATIONS_IN_PROGRESS', 'COMPLETED'];

      for (let i = 0; i < categories.length; i++) {
        if (await checkIfItemInSupabaseCategory(email, item, categories[i])) return categories[i];
      }
    }

    return '';
  }

  async function likeItem(item) {
    if (email !== '') {
      const resp = await addItemToSupabaseCategory(email, 'SAVED_FOR_LATER', item);
      if (resp === 'Success') await updateStateFromSupabase();
      return resp;
    }
  }

  async function dislikeItem(item) {
    if (email !== '') {
      const resp = await addItemToSupabaseCategory(email, 'SAVED_FOR_LATER', item);
      if (resp === 'Success') await updateStateFromSupabase();
      return resp;
    }
  }

  async function moveItem(item, prevCategory, newCategory) {
    if (email !== '') {
      const resp = await addItemToSupabaseCategory(email, newCategory, item, prevCategory);
      if (resp === 'Success') await updateStateFromSupabase();
      return resp;
    }
  }

  const userValue = {
    loggedIn,
    firstName,
    lastName,
    createAccount,
    memberSince,
    email,
    savedApartments,
    likedApartments,
    contactingOwnerApartments,
    applicationsInProgressApartments,
    completedApartments,
    login,
    logout,
    sendResetPasswordLink,
    sendUpdateEmailLink,
    updateEmail,
    resetPassword,
    likeItem,
    dislikeItem,
    moveItem,
    checkItemCategory,
    isItemLiked,
  };

  return <UserContext.Provider value={userValue}>{children}</UserContext.Provider>;
};

export default function useUserContext() {
  return useContext(UserContext);
}
