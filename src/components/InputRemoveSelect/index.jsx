import React from 'react';
 

const TYPE_LABEL = [
    'home',
    'work',
    'school'
]

const InputRemoveSelect = ({id, type, value, onChange, container,removeInput}) => {
    const [labels, setLabels] = React.useState(TYPE_LABEL);
    const labelClick = (e)=>{
        const {value} = e?.target;
    };

    return (
        <div>
            <select onChange={labelClick}>
                {
                    labels.map((label, index) => <option onClick={labelClick} key={index} value={label}>{label}</option>)
                }
            </select>
            <input 
                id={id}
                value={value}
                onChange={(e)=> onChange(e, type, container)}/>
            <button onClick={()=>removeInput(id)}>-</button>
        </div>
    )
}

export default InputRemoveSelect