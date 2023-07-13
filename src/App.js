import "./App.css";
import { useEffect, useRef } from "react";


function App() {
  const video = useRef(null);
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 1280, height: 720 } })
      .then((stream) => {
        video.current.srcObject=stream;
      })
      .catch((err) => {
        console.log("Hata meydana geldi"+ err);
      });
  }, []);

  return (
    <div className="App">
      <video ref={video} autoPlay muted></video>
    </div>
  );
}

export default App;
