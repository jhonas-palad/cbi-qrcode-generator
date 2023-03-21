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

    const qrCanvas = document.getElementById('generated_qrcode');

    return new Promise(resolve => {
      resolve(qrCanvas);
    });
}; 


const downloadFile = async (refElement, filename) => {
  return copyToCanvas(refElement).then(
    canvas => {
      // const urlDownload = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      const urlDownload = canvas.toDataURL('image/png')
      const anchorTag = document.createElement("a");
      anchorTag.href = urlDownload;
      anchorTag.download=filename;
      document.body.appendChild(anchorTag);
      anchorTag.click();
      document.body.removeChild(anchorTag);
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
        <QRCodeCanvas style={{padding:10, background:"red"}} id="generated_qrcode" size={128 * 2} value={urlToConvert}/>
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
