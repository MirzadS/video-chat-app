import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

const socket = io("http://localhost:5000");

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

    socket.on("me", (id) => setMe(id));

    //OVO STIZE ADMINU I TO SU PODACI O KORISNIKU KOJI TRENUTNO ZOVE
    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    // POSTAVIT CE SE KADA ODGOVORIM NA POZIV
    // I pozvat ce se answerCall
    peer.on("signal", (data) => {
      // call.from JE ID
      // alert("DATA: " + JSON.stringify(data));

      socket.emit("answerCall", { signal: data, to: call.from, name });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
      // alert("STREAM: " + JSON.stringify(currentStream));
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  // NA KORISNIKOVOJ STRANI
  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    // MREZNI PODACI
    peer.on("signal", (data) => {
      // alert(JSON.stringify(data));
      // console.log(JSON.stringify(data));

      //KORISNIK ZOVE ADMINA I PROSLIJEDUJE PODATKE
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    // NA KORISNIKOVOJ STRANI
    socket.on("callAccepted", ({ signal, name }) => {
      setCallAccepted(true);
      setCall({ name: name || "Korisnik" });
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  const ugasiKameru = () => {
    const videoTrack = stream
      .getTracks()
      .find((track) => track.kind === "video");

    videoTrack.enabled = !videoTrack.enabled;
  };

  const ugasiMikrofon = () => {
    const audioTrack = stream
      .getTracks()
      .find((track) => track.kind === "audio");

    audioTrack.enabled = !audioTrack.enabled;
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        ugasiKameru,
        ugasiMikrofon,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
