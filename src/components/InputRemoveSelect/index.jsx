import React from 'react';
 

const TYPE_LABEL = [
    'home',
    'work',
    'school'
]

const InputRemoveSelect = ({id, type, value, onChange,removeInput, onChangeType}) => {
    const [labels, setLabels] = React.useState(TYPE_LABEL);
    return (
        <div key={id}>
            <select onChange={onChangeType} id={id}>
                {
                    labels.map((label, index) => <option key={index} value={label}>{label}</option>)
                }
            </select>
            <input 
                id={id}
                value={value}
                onChange={onChange}/>
            <button onClick={()=>removeInput(id)}>-</button>
        </div>
    )
}

export default InputRemoveSelect