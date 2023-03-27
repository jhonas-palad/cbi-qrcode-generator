import React, {useReducer, useCallback} from 'react'
import { downloadFile } from '../../utils';
import { QRCodeCanvas } from 'qrcode.react';
import { v4 as uuidv4 } from 'uuid';

import QRCode from '../../components/QRCode';
import FormGroup from '../../components/FormGroup';
import Container from '../../components/Container';
import ButtonSelect from '../../components/ButtonSelect';



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

function VCardQRGenerator() {
    const [state, dispatch] = useReducer(reducer, initState);
    const downloadQRCode = useCallback((fileType) => {
        const generatedQRCodeRef = document.getElementById("generated_qrcode");
        downloadFile(generatedQRCodeRef, uuidv4(), fileType ?? state.fileType);
    }, [state.fileType, state.toConvert]);
    return (
        <Container style={{flexGrow:1}} className="body">
                <h1 style={{fontSize:27, fontWeight:'bold',textAlign: 'center'}}>
                    vCard QR CODE <br/>
                    GENERATOR
                </h1>
                <div className='container'>
                <FormGroup
                    label="Enter your URL"
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
                <FormGroup
                    label="Enter your URL"
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
                <QRCode value={state.toConvert} hidden={!state.toConvert}/>
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
                                optClick={
                                        (value)=>{
                                            dispatch({type: 'changeFileType', value});
                                            downloadQRCode(value)
                                    }
                                }
                                btnClick={()=>downloadQRCode(state.fileType)}
                            />
                            <a className='label' href={window.location.href}>Generate another QR code</a>
                        </>
                    )
                }
                </div>
            </div>
            </Container>
    )
}

export default VCardQRGenerator