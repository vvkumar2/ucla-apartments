import PropTypes from 'prop-types';
import { IoIosClose } from 'react-icons/io';
import styled from 'styled-components';
// import Color from "color";
import ButtonControl from './ButtonControl';

const LightboxHeader = ({ images, currentIndex, onClose }) => (
  <TopHeaderBar>
    <RightSideContainer>
      <PageIndicator>
        {currentIndex + 1} / {images.length}
      </PageIndicator>
      <CloseButton onClick={onClose} type="button">
        <IoIosClose size={60} />
      </CloseButton>
    </RightSideContainer>
  </TopHeaderBar>
);

LightboxHeader.propTypes = {
  onClose: PropTypes.func.isRequired,
  galleryTitle: PropTypes.string.isRequired,
  currentIndex: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default LightboxHeader;

const PageIndicator = styled.span`
  white-space: nowrap;
  min-width: 60px;
  text-align: center;
  margin-right: 10px;
  font-size: 18px;
`;

const RightSideContainer = styled.div`
  margin: 15px 25px 15px auto;
  width: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled(ButtonControl)`
  height: 100%;
  display: flex;
  color: inherit;
  border-left: 2px solid ${({ theme }) => theme.pageContentFontColor};
`;

const TopHeaderBar = styled.header`
  z-index: 10;
  cursor: auto;
  display: flex;
  justify-content: space-between;
  padding: 10px 2px 10px 20px;
  color: ${({ theme }) => theme.headerNavFontColor};
  height: inherit;
  }
`;
