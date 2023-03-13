export default function MapsApartmentBox({ address, image_url, name, rent, sqft, beds, baths, id }) {
  
  // remove city and zip code for address
  const abbreviatedAddress =
    address.indexOf('Los Angeles') > 10
      ? address.substring(0, address.indexOf('Los Angeles'))
      : address;

  return (
    <div className="w-min-[300px] flex h-[300px] flex-col rounded-lg border-2 border-slate-100">
      <div className="relative h-[200px] w-full overflow-hidden">
        <img
          className="w-full overflow-hidden rounded-md object-cover image-bright"
          src={image_url}
          alt="Apartment"
        />
      </div>
      <div className="flex w-full flex-col gap-1 py-2 px-4">
        <div className="flex flex-col">
          <h1 className="truncate cursor-pointer text-lg font-bold tracking-wide hover:text-blue-800">
            <a href={`/apartment-listing?id=${id}`}>{name}</a>
          </h1>
          {rent.toLowerCase() !== 'call for rent' ? (
            <div className="flex items-center">
              <span className="truncate text-md font-bold text-blue-700">{rent}</span>
              <span className="truncate text-sm text-gray-500">/month</span>
            </div>
          ) : (
            <span className="truncate text-sm font-bold text-gray-500">Call for rent</span>
          )}
        </div>
        <hr />
        <div className="apartment-card-details-layout text-sm text-gray-500">
          <div className="flex flex-col overflow-hidden">
            <span className="text-truncate text-sm text-gray-500">Sqft</span>
            <div className="flex items-center gap-1 overflow-hidden">
              <span className="text-truncate text-md font-bold text-blue-700">{sqft}</span>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-truncate text-sm text-gray-500">Beds</span>
            <div className="flex items-center gap-1 overflow-hidden">
              <span className="text-truncate text-md font-bold text-blue-700">{beds}</span>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-truncate text-sm text-gray-500">Baths</span>
            <div className="flex items-center gap-1 overflow-hidden">
              <span className="text-truncate text-md font-bold text-blue-700">{baths}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
