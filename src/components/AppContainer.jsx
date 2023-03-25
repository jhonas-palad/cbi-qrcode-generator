import React from 'react'

function AppContainer({children, full=false}) {
  return (
    <section style={{height: full ? '100vh' : '100%'}} className='app-container'>
        {children}
    </section>
  )
}

export default AppContainer