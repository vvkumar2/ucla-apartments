const SectionHeader = (props) => {
  return (
    <div>
      <h1 className="section-header my-0 mx-auto pt-4 text-left text-2xl font-medium">
        {props.header_name}
      </h1>
    </div>
  );
};

export default SectionHeader;
