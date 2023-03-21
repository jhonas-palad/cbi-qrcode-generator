import logo from './logo.svg';
import './App.css';
import React, {useState, useRef, useCallback} from 'react';
import QRCode from "react-qr-code";
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';

//Convert SVG to canvas -> img and download 

const _download = (refElement) => {
    const svgXML = new XMLSerializer().serializeToString(refElement);

}

const copyToCanvas = (refElement, scale = 10)=>{
    const svg = refElement;
    const svgData = new XMLSerializer().serializeToString(refElement);
    const canvas = document.createElement('canvas');
    const svgSize = svg.getBoundingClientRect();
    canvas.width = svgSize.width * scale;
    canvas.height = svgSize.height * scale;
    canvas.style.width = svgSize.width;
    canvas.style.height = svgSize.height;

    const context = canvas.getContext('2d');
    context.scale(10, 10)
    const img = document.createElement('img');
    img.setAttribute('src', 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData))));
    
    return new Promise(resolve => {
      img.onload = () => {
        ctxt.drawImage(img, 0, 0);
        const file = canvas.toDataURL(`image/${format}`, (format = 'png'), quality);
        resolve(file);
      };
    });
}; 


const downloadFile = async (refElement, filename) => {
  return copyToCanvas(refElement).then(
    file => {
      
    }
  )
}

function App() {
  const [urlInput, setUrlInput] = useState("");
  const [urlToConvert, setUrlToConvert] = useState("");
  const qrRef = useRef(null);


  const downloadSVG = () => {
    const generated_svg = document.getElementById("generated_qrcode");
    downloadFile(qrRef.current, 'Example.png');
  }
  return (
    <div className="App center">
      <h1></h1>
      <form style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'center',
        gap: 10
      }}>
          <label>
              Enter a URL
          </label>
          <input
            onChange={(e)=>setUrlInput(e.target.value)}
            value={urlInput}
          />
        
        <button onClick={()=> {
           setUrlToConvert(urlInput)
        }} type="button">Generate</button>
      </form>
      <div style={{
        padding:8
      }}>
        
      </div>
      {/* <div style={{marginBotton: 5}}>
        <QRCode size={128 * 2} value={urlToConvert}/>
      </div> */}
      <div>
        <QRCode id="generated_qrcode" size={128 * 2} value={urlToConvert} ref={qrRef}/>
      </div>
      <div>
        <button onClick={downloadSVG}>
          Download
        </button>
        {/* <img src={require('./logo.png')} onLoad={()=>console.log("HELLO")}/> */}
      </div>
    </div>
  );
}

export default App;
