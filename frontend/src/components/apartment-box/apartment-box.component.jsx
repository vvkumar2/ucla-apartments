import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faBath, faPersonWalking } from '@fortawesome/free-solid-svg-icons'
import {ReactComponent as HeartIcon} from "../../assets/heart-icon.svg"
import { createClient } from '@supabase/supabase-js'
import useUserContext from "../../context/user.context";
import './apartment-box.styles.css'

// const id = "e59598f1-0607-4446-a2ed-4f31d802948d";
const ApartmentBox = ({image, name, address, url, beds, baths, sqft, rent, distance, liked, addToLiked}) => {
    // const [btnClass, setBtnClass] = useState(false);
    // const { email, likedItems, setLikedItems } = useUserContext()
    // const [likedItemsNow, setLikedItemsNow] = useState(useUserContext().likedItems)

    // async function addToLiked() {
    //     console.log(likedItems)
    //     if (email==="") {
    //         alert("Must Login to like items")
    //     }
    //     else {
    //         const likedItem = { image: image, name: name, address: address, beds: beds, baths: baths, sqft: sqft, rent: rent, distance: distance } 

            // if (btnClass) {
                // let { data, error } = await supabase
                // .rpc('remove_array', {
                //     id: id,
                //     new_element: likedItem
                // })
                // let index = likedItems.findIndex({image})
                // setLikedItems(likedItems.splice(index, 1))
            //     console.log(data)
            //     console.log(error)
            // }
            // else {
                // let { data, error } = await supabase
                // .rpc('append_array', {
                //     id: id,
                //     new_element: likedItem
                // })
            //     setLikedItems(likedItems.concat({image}))
            //     console.log(data)
            //     console.log(error)
            // }

    //         btnClass ? setBtnClass(false) : setBtnClass(true);
    //     }
    // }

    // useEffect(() => {
    //     async function fetchLikedItems (event) {
    //         const { data, error } = await supabase
    //             .from('users')
    //             .select('liked_items')
    //             .eq('email', email);
    //         console.log(data[0].liked_items)
    //         console.log(error)
    //     }
    //     fetchLikedItems()
    // }, [btnClass])

    return (
    <div className="apartment-box">
        <img className="apartment-box-image"
            src={image}
            alt=""
        />
        <div className="apartment-box-description">
            <div className="apartment-box-top">
                <div className="apartment-box-top-left">
                    <h1 className="apartment-name">{name}</h1>
                    <div className="apartment-description">
                        <p className="apartment-address">{address}</p>
                        {/* <p className="apartment-url"><a href={url}>{url}</a></p> */}
                        <p><FontAwesomeIcon icon={faBed} /> &emsp;{beds} &emsp;&emsp;&emsp;&emsp; <FontAwesomeIcon icon={faBath} /> &emsp;{baths} &emsp;&emsp;&emsp;&emsp;  {sqft} Sqft </p>
                    </div>
                </div>
                <div className="apartment-box-top-right">
                    <button className="apartment-box-interested">Learn More</button>
                    <HeartIcon className={liked ? "like-button-icon clicked" : "like-button-icon not-clicked"} 
                        onClick={() => addToLiked(beds, name, rent, sqft, baths, image, address, distance)} />
                </div>
                {/* Add a like button */}
            </div>
            <div className="apartment-box-bottom">
                <div className="apartment-box-bottom-left">
                    <h1 className="apartment-rent">Monthly Rent: {rent}</h1>
                </div>
                <div className="apartment-box-bottom-right">
                    <p className="apartment-utilities">UCLA <FontAwesomeIcon icon={faPersonWalking} /> : {distance} mi</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ApartmentBox;
