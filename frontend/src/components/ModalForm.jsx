import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";

import "../Styles/modalFormStyle.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { SocketContext } from "../Context";

function Modal({ isVisible, hide }) {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    me,
    setName,
    leaveCall,
    callUser,
    answerCall,
  } = useContext(SocketContext);

  const [idToCall, setIdToCall] = useState("");

  const closeModal = () => {
    hide();
  };

  const newMeeting = () => {
    if (!name) {
      alert("Morate unijeti vaše ime");
    } else {
      closeModal();
    }
  };

  const onSubmitHandler = (data) => {
    alert("submit");
    callUser(idToCall);
    closeModal();
  };

  return isVisible
    ? ReactDOM.createPortal(
        <>
          <div className="ModalOverlay" />
          <div className="ModalWrapper">
            <div className="modal-header">
              <h2 className="Title">Kreiranje sastanka</h2>
              <span onClick={() => closeModal()} className="closeModalIcon">
                X
              </span>
            </div>

            <form className="form" onSubmit={onSubmitHandler}>
              <div className="left-box formBox">
                <label htmlFor="Name">Ime:</label>
                <input
                  type="text"
                  id="Name"
                  placeholder="Unesite Vaše ime"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <CopyToClipboard text={me}>
                  <button
                    type="button"
                    className="buttons"
                    onClick={newMeeting}
                  >
                    Kopirajte ID
                  </button>
                </CopyToClipboard>
              </div>

              <div className="right-box formBox">
                <label htmlFor="call">Poziv:</label>
                <input
                  type="text"
                  id="Name"
                  placeholder="Unesite kod sastanka"
                  value={idToCall}
                  onChange={(e) => setIdToCall(e.target.value)}
                />

                <button type="submit" className="buttons">
                  Pridružite se
                </button>
              </div>
              <div></div>
            </form>
          </div>
        </>,
        document.body
      )
    : null;
}

export default Modal;
