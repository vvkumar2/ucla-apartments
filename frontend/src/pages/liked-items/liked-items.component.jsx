import React, { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import useUserContext from "../../context/user.context";
import SectionHeader from "../../components/section-header/section-header.component";
import ApartmentBoxList from "../../components/apartment-box-list/apartment-box-list.component";
import SavedApartmentBox from "../../components/saved-apartment-box/saved-apartment-box.component";
import { fetchLikedItemsFromSupabase } from "../../utils/supabase-utils";
import "./liked-items.styles.css";

const LikesPage = () => {
    const [likedItems, setLikedItems] = useState([]);
    const [activeApplications, setActiveApplications] = useState([]);
    const [submittedApplications, setSubmittedApplications] = useState([]);
    const [error, setError] = useState("");
    const { email } = useUserContext();

    // Fetches the liked items for the user
    useEffect(() => {
        async function setNewLikedItems() {
            const newLikedItems = await fetchLikedItemsFromSupabase(email);
            if (newLikedItems === undefined) setError("Sign in to like items");
            else if (newLikedItems.length === 0) setError("No liked items");
            else setLikedItems(newLikedItems);
        }

        setNewLikedItems();
    }, [email]);

    return (
        <div>
            <Navbar />
            {error === "" && (
                <>
                    <SectionHeader header_name="Saved Apartments" />
                    <div className="apartment-categories">
                        <div className="apartment-category">
                            <h2 className="apartment-category-header">Saved for later</h2>
                            {likedItems.length > 0 ? (
                                <div className="saved-apartment-cards">
                                    {likedItems.map(({ name, address, image_url, id }) => (
                                        <SavedApartmentBox name={name} address={address} image_url={image_url} id={id} />
                                    ))}
                                </div>
                            ) : (
                                <span>No liked apartments</span>
                            )}
                        </div>
                        <div className="apartment-category">
                            <h2 className="apartment-category-header">Contacting Owner</h2>
                            {likedItems.length > 0 ? (
                                <div className="saved-apartment-cards">
                                    {likedItems.map(({ name, address, image_url, id }) => (
                                        <SavedApartmentBox name={name} address={address} image_url={image_url} id={id} />
                                    ))}
                                </div>
                            ) : (
                                <span>No liked apartments</span>
                            )}
                        </div>
                        <div className="apartment-category">
                            <h2 className="apartment-category-header">Applications in Progress</h2>
                            {likedItems.length > 0 ? (
                                <div className="saved-apartment-cards">
                                    {likedItems.map(({ name, address, distance, image_url, id }) => (
                                        <SavedApartmentBox name={name} address={address} image_url={image_url} id={id} />
                                    ))}
                                </div>
                            ) : (
                                <span>No liked apartments</span>
                            )}
                        </div>
                        <div className="apartment-category">
                            <h2 className="apartment-category-header">Completed</h2>
                            {likedItems.length > 0 ? (
                                <div className="saved-apartment-cards">
                                    {likedItems.map((apt) => {
                                        console.log(apt);
                                        // return <SavedApartmentBox name={name} address={address} distance={distance} image_url={image_url} id={id} />;
                                    })}
                                </div>
                            ) : (
                                <span>No liked apartments</span>
                            )}
                        </div>
                    </div>
                </>
            )}

            {error !== "" && <h1 className="liked-items-error-message">{error}</h1>}
        </div>
    );
};

export default LikesPage;
