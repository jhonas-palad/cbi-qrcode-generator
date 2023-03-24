import React, {useState, useCallback} from 'react';
import '../static/button-select.css';
import '../static/cbi-style.css';
function ButtonSelect({title, opts, optClick, btnClick}) {
    const [hideSelect, setHideSelect] = useState(true);
    const optionClick = useCallback((value)=>{
        optClick(value);
        setHideSelect(prev => !prev);
    }, [optClick])
    return (
        <div style={{position: 'relative'}}>
            <button onClick={btnClick} className='dropdown-button btn-cbi'>
                {title}
            </button>
            <div onClick={()=> {setHideSelect( prevState => !prevState)}}  className='caret'/>
            <ul className={`dropdown-menu ${hideSelect ? 'hide': ''}`}>
                {
                    opts.map(({title, value}) => <li className='opts' onClick={()=>optionClick(value)}>{title}</li>)
                }
            </ul>
        </div>
    )
}

export default ButtonSelect