import React from "react";

const SectionHeader = (props) => {
  return (
    <div>
        <h1 className="section-header text-left text-2xl my-0 mx-auto pt-4 font-medium">
            {props.header_name}
        </h1>
    </div>
    
  );
};

export default SectionHeader;