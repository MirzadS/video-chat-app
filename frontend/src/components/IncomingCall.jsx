import React, { useContext } from "react";
import "../Styles/style.css";

import { SocketContext } from "../Context";

const IncomingCall = () => {
  const { callAccepted, call, answerCall } = useContext(SocketContext);
  return (
    <div className="incoming-call">
      {call.isReceivingCall && !callAccepted && (
        <>
          <h1>{call.name} zove:</h1>
          <button className="answer-call-btn" onClick={answerCall}>
            Prihvati
          </button>
        </>
      )}
    </div>
  );
};

export default IncomingCall;
