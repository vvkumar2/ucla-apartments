import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../assets/loading-spinner';
import useUserContext from '../context/user.context';

export default function SavedApartmentBox({ apartment, category, tooltip = false }) {
  const { image_url, name, rent, sqft, beds, baths, id } = apartment;
  const { moveItem, dislikeItem } = useUserContext();
  const [loading, setLoading] = useState(false);

  async function handleDropdownChange(e) {
    if (e.target.value === false) return;
    setLoading(true);
    await moveItem(apartment, category, e.target.value);
    setLoading(false);
  }

  async function handleRemoveClick() {
    await dislikeItem(apartment);
  }

  return (
    <div className="relative flex w-full flex-col rounded-lg bg-white shadow-standard sm:w-[calc((100%-40px)/2)] xl:w-[calc((100%-80px)/3)]">
      <div className="relative h-[175px] w-full items-center justify-center overflow-hidden rounded-t-lg">
        <img
          className="image-bright min-h-full w-auto min-w-full object-cover"
          src={image_url}
          alt=""
        />
        {!tooltip && (
          <div className="w-content absolute top-0 right-0 p-1">
            <FontAwesomeIcon
              onClick={handleRemoveClick}
              icon={faX}
              className="w-content cursor-pointer rounded bg-white/80 py-1 px-2 text-xs font-semibold text-gray-700 shadow-standard backdrop-blur-sm hover:bg-gray-100"
            />
          </div>
        )}
        {!tooltip && (
          <div className="absolute right-0 bottom-0 m-1 flex items-center justify-end gap-2">
            {loading && <LoadingSpinner size="SMALL" color="WHITE" />}
            <select
              onChange={handleDropdownChange}
              name="cars"
              id="cars"
              className="w-[150px] rounded border-none bg-white/80 py-2 px-4 text-xs font-semibold text-gray-700 shadow-standard backdrop-blur-sm hover:bg-gray-100"
            >
              <option value="Move to" selected hidden disabled>
                Move to
              </option>
              {category === 'LIKED' && <option value="">Liked</option>}
              {category === 'CONTACTING_OWNER' && <option value="">Contacting Owner</option>}
              {category === 'APPLICATIONS_IN_PROGRESS' && (
                <option value="">Application in Progress</option>
              )}
              {category === 'COMPLETED' && <option value="">Completed</option>}

              {category !== 'LIKED' && <option value="LIKED">Liked</option>}
              {category !== 'CONTACTING_OWNER' && (
                <option value="CONTACTING_OWNER">Contacting Owner</option>
              )}
              {category !== 'APPLICATIONS_IN_PROGRESS' && (
                <option value="APPLICATIONS_IN_PROGRESS">Application in Progress</option>
              )}
              {category !== 'COMPLETED' && <option value="COMPLETED">Completed</option>}
            </select>
          </div>
        )}
      </div>
      <div className="flex w-full flex-col gap-3 py-3 px-8">
        <div className="flex flex-col">
          <h1 className="cursor-pointer truncate text-lg font-bold tracking-wide hover:text-blue-800">
            <Link to={'/apartment-listing?id=' + String(id)}>{name}</Link>
          </h1>
          {rent.toLowerCase() !== 'call for rent' ? (
            <div className="flex items-center">
              <span className="text-md truncate font-bold text-blue-700">{rent}</span>
              <span className="truncate text-sm text-gray-500">/month</span>
            </div>
          ) : (
            <span className="truncate text-sm text-gray-500">Call for rent</span>
          )}
        </div>
        <hr />
        <div className="apartment-card-details-layout flex flex-row gap-2 text-sm text-gray-500">
          <div className="flex w-fit flex-col overflow-hidden">
            <div className="text-truncate text-sm text-gray-500">Sqft</div>
            <div className="text-truncate text-md font-bold text-blue-700">{sqft}</div>
          </div>
          <div className="flex w-fit flex-col overflow-hidden">
            <div className="text-truncate text-sm text-gray-500">Beds</div>
            <div className="text-truncate text-md font-bold text-blue-700">{beds}</div>
          </div>
          <div className="flex w-fit flex-col overflow-hidden">
            <div className="text-truncate text-sm text-gray-500">Baths</div>
            <div className="text-truncate text-md font-bold text-blue-700">{baths}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
