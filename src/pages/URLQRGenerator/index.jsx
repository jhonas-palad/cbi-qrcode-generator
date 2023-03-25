import React, {useReducer, useCallback} from 'react';
import { downloadFile } from '../../utils';
import { QRCodeCanvas } from 'qrcode.react';
import { v4 as uuidv4 } from 'uuid';

import AppContainer from '../../components/AppContainer';
import Container from '../../components/Container';
import ButtonSelect from '../../components/ButtonSelect';

import cbiLogo from '../../assets/images/CBI Logos-01.svg';

const FILETYPES_OPTS = [
    {title: 'PNG', value: 'png'},
    {title: 'JPG', value: 'jpg'},
    {title: 'SVG', value: 'svg'}
]

const reducer = (state, action) => {
    const {type, payload} = action;
    switch(type) {
        case 'urlInput':
            return {...state, ...payload};
        case 'changeFileType':
            return {
                ...state,
                fileType: action.value
            }
        case 'generateQR':
            return {
                ...state, 
                toConvert: state.urlInput,
                showDownload: true
            };
        default:
            throw new Error();
    }
}

const initState = {
    urlInput: '',
    toConvert: '',
    fileType: 'png',
    showDownload: false
}

const URLQRGenerator = () => {
    const [state, dispatch] = useReducer(reducer, initState);
    const downloadQRCode = useCallback(() => {
        const generatedQRCodeRef = document.getElementById("generated_qrcode");
        downloadFile(generatedQRCodeRef, uuidv4(), state.fileType);
    }, [state.fileType, state.toConvert]);
    return(
        <AppContainer full>
            <Container className="header">
                <div className='logo-wrapper'>
                    <img src={cbiLogo} width={200} height={64} />
                </div>
            </Container>
            <Container style={{flexGrow:1}} className="body">
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
                            onChange={
                                (e) => dispatch({type: 'urlInput', payload: {urlInput: e.target.value}})
                            }
                            type='url'
                            value={state.urlInput}
                        />
                    </div>
                    <div className='qr-out'>
                        {
                            state.toConvert ? ( 
                            <QRCodeCanvas id="generated_qrcode" size={128 * 2} value={state.toConvert}/>) : (
                                <></>
                            )
                        }   
                    </div>
                    <div className="flex-col flex flex-center btn-wrapper">
                    {
                        !state.showDownload ? (
                            <button 
                            className='btn-cbi' 
                                onClick={()=> dispatch({type:'generateQR'})} 
                                type="button"
                                disabled={!state.urlInput}>
                                    Generate
                            </button>
                        ) : (
                            <>
                                <ButtonSelect 
                                    title="Download"
                                    opts={FILETYPES_OPTS}
                                    optClick={(value)=>dispatch({type: 'changeFileType', value})}
                                    btnClick={downloadQRCode}
                                />
                                <a className='label' href={window.location.href}>Generate another QR code</a>
                            </>
                        )
                    }
                    </div>
                </div>
            </Container>
            <Container className="footer">
                <p className='bottom-cbi-text'>
                    Center for Business and Innovation <br/>
                    INSPIRE, INNOVATE, IMMERSE
                </p>
            </Container>
        </AppContainer>
    )
}

export default URLQRGenerator;