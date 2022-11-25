import React from "react";
import './section-header.styles.css'

const SectionHeader = (props) => {
  return (
    <div>
        <h1 className="section-header">
            {props.header_name}
        </h1>
    </div>
    
  );
};

export default SectionHeader;