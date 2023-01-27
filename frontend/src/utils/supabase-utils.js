import { createClient } from "@supabase/supabase-js";

/**
 * Return the list of items in the specified category for the current user
 * @param email users email
 * @param category one of the following:  'LIKED', 'CONTACTING_OWNER', 'SAVED_FOR_LATER', 'APPLICATIONS_IN_PROGRESS', 'COMPLETED'
 */
export async function fetchSavedItemFromSupabaseCategory(email, category) {
    if (["LIKED", "CONTACTING_OWNER", "SAVED_FOR_LATER", "APPLICATIONS_IN_PROGRESS", "COMPLETED"].includes(category) === false) return;

    if (email !== "") {
        const fieldName = `apartments_${category.toLowerCase()}`;
        const supabase = createClient(process.env.REACT_APP_SUPABASE_URL ?? "", process.env.REACT_APP_SUPABASE_ANON_KEY ?? "");
        const { data } = await supabase.from("users").select(fieldName).eq("email", email);
        return data[0][fieldName] ?? [];
    }
}

export async function checkIfItemInSupabaseCategory(email, apartment, category) {
    if (["LIKED", "CONTACTING_OWNER", "SAVED_FOR_LATER", "APPLICATIONS_IN_PROGRESS", "COMPLETED"].includes(category) === false) return;

    if (email !== "") {
        const supabase = createClient(process.env.REACT_APP_SUPABASE_URL ?? "", process.env.REACT_APP_SUPABASE_ANON_KEY ?? "");
        const { data } = await supabase.from("users").select(`apartments_${category.toLowerCase()}`).eq("email", email);

        const res = data[0]['apartments_liked'] ?? [];
        return res.some((elem) => elem.id === apartment.id);
    }
}

/**
 * Add or remove an item from the liked items list in the database and update the likedItems state
 * @param category one of the following: 'LIKED', 'CONTACTING_OWNER', 'SAVED_FOR_LATER', 'APPLICATIONS_IN_PROGRESS', 'COMPLETED'
 */
export async function addItemToSupabaseCategory(email, category, apartment, prevCategory = "NONE") {
    if (["LIKED", "CONTACTING_OWNER", "SAVED_FOR_LATER", "APPLICATIONS_IN_PROGRESS", "COMPLETED"].includes(category) === false) return;

    if (email === "") {
        return alert("Please login to save items!");
    }

    let rpc_dest = category.toLowerCase();
    const supabase = createClient(process.env.REACT_APP_SUPABASE_URL ?? "", process.env.REACT_APP_SUPABASE_ANON_KEY ?? "");

    const currentCategoryItems = await fetchSavedItemFromSupabaseCategory(email, category);
    if (currentCategoryItems !== null && currentCategoryItems !== []) var exists = currentCategoryItems.some((elem) => elem.id === apartment.id);

    if (!exists) {
        // If the item is already saved in a different category, remove it from that category
        if (prevCategory !== "NONE") {
            const prevCategoryItems = await fetchSavedItemFromSupabaseCategory(email, prevCategory);
            if (prevCategoryItems !== null && prevCategoryItems !== []) var existsPrev = prevCategoryItems.some((elem) => elem.id === apartment.id);

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
            remove_element: apartment,
        });

        for (const otherCategory of ["CONTACTING_OWNER", "SAVED_FOR_LATER", "APPLICATIONS_IN_PROGRESS", "COMPLETED"]) {
            if (checkIfItemInSupabaseCategory(email, apartment, otherCategory)) {
                await supabase.rpc(`remove_from_${otherCategory.toLowerCase()}_items`, {
                    email: email,
                    remove_element: apartment,
                });
            }
        }
    }
}
