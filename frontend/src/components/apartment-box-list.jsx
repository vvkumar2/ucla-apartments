import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import ApartmentBox from './apartment-box';

const ApartmentBoxList = ({ apartmentList, dataLimit, pageLimit, maxPagesInput }) => {
  const [maxPages, setMaxPages] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Set the max number of pages needed to display all the apartments
  useEffect(() => {
    setMaxPages(Math.ceil(apartmentList.length / dataLimit));
    setCurrentPage(1);
  }, [apartmentList, dataLimit]);

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: '0px' });
  }, [currentPage]);

  function goToNextPage() {
    if (currentPage < maxPages) {
      setCurrentPage((page) => page + 1);
    }
  }

  function goToPreviousPage() {
    if (currentPage > 1) {
      setCurrentPage((page) => page - 1);
    }
  }

  function updateCurrentPage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  // Get the data for the current page
  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return apartmentList.slice(startIndex, endIndex);
  };

  // Get the page numbers to display
  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <div className="mb-20 flex flex-col gap-5">
      <div className="flex justify-between text-sm text-gray-400">
        <p>Showing {apartmentList.length} Results</p>
        <p>
          {' '}
          Page {currentPage} of {maxPages}
        </p>
      </div>
      <div className="flex flex-wrap gap-10">
        {getPaginatedData().map((apartment, index) =>
          apartment ? <ApartmentBox key={index} apartment={apartment} /> : null,
        )}
      </div>
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={goToPreviousPage}
          className="flex h-[30px] w-[30px] items-center justify-center bg-gray-50"
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={updateCurrentPage}
            className={`flex h-[30px] w-[30px] items-center justify-center bg-gray-50 ${
              currentPage === item ? 'text-blue-700' : 'text-gray-600'
            }`}
          >
            <span>{item}</span>
          </button>
        ))}
        <button
          onClick={goToNextPage}
          className="flex h-[30px] w-[30px] items-center justify-center bg-gray-50"
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </div>
  );
};

export default ApartmentBoxList;
