import React, {useEffect, useState} from "react";
import ApartmentBox from "../apartment-box/apartment-box.component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import './apartment-box-list.styles.css'


const ApartmentBoxList = ({apartmentList, dataLimit, pageLimit, maxPagesInput}) => {
  // const maxPagesInitial = Math.ceil(apartmentList.length/dataLimit);
  const [maxPages, setMaxPages] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setMaxPages(Math.ceil(apartmentList.length/dataLimit))
    setCurrentPage(1)
  }, [apartmentList, dataLimit]);

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: '0px' });
  }, [currentPage]);

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
        return (
          <ApartmentBox 
            image={apartment.image_url}
            name={apartment.name}
            address={apartment.address}
            url={apartment.url}
            beds={apartment.beds}
            baths={apartment.baths}
            sqft={apartment.sqft}
            monthly_rent={apartment.monthly_rent}
            distance={apartment.distance}
          />
        )})}
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
