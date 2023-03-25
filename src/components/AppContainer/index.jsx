import React from 'react'
import './style.css';
function AppContainer({children, full=false}) {
  return (
    <section style={{height: full ? '100vh' : '100%'}} className='app-container hello'>
        {children}
    </section>
  )
}

export default AppContainer