import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import './contact-popup.styles.css';

const ContactPopup = ({ handleClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [scheduleCheckBox, setScheduleCheckBox] = useState(false);
  const [confirmCheckBox, setConfirmCheckBox] = useState(false);
  const [requestCheckBox, setRequestCheckBox] = useState(false);
  const [customCheckBox, setCustomCheckBox] = useState(false);
  const [err, setError] = useState('');
  const [customMessage, setCustomMessage] = useState('');

  // functions to set the state of the input fields
  function changeFirstName(event) {
    setFirstName(event.target.value);
  }

  function changeLastName(event) {
    setLastName(event.target.value);
  }

  function changeEmail(event) {
    setEmail(event.target.value);
  }

  function scheduleCheckBoxChange(event) {
    setScheduleCheckBox(event.target.checked);
  }

  function confirmCheckBoxChange(event) {
    setConfirmCheckBox(event.target.checked);
  }

  function requestCheckBoxChange(event) {
    setRequestCheckBox(event.target.checked);
  }

  function customCheckBoxChange(event) {
    setCustomCheckBox(event.target.checked);
  }

  function customMessageChange(event) {
    console.log(event.target.value);
    setCustomMessage(event.target.value);
  }

  // function to send email to owner
  function sendEmailToOwner(event) {}

  return (
    <div className="popup-box-container">
      <div className="popup-box">
        <div className="popup-box-top">
          <h1>Contact Owner</h1>
          <div className="popup-close-icon" onClick={handleClose}>
            <FontAwesomeIcon icon={faX} />
          </div>
        </div>
        <form className="contact-form" onSubmit={sendEmailToOwner}>
          <div className="contact-name-email-form">
            <div className="contact-name-form">
              <input
                className="contact-first-name"
                type="text"
                placeholder="First Name"
                onChange={changeFirstName}
                value={firstName}
              />
              <input
                className="contact-last-name"
                type="text"
                placeholder="Last Name"
                onChange={changeLastName}
                value={lastName}
              />
            </div>
            <input
              className="contact-email"
              type="text"
              placeholder="Email"
              onChange={changeEmail}
              value={email}
            />
          </div>
          <div className="contact-reason">
            <h1 className="contact-reason-text">I would like to...</h1>
            <div className="contact-check-boxes">
              <div className="contact-check-boxes-left">
                <FormControlLabel
                  onChange={scheduleCheckBoxChange}
                  control={<Checkbox />}
                  label={<h1 className="check-box-text">Schedule a Tour</h1>}
                />
                <FormControlLabel
                  onChange={confirmCheckBoxChange}
                  control={<Checkbox />}
                  label={<h1 className="check-box-text">Confirm Availability</h1>}
                />
              </div>
              <div className="contact-check-boxes-right">
                <FormControlLabel
                  onChange={requestCheckBoxChange}
                  control={<Checkbox />}
                  label={<h1 className="check-box-text">Request Application</h1>}
                />
                <FormControlLabel
                  onChange={customCheckBoxChange}
                  control={<Checkbox />}
                  label={<h1 className="check-box-text">Custom Message</h1>}
                />
              </div>
            </div>
          </div>
          {customCheckBox && (
            <textarea
              className="contact-message"
              type="text"
              placeholder="Message"
              onChange={customMessageChange}
            />
          )}
          <p style={{ paddingBottom: '30px', color: '#FF6961' }}>{err}</p>
          <input type="submit" className="contact-submit-button" value="Send Message" />
        </form>
      </div>
    </div>
  );
};

export default ContactPopup;
