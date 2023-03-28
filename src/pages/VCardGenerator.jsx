import React, {useReducer, useCallback} from 'react'
import { downloadFile, FILETYPES_OPTS } from '../utils';
import { v4 as uuidv4 } from 'uuid';

import AddRemoveInput from '../components/AddRemoveInput';
import QRCode from '../components/QRCode';
import FormGroup from '../components/FormGroup';
import Container from '../components/Container';
import ButtonSelect from '../components/ButtonSelect';


const reducer = (state, action) => {
    const {type, payload} = action;
    const {inputs} = state;
    console.log(state);
    switch(type) {
        case 'changeInput':
            const {id, value, container} = payload;
            // const inputContainer = inputs[container]
            // const currentInputState = inputContainer[inputContainer.find(({_id}) => id === _id)];
            // const updatedInputeState = {...currentInputState, value};
            // const updatedState = {
            //     ...state
            // }
            // updatedState.inputs[container] = 
            return {...state, inputs: {...inputs, }};
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
        case 'addInput':
            
            return {
                ...state,
                inputs: {
                    ...inputs,
                    addresses: [...inputs.addresses, payload]
                }
            }
        case 'removeInput':
            const newList = inputs.addresses.filter(({id}) => {
                return payload.id !== id; 
            })
            return {
                ...state,
                inputs: {
                    ...inputs,
                    addresses: [...newList]
                }
            }
        default:
            throw new Error();
    }
}

const initState = {
    inputs: {
        addresses: [],
        telnums: [],
        emails: [],
    },
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

    const changeInput = (e, container) => {
        const {id, value} = e.target;
        dispatch({type:'changeInput', payload: {id, value, container}});
    }
    return (
        <Container style={{flexGrow:1}} className="body">
                <h1 style={{fontSize:27, fontWeight:'bold',textAlign: 'center'}}>
                    vCard QR CODE <br/>
                    GENERATOR
                </h1>
                <div className='container'>
                <QRCode value={"ASD"} hidden={!state.toConvert}/>
                <AddRemoveInput 
                    container={state.inputs.addresses}
                    onChange={changeInput} 
                    addInput={()=>dispatch({type: 'addInput', payload: {id: uuidv4(), type:'', value:''}})} 
                    removeInput={(id)=>dispatch({type: 'removeInput', payload: {id}})}
                />
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