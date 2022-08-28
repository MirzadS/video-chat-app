import React, { useState, useContext } from "react";
import useModal from "./utils/useModal";
import Modal from "./components/ModalForm";
import "./Styles/style.css";

// import { MdCallEnd } from "react-icons/md";
// import {
//   BsFillMicFill,
//   BsFillCameraVideoFill,
//   BsFillCameraVideoOffFill,
//   BsFillPersonPlusFill,
//   BsFillDisplayFill,
//   BsFillMicMuteFill,
// } from "react-icons/bs";

import { SocketContext } from "./Context";
import Options from "./components/Options";

function App() {
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
    ugasiKameru,
    ugasiMikrofon,
  } = useContext(SocketContext);

  const { isVisible, toggle } = useModal();

  return (
    <div>
      <div className="header">
        <div className="logo">
          <div className="header__back">
            <i className="fas fa-angle-left"></i>
          </div>
          <h3>Video Chat</h3>
        </div>
      </div>
      <div className="main">
        <div className="main__left">
          <div className="videos__group">
            {stream && (
              <div id="video-grid">
                <div>
                  <h1 className="person_name">{name || "Korisnik1"}</h1>
                  <video playsInline muted ref={myVideo} autoPlay />
                </div>
              </div>
            )}

            {callAccepted && !callEnded && (
              <div id="video-grid">
                <div>
                  <h1 className="person_name">{call.name || "Korisnik2"}</h1>
                  <video playsInline muted ref={userVideo} autoPlay />
                </div>
              </div>
            )}
          </div>
          <Options toggle={toggle} />
        </div>

        {/* <div className="main__right">
          <div className="main__chat_window">
            <div className="messages"></div>
          </div>
          <div className="main__message_container">
            <input
              id="chat_message"
              type="text"
              autoComplete="off"
              placeholder="Type message here..."
            />
            <div id="send" className="options__button">
              <i className="fa fa-plus" aria-hidden="true"></i>
            </div>
          </div>
        </div> */}

        <Modal isVisible={!isVisible} hide={toggle} />
      </div>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <h1>{call.name} is calling:</h1>
          <button onClick={answerCall}>Answer</button>
        </div>
      )}
    </div>
  );
}

export default App;
