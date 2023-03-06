import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL ?? "",
  process.env.REACT_APP_SUPABASE_ANON_KEY ?? ""
);

export async function createSupabaseAccount(
  email,
  password,
  firstName,
  lastName
) {
  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  return error?.message ?? "Success";
}

export async function signInToSupabase(email, password) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return error?.message ?? "Success";
}

export async function signOutFromSupabase() {
  await supabase.auth.signOut();
}

export async function sendSupabaseResetPasswordLink(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.BASE_URL}/reset-password`,
  });

  return error?.message ?? "Success";
}

export async function sendSupabaseUpdateEmailLink(email) {
  const { error } = await supabase.auth.updateUser(
    { email },
    {
      redirectTo: `${process.env.BASE_URL}/reset-email`,
    }
  );

  return error?.message ?? "Success";
}

export async function updateEmailInSupabase(newEmail, oldEmail) {
  const { error } = await supabase
    .from("users")
    .update({ email: newEmail })
    .eq("email", oldEmail);

  return error?.message ?? "Success";
}

export async function resetPasswordInSupabase(password) {
  const { error } = await supabase.auth.updateUser({
    password,
  });

  return error?.message ?? "Success";
}

/**
 * Get the current Supabase user session
 * @returns an object with the following fields: `email`, `firstName`, `lastName`
 */
export async function getSupabaseUserSession() {
  const { data } = await supabase.auth.getSession();
  const {
    session: { user },
  } = data;

  if (user) {
    const { data: userData, error } = await supabase
      .from("users")
      .select("time_registered")
      .eq("email", user.email);

    if (userData) {
      const time_registered = userData[0].time_registered.split("-");
      const year_registered = time_registered[0];
      const month_registered_number = time_registered[1];

      const date = new Date();
      date.setMonth(month_registered_number - 1);
      const month_registered_name = date.toLocaleString("en-US", {
        month: "long",
      });

      const memberSince = month_registered_name + " " + year_registered;

      return {
        email: user.email,
        firstName: user.user_metadata.first_name,
        lastName: user.user_metadata.last_name,
        memberSince,
      };
    }

    return { email: "", firstName: "", lastName: "", memberSince: "" };
  }

  return { email: "", firstName: "", lastName: "", memberSince: "" };
}

/**
 * Return the list of items in the specified category for the current user
 * @param email users email
 * @param category one of the following:  'LIKED', 'CONTACTING_OWNER', 'SAVED_FOR_LATER', 'APPLICATIONS_IN_PROGRESS', 'COMPLETED'
 */
export async function fetchSavedItemFromSupabaseCategory(email, category) {
  if (
    [
      "LIKED",
      "CONTACTING_OWNER",
      "SAVED_FOR_LATER",
      "APPLICATIONS_IN_PROGRESS",
      "COMPLETED",
    ].includes(category) === false
  )
    return;

  if (email !== "") {
    const fieldName = `apartments_${category.toLowerCase()}`;
    const { data } = await supabase
      .from("users")
      .select(fieldName)
      .eq("email", email);
    return data[0][fieldName] ?? [];
  }
}

export async function checkIfItemInSupabaseCategory(
  email,
  apartment,
  category
) {
  if (
    [
      "LIKED",
      "CONTACTING_OWNER",
      "SAVED_FOR_LATER",
      "APPLICATIONS_IN_PROGRESS",
      "COMPLETED",
    ].includes(category) === false
  )
    return;

  if (email !== "") {
    const { data } = await supabase
      .from("users")
      .select(`apartments_${category.toLowerCase()}`)
      .eq("email", email);

    const res = data[0]["apartments_liked"] ?? [];
    return res.some((elem) => elem.id === apartment.id);
  }
}

/**
 * Add or remove an item from the liked items list in the database and update the likedItems state
 * @param category one of the following: 'LIKED', 'CONTACTING_OWNER', 'SAVED_FOR_LATER', 'APPLICATIONS_IN_PROGRESS', 'COMPLETED'
 */
export async function addItemToSupabaseCategory(
  email,
  category,
  apartment,
  prevCategory = "NONE"
) {
  if (
    [
      "LIKED",
      "CONTACTING_OWNER",
      "SAVED_FOR_LATER",
      "APPLICATIONS_IN_PROGRESS",
      "COMPLETED",
    ].includes(category) === false
  )
    return;

  if (email === "") {
    return alert("Please login to save items!");
  }

  let rpc_dest = category.toLowerCase();

  const currentCategoryItems = await fetchSavedItemFromSupabaseCategory(
    email,
    category
  );
  if (currentCategoryItems !== null && currentCategoryItems !== [])
    var exists = currentCategoryItems.some((elem) => elem.id === apartment.id);

  if (!exists) {
    // If the item is already saved in a different category, remove it from that category
    if (prevCategory !== "NONE") {
      const prevCategoryItems = await fetchSavedItemFromSupabaseCategory(
        email,
        prevCategory
      );
      if (prevCategoryItems !== null && prevCategoryItems !== [])
        var existsPrev = prevCategoryItems.some(
          (elem) => elem.id === apartment.id
        );

      if (existsPrev) {
        await supabase.rpc(`remove_from_${prevCategory.toLowerCase()}_items`, {
          email: email,
          remove_element: apartment,
        });
      }
    }

    await supabase.rpc(`append_to_${rpc_dest}_items`, {
      email: email,
      new_element: apartment,
    });

    // liked apartments also get added to saved for later
    if (category === "LIKED") {
      await supabase.rpc(`append_to_saved_for_later_items`, {
        email: email,
        new_element: apartment,
      });
    }
    return apartment;
  } else {
    // if apartment is already saved, remove from liked and all other categories
    await supabase.rpc(`remove_from_liked_items`, {
      email: email,
      new_element: apartment,
    });

    for (const otherCategory of [
      "CONTACTING_OWNER",
      "SAVED_FOR_LATER",
      "APPLICATIONS_IN_PROGRESS",
      "COMPLETED",
    ]) {
      if (checkIfItemInSupabaseCategory(email, apartment, otherCategory)) {
        await supabase.rpc(`remove_from_${otherCategory.toLowerCase()}_items`, {
          email: email,
          remove_element: apartment,
        });
      }
    }
  }
}
