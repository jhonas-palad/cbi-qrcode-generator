import React, {useState} from 'react'
import InputRemoveSelect from '../InputRemoveSelect';
export const AddRemoveInput = ({container, addInput, removeInput, onChange}) => {

    return (
        <div className='flex flex-col'>
            <p>Address</p>
            <div>
                {
                        container.map(({id, value, type})=>{
                            return <InputRemoveSelect key={id} value={value} type={type} container={container} onChange={onChange} removeInput={removeInput}/>
                        })
                }
                <button onClick={addInput}>
                    Add address
                </button>
            </div>
        </div>
    )
}


export default AddRemoveInput;