import React from 'react';
import './style.css';
function Container({children, style, className}) {
  return (
    <div className={className} style={{...style}}>
        {children}
    </div>
  )
}

export default Container;