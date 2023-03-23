import React from 'react'

function AppContainer({children, full=false}) {
  return (
    <main style={{height: full ? '100vh' : '100%'}} className='app-container'>
        {children}
    </main>
  )
}

export default AppContainer