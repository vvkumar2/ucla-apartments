import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import useUserContext from "../context/user.context";
import SectionHeader from "../components/section-header";
import SavedApartmentBox from "../components/saved-apartment-box";
import { fetchSavedItemFromSupabaseCategory } from "../utils/supabase-utils";

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
        <div >
            {error === "" && (
                <>
                    <div className="flex flex-col gap-8 py-8">
                        <div className="flex flex-col gap-4">
                            <div className="font-medium border-b-2 border-slate-300 py-2">
                                <SectionHeader  header_name="Liked Items" />
                            </div>
                            {savedForLaterItems.length > 0 ? (
                                <div className="flex flex-row gap-6 flex-wrap">
                                    {savedForLaterItems.map((apt) => (
                                        <SavedApartmentBox apartment={apt} category={"SAVED_FOR_LATER"} />
                                    ))}
                                </div>
                            ) : (
                                <span>No apartments in this category</span>
                            )}
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="font-medium border-b-2 border-slate-300 py-2">
                                <SectionHeader  header_name="Contacting Owner" />
                            </div>
                            {contactingOwnerItems.length > 0 ? (
                                <div className="flex flex-row gap-6 flex-wrap">
                                    {contactingOwnerItems.map((apt) => (
                                        <SavedApartmentBox apartment={apt} category={"CONTACTING_OWNER"} />
                                    ))}
                                </div>
                            ) : (
                                <span>No apartments in this category</span>
                            )}
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="font-medium border-b-2 border-slate-300 py-2">
                                <SectionHeader  header_name="Application in Progress" />
                            </div>
                            {applicationsInProgressItems.length > 0 ? (
                                <div className="flex flex-row gap-6 flex-wrap">
                                    {applicationsInProgressItems.map((apt) => (
                                        <SavedApartmentBox apartment={apt} category={"APPLICATIONS_IN_PROGRESS"} />
                                    ))}
                                </div>
                            ) : (
                                <span>No apartments in this category</span>
                            )}
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="font-medium border-b-2 border-slate-300 py-2">
                                <SectionHeader  header_name="Completed" />
                            </div>
                            {completedItems.length > 0 ? (
                                <div className="flex flex-row gap-6 flex-wrap">
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

            {error !== "" && <h1 className="mt-[10vh] text-xl">{error}</h1>}
        </div>
    );
};

export default LikesPage;
