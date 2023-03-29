import React, {useState} from 'react'
import InputRemoveSelect from '../InputRemoveSelect';
export const AddRemoveInput = ({title,container, addInput, removeInput, onChange, onChangeType}) => {
    return (
        <div className='flex flex-col'>
            <p>{title}</p>
            <div>
                {
                        container.map(({id, value, type})=>{
                            return (
                                <InputRemoveSelect 
                                    key={id} id={id} 
                                    value={value} 
                                    type={type} 
                                    onChange={onChange} 
                                    onChangeType={onChangeType} 
                                    removeInput={removeInput}/>
                            )})
                }
                <button onClick={addInput}>
                    Add {title.toLowerCase()}
                </button>
            </div>
        </div>
    )
}


export default AddRemoveInput;