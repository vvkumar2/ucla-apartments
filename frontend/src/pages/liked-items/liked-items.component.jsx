import React, { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import useUserContext from "../../context/user.context";
import SectionHeader from "../../components/section-header/section-header.component";
import ApartmentBoxList from "../../components/apartment-box-list/apartment-box-list.component";
import { createClient } from '@supabase/supabase-js'
import './liked-items.styles.css'

// Creating a supabase client to query the database
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const LikesPage = () => {
    const [likedItems, setLikedItems] = useState([]);
    const [error, setError] = useState("");
    const { email } = useUserContext();

    // Fetches the liked items for the user
    useEffect(() => {
        async function fetchLikedItems (event) {
            if (email!=="") {
                const { data, error } = await supabase
                    .from('users')
                    .select('liked_items')
                    .eq('email', email);
                if (data[0].liked_items) setLikedItems(data[0].liked_items)
                if (data[0].liked_items.length===0) setError("No Liked Items")
            }
            else {
                setError("Sign in to like items")
            }
        }
        fetchLikedItems()
    }, [])

    const listingsPerPage = 10
    let pageLimit = 5
    let maxPages = Math.ceil(likedItems.length/listingsPerPage)

    return(
        <div>
            <Navbar />
            <SectionHeader header_name="Liked Apartments" />
            <div style={{paddingTop: "20px"}}/>
            { likedItems.length>0 && <ApartmentBoxList apartmentList={likedItems} dataLimit={listingsPerPage} pageLimit={maxPages<pageLimit ? maxPages : pageLimit } maxPagesInput={maxPages}/>}
            { error!=="" && <h1 className="liked-items-error-message">{error}</h1> }
        </div>
    );
};

export default LikesPage;

