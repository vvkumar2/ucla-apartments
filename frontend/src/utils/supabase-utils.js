import { createClient } from "@supabase/supabase-js";

export async function fetchLikedItemsFromSupabase(email) {
    const supabase = createClient(process.env.REACT_APP_SUPABASE_URL ?? "", process.env.REACT_APP_SUPABASE_ANON_KEY ?? "");

    if (email !== "") {
        const { data } = await supabase.from("users").select("liked_items").eq("email", email);
        return data[0].liked_items ?? [];
    }

    return;
}

// Add or remove an item from the liked items list in the database and update the likedItems state
// category must be one of the following: 'LIKED', 'CONTACTING_OWNER', 'SAVED_FOR_LATER', 'APPLICATIONS_IN_PROGRESS', 'COMPLETED'
export async function addItemToSupabaseCategory(likedItems, email, category, beds, name, rent, sqft, baths, image, address, distance, id) {
    if (["LIKED", "CONTACTING_OWNER", "SAVED_FOR_LATER", "APPLICATIONS_IN_PROGRESS", "COMPLETED"].includes(category) === false) return;

    let rpc_dest = "";
    switch (category) {
        case "LIKED":
            rpc_dest = "liked_items";
            break;
        case "CONTACTING_OWNER":
            rpc_dest = "contacting_owner";
            break;

        case "SAVED_FOR_LATER":
            rpc_dest = "saved_for_later";
            break;

        case "APPLICATIONS_IN_PROGRESS":
            rpc_dest = "applications_in_progress";
            break;
        case "COMPLETED":
            rpc_dest = "completed";
            break;
        default:
            return;
    }

    const supabase = createClient(process.env.REACT_APP_SUPABASE_URL ?? "", process.env.REACT_APP_SUPABASE_ANON_KEY ?? "");

    // If the user is not logged in, alert them that they need to log in to like items
    if (email === "") {
        alert("Please login to save items!");
    } else {
        // Check if the item is already liked
        var likedItem = {
            beds: beds,
            name: name,
            rent: rent,
            sqft: sqft,
            baths: baths,
            address: address,
            distance: distance,
            image_url: image,
            id: id,
        };

        if (likedItems !== null && likedItems !== []) var liked = likedItems.some((elem) => JSON.stringify(likedItem) === JSON.stringify(elem));

        // If the item is not already liked, add it to the liked items list
        if (!liked) {
            await supabase.rpc(`append_to_${rpc_dest}`, {
                email: email,
                new_element: likedItem,
            });
            return likedItems.concat(likedItem);
        }

        // If the item is already liked, remove it from the liked items list
        else {
            await supabase.rpc(`remove_from_${rpc_dest}`, {
                email: email,
                new_element: likedItem,
            });

            // Update the likedItems state
            const newLikedItems = likedItems.map(({ id }) => id !== likedItem.id);

            return newLikedItems;
        }
    }
}
