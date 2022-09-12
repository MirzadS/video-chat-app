import React, { useState, useContext } from "react";
import IncomingCall from "./IncomingCall";
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
  const { leaveCall, micToggle, camToggle } = useContext(SocketContext);

  const audioOnOff = () => {
    micToggle();
    setAudioOn(!audioOn);
  };

  const videoOnOff = () => {
    camToggle();
    setCameraOn(!cameraOn);
  };

  const [cameraOn, setCameraOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);
  return (
    <div className="options">
      <div className="options__left">
        <div id="stopVideo" className="options__button" onClick={videoOnOff}>
          {cameraOn ? <BsFillCameraVideoFill /> : <BsFillCameraVideoOffFill />}
        </div>
        <div id="muteButton" className="options__button" onClick={audioOnOff}>
          {audioOn ? <BsFillMicFill /> : <BsFillMicMuteFill />}
        </div>

        <div
          style={{ backgroundColor: "red" }}
          className="options__button"
          onClick={leaveCall}
        >
          <MdCallEnd />
        </div>
      </div>

      <IncomingCall />

      <div className="options__right">
        <div className="options__button" onClick={() => toggle()}>
          <BsFillDisplayFill />
        </div>

        {/* <div id="inviteButton" className="options__button">
          <BsFillPersonPlusFill />
        </div> */}
      </div>
    </div>
  );
};

export default Options;
