import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import useUserContext from '../context/user.context';

export default function SavedApartmentBox({ apartment, category, tooltip = false }) {
  const { image_url, name, rent, sqft, beds, baths, id } = apartment;
  const { moveItem, dislikeItem } = useUserContext();

  async function handleDropdownChange(e) {
    if (e.target.value === false) return;
    await moveItem(apartment, category, e.target.value);
  }

  async function handleRemoveClick() {
    await dislikeItem(apartment);
  }

  return (
    <div className="flex h-min w-80 flex-col rounded-lg bg-white shadow-standard">
      <div className="relative h-[175px] w-full items-center justify-center overflow-hidden rounded-t-lg">
        <img className="min-h-full w-auto min-w-full object-cover" src={image_url} alt="" />
        {!tooltip && (
          <div className="absolute top-0 right-0 p-1">
            <FontAwesomeIcon
              onClick={handleRemoveClick}
              icon={faX}
              className="w-1/3 cursor-pointer rounded bg-white/80 py-1 px-2 text-xs font-semibold text-gray-700 shadow-standard backdrop-blur-sm hover:bg-gray-100"
            />
          </div>
        )}
        {!tooltip && (
          <select
            onChange={handleDropdownChange}
            name="cars"
            id="cars"
            className="absolute right-0 bottom-0 m-1 w-1/2 rounded border-none bg-white/80 py-2 px-4 text-xs font-semibold text-gray-700 shadow-standard backdrop-blur-sm hover:bg-gray-100 sm:w-1/3"
          >
            <option value="Move to" selected hidden disabled>
              Move to
            </option>
            {category === 'SAVED_FOR_LATER' && <option value="">Liked</option>}
            {category === 'CONTACTING_OWNER' && <option value="">Contacting Owner</option>}
            {category === 'APPLICATIONS_IN_PROGRESS' && (
              <option value="">Application in Progress</option>
            )}
            {category === 'COMPLETED' && <option value="">Completed</option>}

            {category !== 'SAVED_FOR_LATER' && <option value="SAVED_FOR_LATER">Liked</option>}
            {category !== 'CONTACTING_OWNER' && (
              <option value="CONTACTING_OWNER">Contacting Owner</option>
            )}
            {category !== 'APPLICATIONS_IN_PROGRESS' && (
              <option value="APPLICATIONS_IN_PROGRESS">Application in Progress</option>
            )}
            {category !== 'COMPLETED' && <option value="COMPLETED">Completed</option>}
          </select>
        )}
      </div>
      <div className="flex w-full flex-col gap-3 py-3 px-8">
        <div className="flex flex-col">
          <Link
            to={`/apartment-listing?id=${id}`}
            className="cursor-pointer text-ellipsis text-lg font-bold tracking-wide hover:text-blue-700"
          >
            {name}
          </Link>
          <div className="flex items-center gap-1 overflow-hidden">
            <span className="text-truncate py-1 text-sm font-bold text-blue-700">
              {rent}
              <p className="float-right ">/month</p>
            </span>
          </div>
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
