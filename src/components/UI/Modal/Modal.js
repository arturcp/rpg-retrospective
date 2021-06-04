import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '../Backdrop/Backdrop';
import { Button } from 'antd';
import './styles.scss';

// Usage example:
//
// <Modal
//   buttonText="Close"
//   showButton
//   title="My first modal"
//   onButtonClick={() => { }}
//   >
//   Here comes a text
// </Modal>
const modal = (props) => {
  const { onButtonClick, title, buttonText, showButton } = props;

  return (
    <>
      <Backdrop />
      <div className="modal-container">
        <h3 className="modal-header">
          {title}
        </h3>
        <div className="modal-body">
          {props.children}
        </div>
        <div className="modal-actions">
          {showButton && (
            <Button onClick={onButtonClick}>
              {buttonText}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

modal.propTypes = {
  // The title that will appear at the top of the
  // modal. It will be inserted into a h3 tag.
  title: PropTypes.string,

  // Text of the button that is positioned at the
  // bottom right of the modal.
  buttonText: PropTypes.string,

  // Function that will be triggered when the
  // action button is clicked.
  onButtonClick: PropTypes.func,
};

export default modal;
