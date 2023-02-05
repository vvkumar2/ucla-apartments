import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import useUserContext from "../../context/user.context";
import SectionHeader from "../../components/section-header/section-header.component";
import SavedApartmentBox from "../../components/saved-apartment-box/saved-apartment-box.component";
import { fetchSavedItemFromSupabaseCategory } from "../../utils/supabase-utils";
import "./liked-items.styles.css";

const LikesPage = () => {
    const { email } = useUserContext();
    const [savedForLaterItems, setSavedForLaterItems] = useState([]);
    const [contactingOwnerItems, setContactingOwnerItems] = useState([]);
    const [applicationsInProgressItems, setApplicationsInProgressItems] = useState([]);
    const [completedItems, setCompletedItems] = useState([]);
    const [error, setError] = useState("");

    // update all saved items on page load
    useEffect(() => {
        async function populateItemCategories() {
            const savedForLaterItemsResponse = await fetchSavedItemFromSupabaseCategory(email, "SAVED_FOR_LATER");
            const contactingOwnerItemsResponse = await fetchSavedItemFromSupabaseCategory(email, "CONTACTING_OWNER");
            const applicationsInProgressItemsResponse = await fetchSavedItemFromSupabaseCategory(email, "APPLICATIONS_IN_PROGRESS");
            const completedItemsResponse = await fetchSavedItemFromSupabaseCategory(email, "COMPLETED");

            if (
                savedForLaterItemsResponse === undefined ||
                contactingOwnerItemsResponse === undefined ||
                applicationsInProgressItemsResponse === undefined ||
                completedItemsResponse === undefined
            ) {
                setError("Please login to see your saved apartments");
                return;
            }
            setSavedForLaterItems(savedForLaterItemsResponse);
            setContactingOwnerItems(contactingOwnerItemsResponse);
            setApplicationsInProgressItems(applicationsInProgressItemsResponse);
            setCompletedItems(completedItemsResponse);
        }
        populateItemCategories();
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
                            {savedForLaterItems.length > 0 ? (
                                <div className="saved-apartment-cards">
                                    {savedForLaterItems.map((apt) => (
                                        <SavedApartmentBox apartment={apt} category={"SAVED_FOR_LATER"} />
                                    ))}
                                </div>
                            ) : (
                                <span>No apartments in this category</span>
                            )}
                        </div>
                        <div className="apartment-category">
                            <h2 className="apartment-category-header">Contacting Owner</h2>
                            {contactingOwnerItems.length > 0 ? (
                                <div className="saved-apartment-cards">
                                    {contactingOwnerItems.map((apt) => (
                                        <SavedApartmentBox apartment={apt} category={"CONTACTING_OWNER"} />
                                    ))}
                                </div>
                            ) : (
                                <span>No apartments in this category</span>
                            )}
                        </div>
                        <div className="apartment-category">
                            <h2 className="apartment-category-header">Applications in Progress</h2>
                            {applicationsInProgressItems.length > 0 ? (
                                <div className="saved-apartment-cards">
                                    {applicationsInProgressItems.map((apt) => (
                                        <SavedApartmentBox apartment={apt} category={"APPLICATIONS_IN_PROGRESS"} />
                                    ))}
                                </div>
                            ) : (
                                <span>No apartments in this category</span>
                            )}
                        </div>
                        <div className="apartment-category">
                            <h2 className="apartment-category-header">Completed</h2>
                            {completedItems.length > 0 ? (
                                <div className="saved-apartment-cards">
                                    {completedItems.map((apt) => (
                                        <SavedApartmentBox apartment={apt} category={"COMPLETED"} />
                                    ))}
                                </div>
                            ) : (
                                <span>No apartments in this category</span>
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
