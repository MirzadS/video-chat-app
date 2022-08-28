import React, { useContext } from "react";
import "../Styles/style.css";

import { SocketContext } from "../Context";

const IncomingCall = () => {
  const { callAccepted, call, answerCall } = useContext(SocketContext);
  return (
    <div>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <h1>{call.name} zove:</h1>
          <button onClick={answerCall}>Prihvati</button>
        </div>
      )}
    </div>
  );
};

export default IncomingCall;
