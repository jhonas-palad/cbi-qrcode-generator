import React, {useState, useReducer} from 'react';
import { downloadFile } from './utils';
import { QRCodeCanvas } from 'qrcode.react';
import { v4 as uuidv4 } from 'uuid';

import './index.css';
import './cbi-style.css';
import cbiLogo from  './assets/CBI Logos-01.svg'

import AppContainer from './components/AppContainer';
import Section from './components/Section';

const App = () => {
    const [urlInput, setUrlInput] = useState("");
    const [urlToConvert, setUrlToConvert] = useState("");
    const [fileType, setFileType] = useState("png");
    const [showDownload, setShowDownload] = useState(false);
    const [hideSelect, setHideSelect] = useState(true);
    const downloadQRCode = () => {
        const generatedQRCodeRef = document.getElementById("generated_qrcode");
        downloadFile(generatedQRCodeRef, uuidv4(), fileType);
    }
    const selectFileType = (_fileType) => {
        setFileType(_fileType);
        setHideSelect( prevState => !prevState)
    }
    return(
        <AppContainer full>
            <Section className="header">
                <div className='logo-wrapper'>
                    <img src={cbiLogo} width={200} height={64} />
                </div>
            </Section>
            <Section style={{flexGrow:1}} className="body">
                <h1 style={{fontSize:27, fontWeight:'bold',textAlign: 'center'}}>
                    QR CODE <br/>
                    GENERATOR
                </h1>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems:'center',
                    justifyContent: 'center',
                    gap: '1.5rem'
                }}>
                    <div className='form-group'>
                        <label htmlFor="urlInput">Enter your URL</label>
                        <input
                            id="urlInput"
                            name="urlInput"
                            title="Enter your URL"
                            className='hello'
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
                                }} type="button"
                                disabled={!urlInput}>
                                    Generate
                            </button>
                        ) : (
                            <>
                                <div style={{position: 'relative'}}>
                                    <button onClick={downloadQRCode} className='dropdown-button btn-cbi'>
                                        Download as {fileType?.toUpperCase()}
                                    </button>
                                    <div onClick={()=> {setHideSelect( prevState => !prevState)}}  className='caret'/>
                                    <ul className={`dropdown-menu ${hideSelect ? 'hide': ''}`}>
                                        <li onClick={()=>selectFileType('png')} className="opts">PNG</li>
                                        <li onClick={()=>selectFileType('jpg')} className='opts'>JPG</li>
                                        <li onClick={()=>selectFileType('svg')} className='opts'>SVG</li>
                                    </ul>
                                </div>
                                

                                <a className='label' href={window.location.href}>Generate another QR code</a>

                            </>
                        )
                    }
                    </div>
                </div>
            </Section>
            <Section className="footer">
                <p className='bottom-cbi-text'>
                    Center for Business and Innovation <br/>
                    INSPIRE, INNOVATE, IMMERSE
                </p>
            </Section>
        </AppContainer>
    )
}

export default App;