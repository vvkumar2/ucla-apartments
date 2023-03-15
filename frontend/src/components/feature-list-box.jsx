import {
  faChevronDown,
  faDumbbell,
  faKitchenSet,
  faLightbulb,
  faPlugCircleBolt,
  faRug,
  faTruckFast,
  faWifi,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const FeatureListBox = ({ section_header, features_list }) => {
  const [show, setShow] = React.useState(false);

  let icon = null;
  switch (section_header) {
    case 'Unique Features':
      icon = <FontAwesomeIcon icon={faPlugCircleBolt} className="text-xl text-blue-700" />;
      break;
    case 'Amenities':
      icon = <FontAwesomeIcon icon={faDumbbell} className="text-xl text-blue-700" />;
      break;
    case 'Property Services':
      icon = <FontAwesomeIcon icon={faTruckFast} className="text-xl text-blue-700" />;
      break;
    case 'Apartment Highlights':
      icon = <FontAwesomeIcon icon={faWifi} className="text-xl text-blue-700" />;
      break;
    case 'Kitchen Features':
      icon = <FontAwesomeIcon icon={faKitchenSet} className="text-xl text-blue-700" />;
      break;
    case 'Floor Plan Features':
      icon = <FontAwesomeIcon icon={faRug} className="text-xl text-blue-700" />;
      break;
    case 'Utilities':
      icon = <FontAwesomeIcon icon={faLightbulb} className="text-xl text-blue-700" />;
      break;
    default:
      icon = <FontAwesomeIcon icon={faRug} className="text-xl text-blue-700" />;
  }

  return (
    <div className="flex flex-col gap-4">
      <button
        className="text-black-500 flex flex-row gap-4 rounded-xl bg-white px-4 py-2 text-left text-lg font-bold shadow-standard"
        onClick={() => {
          setShow(!show);
        }}
      >
        <div className="my-auto">{icon}</div>
        <div className="my-auto">{section_header}</div>
        <FontAwesomeIcon
          icon={faChevronDown}
          className="my-auto ml-auto text-lg text-slate-600 duration-200 hover:scale-125"
        />
      </button>

      {show && (
        <ul
          id="dropdownId"
          className="grid list-outside list-disc grid-cols-3 gap-x-14 gap-y-2 pl-6 pr-[48px] md:pl-8 text-left text-base text-slate-600 duration-200"
        >
          {features_list.map((feature, index) => {
            return (
              <li className="" key={index}>
                {feature}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FeatureListBox;
