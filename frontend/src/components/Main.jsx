import React, { useContext } from "react";
import Modal from "./ModalForm";
import Options from "./Options";
import useModal from "../utils/useModal";
import "../Styles/style.css";

import { SocketContext } from "../Context";

const Main = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);

  const { isVisible, toggle } = useModal();

  return (
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

      <Modal isVisible={!isVisible} hide={toggle} />
    </div>
  );
};

export default Main;
