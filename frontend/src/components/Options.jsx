import React, { useState, useContext } from "react";
import useModal from "../utils/useModal";
import "../Styles/style.css";

import { MdCallEnd } from "react-icons/md";
import {
  BsFillMicFill,
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
  BsFillPersonPlusFill,
  BsFillDisplayFill,
  BsFillMicMuteFill,
} from "react-icons/bs";

import { SocketContext } from "../Context";

const Options = ({ toggle }) => {
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

  return (
    <div className="options">
      <div className="options__left">
        <div id="stopVideo" className="options__button" onClick={ugasiKameru}>
          <BsFillCameraVideoFill />
        </div>
        <div
          id="muteButton"
          className="options__button"
          onClick={ugasiMikrofon}
        >
          <BsFillMicFill />
        </div>

        <div
          style={{ backgroundColor: "red" }}
          className="options__button"
          onClick={leaveCall}
        >
          <MdCallEnd />
        </div>
      </div>

      <div className="options__right">
        <div className="options__button" onClick={() => toggle()}>
          <BsFillDisplayFill />
        </div>

        <div id="inviteButton" className="options__button">
          <BsFillPersonPlusFill />
        </div>
      </div>
    </div>
  );
};

export default Options;
