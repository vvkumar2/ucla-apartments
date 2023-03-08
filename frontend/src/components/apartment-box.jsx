import { faPersonWalking } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { ReactComponent as HeartIcon } from '../assets/heart-icon.svg';
import useUserContext from '../context/user.context';

const ApartmentBox = ({ apartment }) => {
  const { loggedIn, likeItem, dislikeItem, checkItemCategory, isItemLiked } = useUserContext();
  const [liked, setLiked] = useState(false);

  const { id, name, address, image_url, beds, baths, sqft, rent, distance } = apartment;

  async function updateLikedState() {
    setLiked(await isItemLiked(apartment));
  }

  useEffect(() => {
    if (loggedIn) updateLikedState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  async function addToLiked() {
    setLiked(!liked); // Optimistic update that will be reverted by updateLikedState() if the request fails
    if (!loggedIn) return toast.error('Please log in to like an apartment.');
    if (!liked) await likeItem(apartment);
    else await dislikeItem(apartment);
    await updateLikedState();
  }

  return (
    <div className="flex w-full flex-col rounded-lg bg-white shadow-standard md:w-[calc((100%-40px)/2)] xl:w-[calc((100%-80px)/3)]">
      <ToastContainer hideProgressBar={true} />
      <div className="flex h-[200px] w-full items-center justify-center overflow-hidden rounded-t-lg">
        <img className="min-h-full w-auto min-w-full object-cover" src={image_url} alt="" />
      </div>
      <div className="flex w-full flex-col gap-4 py-5 px-8">
        <div className="flex flex-col">
          <h1 className="text-truncate cursor-pointer text-lg font-bold tracking-wide hover:text-blue-800">
            <Link to={'/apartment-listing?id=' + String(id)}>{name}</Link>
          </h1>
          {rent.toLowerCase() !== 'call for rent' ? (
            <div className="flex items-center">
              <span className="text-truncate text-md font-bold text-blue-700">{rent}</span>
              <span className="text-truncate text-sm text-gray-500">/month</span>
            </div>
          ) : (
            <span className="text-truncate text-sm text-gray-500">Call for rent</span>
          )}
        </div>
        <hr />
        <span className="text-truncate text-sm text-gray-500">{address}</span>
        <hr />
        <div className="apartment-card-details-layout text-sm text-gray-500">
          <div className="flex flex-col overflow-hidden">
            <span className="text-truncate text-sm text-gray-400">Beds</span>
            <div className="flex items-center gap-1 overflow-hidden">
              <span className="text-truncate text-md font-bold text-blue-700">{beds}</span>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-truncate text-sm text-gray-400">Baths</span>
            <div className="flex items-center gap-1 overflow-hidden">
              <span className="text-truncate text-md font-bold text-blue-700">{baths}</span>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-truncate text-sm text-gray-400">Square feet</span>
            <div className="flex items-center gap-1 overflow-hidden">
              <span className="text-truncate text-md font-bold text-blue-700">{sqft}</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex h-6 items-center justify-between">
          <HeartIcon
            className={`cursor-pointer  ${
              liked
                ? 'fill-red-500 hover:fill-red-700'
                : ' fill-none stroke-red-500 hover:fill-red-500'
            }`}
            onClick={() => addToLiked(apartment)}
          />
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faPersonWalking} className="h-4 text-gray-500" />
            <span className="text-sm">{distance} mi to UCLA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentBox;
