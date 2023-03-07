import { animated, useTransition } from '@react-spring/web';
import PropTypes from 'prop-types';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import styled from 'styled-components';
import ButtonControl from './ButtonControl';

const ArrowButton = ({ position, onClick, disabled }) => {
  const transitions = useTransition(!disabled, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return transitions(
    (props, item) =>
      item && (
        <animated.div
          style={{
            ...props,
            zIndex: 999,
          }}
        >
          <Button position={position} type="button" onClick={onClick}>
            {position === 'left' && <IoIosArrowBack />}
            {position === 'right' && <IoIosArrowForward />}
          </Button>
        </animated.div>
      ),
  );
};

ArrowButton.propTypes = {
  position: PropTypes.oneOf(['left', 'right']).isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

ArrowButton.defaultProps = {
  disabled: false,
};

export default ArrowButton;

const Button = styled(ButtonControl)`
  position: absolute;
  left: ${({ position }) => (position === 'left' ? 0 : 'unset')};
  right: ${({ position }) => (position === 'right' ? 0 : 'unset')};
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: none;
  border-style: none;
  font-size: 50px;
  cursor: pointer;
  padding: 0;
  margin: -3% 25px;
`;
