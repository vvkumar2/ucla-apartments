import SavedApartmentBox from '../components/saved-apartment-box';
import SectionHeader from '../components/section-header';
import useUserContext from '../context/user.context';

export default function LikedItems() {
  const {
    likedApartments,
    contactingOwnerApartments,
    applicationsInProgressApartments,
    completedApartments,
  } = useUserContext();

  return (
    <div>
      <div className="flex flex-col gap-8 py-8">
        <div className="flex flex-col gap-4">
          <div className="border-b-2 border-slate-300 py-2 font-medium">
            <SectionHeader header_name="Liked Items" />
          </div>
          {likedApartments.length > 0 ? (
            <div className="flex flex-row flex-wrap gap-6">
              {likedApartments.map((apt) => (
                <SavedApartmentBox apartment={apt} category={'LIKED'} />
              ))}
            </div>
          ) : (
            <span>No apartments in this category</span>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="border-b-2 border-slate-300 py-2 font-medium">
            <SectionHeader header_name="Contacting Owner" />
          </div>
          {contactingOwnerApartments.length > 0 ? (
            <div className="flex flex-row flex-wrap gap-6">
              {contactingOwnerApartments.map((apt) => (
                <SavedApartmentBox apartment={apt} category={'CONTACTING_OWNER'} />
              ))}
            </div>
          ) : (
            <span>No apartments in this category</span>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="border-b-2 border-slate-300 py-2 font-medium">
            <SectionHeader header_name="Application in Progress" />
          </div>
          {applicationsInProgressApartments.length > 0 ? (
            <div className="flex flex-row flex-wrap gap-6">
              {applicationsInProgressApartments.map((apt) => (
                <SavedApartmentBox apartment={apt} category={'APPLICATIONS_IN_PROGRESS'} />
              ))}
            </div>
          ) : (
            <span>No apartments in this category</span>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="border-b-2 border-slate-300 py-2 font-medium">
            <SectionHeader header_name="Completed" />
          </div>
          {completedApartments.length > 0 ? (
            <div className="flex flex-row flex-wrap gap-6">
              {completedApartments.map((apt) => (
                <SavedApartmentBox apartment={apt} category={'COMPLETED'} />
              ))}
            </div>
          ) : (
            <span>No apartments in this category</span>
          )}
        </div>
      </div>
    </div>
  );
}
