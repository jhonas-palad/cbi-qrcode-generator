import React, {useState, useReducer} from 'react';
import { downloadFile } from './utils';
import { QRCodeCanvas } from 'qrcode.react';
import { v4 as uuidv4 } from 'uuid';

import './index.css';

//TODO:
//Add css

function App() {
    const [urlInput, setUrlInput] = useState("");
    const [urlToConvert, setUrlToConvert] = useState("");
    const [fileType, setFileType] = useState("png");
    const [showDownload, setShowDownload] = useState(false);
    const downloadQRCode = () => {
        const generatedQRCodeRef = document.getElementById("generated_qrcode");
        downloadFile(generatedQRCodeRef, uuidv4(), fileType);
    }

  return (
    <div className="center">
        {/* <div className="flex-row flex flex-center logo-name-row">
            <img src={require('./logo.png')} height="100" width="100" alt="cbi-logo" />
            <h3>
                CENTER FOR BUSINESS & INNOVATION
            </h3>
        </div> */}
        <h2 style={{textAlign: 'center'}}>
            QR CODE <br/>
            GENERATOR
        </h2>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems:'center',
            justifyContent: 'center',
            gap: 10,
            border: '1px solid'
        }}>
            <div className='form-group'>
                <label>Enter your URL</label>
                <input
                    onChange={(e)=>setUrlInput(e.target.value)}
                    value={urlInput}
                    type='url'
                />
            </div>
            <div className='qr-out'>
                {
                    urlToConvert ? ( 
                    <QRCodeCanvas id="generated_qrcode" size={128 * 2} value={urlToConvert}/>) : (
                        <></>
                    )
                }   
            </div>
            <div className="flex-col flex btn-wrapper">
            {
                !showDownload ? (
                    <button onClick={()=> {
                        setUrlToConvert(urlInput);
                        setShowDownload(true);
                        }} type="button">
                            Generate
                    </button>
                ) : (
                    <>
                        <div>

                            <select onChange={(e) => setFileType(e.target.value)} name="selectedType">
                                <option value="png">PNG</option>
                                <option value="jpg">JPEG</option>
                                <option value="svg">SVG</option>
                            </select>
                        </div>
                        <button onClick={downloadQRCode}>
                            Download
                        </button>
                        <a href={window.location.href}>Generate another QR code</a>
                    </>
                )
            }
            </div>

            
        </div>
    </div>
  );
}

export default App;
