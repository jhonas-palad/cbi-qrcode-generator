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
        <h2 style={{textAlign: 'center', marginBottom: '1em'}}>
            QR CODE <br/>
            GENERATOR
        </h2>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems:'center',
            justifyContent: 'center',
            gap: 10
        }}>
            <div className='form-group' style={{marginBottom: '1em'}}>
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
            <div className="flex-col flex flex-center btn-wrapper">
            {
                !showDownload ? (
                    <button className='btn-cbi' onClick={()=> {
                        setUrlToConvert(urlInput);
                        setShowDownload(true);
                        }} type="button">
                            Generate
                    </button>
                ) : (
                    <>
                        <div className='flex-col flex flex-center' style={{gap: '1em'}}>

                            <select  onChange={(e) => setFileType(e.target.value)} name="selectedType">
                                <option value="png">PNG</option>
                                <option value="jpg">JPEG</option>
                                <option value="svg">SVG</option>
                            </select>
                          <button className='btn-cbi' onClick={downloadQRCode}>
                              Download
                          </button>
                          <a className='label' href={window.location.href}>Generate another QR code</a>
                        </div>
                    </>
                )
            }
            </div>

            
        </div>
    </div>
  );
}

export default App;
