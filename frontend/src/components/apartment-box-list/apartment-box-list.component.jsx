import React, {useEffect, useState} from "react";
import ApartmentBox from "../apartment-box/apartment-box.component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import './apartment-box-list.styles.css'
import { createClient } from '@supabase/supabase-js'
import useUserContext from "../../context/user.context";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const ApartmentBoxList = ({apartmentList, dataLimit, pageLimit, maxPagesInput}) => {
  // const maxPagesInitial = Math.ceil(apartmentList.length/dataLimit);
  const [maxPages, setMaxPages] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [likedItems, setLikedItems] = useState([]);
  const { email } = useUserContext();

  useEffect(() => {
    setMaxPages(Math.ceil(apartmentList.length/dataLimit))
    setCurrentPage(1)
  }, [apartmentList, dataLimit]);

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: '0px' });
  }, [currentPage]);

  useEffect(() => {
    async function fetchLikedItems (event) {
      if (email!=="") {
        const { data, error } = await supabase
            .from('users')
            .select('liked_items')
            .eq('email', email);
        if (data[0].liked_items) setLikedItems(data[0].liked_items)
      }
    }
    fetchLikedItems()
  }, [])

  async function addToLiked(beds, name, rent, sqft, baths, image, address, distance) {
    if (email==="") {
      alert("Can only like items when you're logged in")
    }
    else {
      const id = "e59598f1-0607-4446-a2ed-4f31d802948d";
      var likedItem = { beds: beds, name: name, rent: rent, sqft: sqft, baths: baths, address: address, distance: distance, image_url: image }  
      if (likedItems!==null && likedItems!==[]) var liked = likedItems.some(elem => JSON.stringify(likedItem) === JSON.stringify(elem));

      if(!liked) {
        let { data, error } = await supabase
        .rpc('append_array', {
            email: email,
            new_element: likedItem
        })
        setLikedItems(likedItems.concat(likedItem))

        console.log(data)
        console.log(error)
      }
      else {
        let { data, error } = await supabase
        .rpc('remove_array', {
          email: email,
            new_element: likedItem
        })
        const newLikedItems = []
        for (let i=0; i<likedItems.length; i++) {
          var item = { beds: likedItems[i].beds, name: likedItems[i].name, rent: likedItems[i].rent, sqft: likedItems[i].sqft, baths: likedItems[i].baths, address: likedItems[i].address, distance: likedItems[i].distance, image_url: likedItems[i].image_url }  
          if(!(JSON.stringify(item)===JSON.stringify(likedItem))) {
            newLikedItems.push(item)
          }
        }
        setLikedItems(newLikedItems)
      }
    }
  }

  function goToNextPage() {
    if(currentPage<maxPages) {
      setCurrentPage((page) => page + 1);
    }
  }

  function goToPreviousPage() {
    if(currentPage>1) {
      setCurrentPage((page) => page - 1);
    }
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return apartmentList.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <div className="card-list">
      <div>
        <div className="listings-pages-info">
          <p className="num-listings">Showing {apartmentList.length} Results</p>
          <p className="num-pages"> Page {currentPage} of {maxPages}</p>
        </div>
      {getPaginatedData().map((apartment) => {
        if (apartment!==undefined) {
        var info = { beds: apartment.beds, name: apartment.name, rent: apartment.rent, sqft: apartment.sqft, baths: apartment.baths, address: apartment.address, distance: apartment.distance, image_url: apartment.image_url }
        if (likedItems!==null && likedItems!==[]) var liked = likedItems.some(elem => JSON.stringify(info) === JSON.stringify(elem));
        // console.log(info)
        // console.log(likedItems)
        // console.log(JSON.stringify(info))
        // console.log(JSON.stringify(likedItems[0]))
        // console.log(contains)
        return (
          <ApartmentBox 
            id={apartment.id}
            image={apartment.image_url}
            name={apartment.name}
            address={apartment.address}
            url={apartment.url}
            beds={apartment.beds}
            baths={apartment.baths}
            sqft={apartment.sqft}
            rent={apartment.rent}
            distance={apartment.distance}
            liked={liked}
            addToLiked={addToLiked}
            image_list={apartment.all_image_urls}
            office_hours={apartment.office_hours}
            about_text={apartment.about_text}
            unique_features={apartment.unique_features}
            community_amenities={apartment.community_amenities}
            property_services={apartment.property_services}
            apartment_highlights={apartment.apartment_highlights}
            kitchen_features={apartment.kitchen_features}
            floor_plan_features={apartment.floor_plan_features}
            utilities={apartment.utilities}
            website_url={apartment.website_url}
            phone_number={apartment.phone_number}
            phone_number_href={apartment.phone_number_href}
            seller_logo={apartment.seller_logo_url}

          />
        )}})}
      </div>
        <div className="pagination">
          {/* previous button */}
          <button
            onClick={goToPreviousPage}
            className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>

          {/* show page numbers */}
          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={changePage}
              className={`paginationItem ${currentPage === item ? 'active' : null}`}
            >
              <span>{item}</span>
            </button>
          ))}

          {/* next button */}
          <button
            onClick={goToNextPage}
            className={`next ${currentPage === maxPages ? 'disabled' : ''}`}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
    </div>
  )}

export default ApartmentBoxList;
