import React from 'react'

function Section({children, style, className}) {
  return (
    <section className={className} style={{...style}}>
        {children}
    </section>
  )
}

export default Section;