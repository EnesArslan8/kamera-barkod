import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const video = useRef(null);
  const canvas = useRef(null);
  const [barcode,setBarcode]=useState(null);
  const [basket,setBasket]=useState([]);

  const openCam = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 1280, height: 720 } })
      .then((stream) => {
        video.current.srcObject = stream;
        video.current.play();

        const ctx = canvas.current.getContext("2d");

        const barcodeDetector = new window.BarcodeDetector({
          formats: ["ean_13", "qr_code"]
        });
        setInterval(() => {
          canvas.current.width = video.current.videoWidth;
          canvas.current.height = video.current.videoHeight;
          ctx.drawImage(
            video.current,
            0,
            0,
            video.current.videoWidth,
            video.current.videoHeight
          );
          barcodeDetector
            .detect(canvas.current)
            .then((barcodes) => {
              barcodes.forEach((barcode) => {if(data){setBarcode(data.rawValue)}});
            })
            .catch((err) => {
              console.log(err);
            });
        }, 100);
      })
      .catch((err) => {
        console.log("Hata meydana geldi" + err);
      });
  };

  useEffect(()=>{
    if(barcode){
      //veritabanı lazım veritabanına burada istek atman lazım
    }
  },[barcode])


  return (
    <div className="App">
      <div>
        <video ref={video} autoPlay muted hidden></video>
        <canvas ref={canvas}></canvas>
      </div>
      <button onClick={openCam}>Kamerayı Aç</button>
      {barcode && 
        <div>
          Bulunan barkod:{barcode}  
        </div>
        }
        {basket && basket.map((item,index)=>{
          return <div key={index}>
            {item.product} <br></br>
            {item.price} <br></br>
            <img src={item.image} style={{width:100,height:100}}></img>
          </div>
        })}
    </div>
  );
}

export default App;
