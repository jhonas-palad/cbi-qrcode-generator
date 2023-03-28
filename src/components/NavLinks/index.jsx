import React from 'react'
import {Link} from 'react-router-dom';
const NavLinks = () => {
  return (
    <nav >
        <ul>
            <li>
                <Link to="url">URL Generator</Link>
            </li>
            <li>
                <Link to="vcard">Virtual Card Generator</Link>
            </li>
        </ul>
    </nav>
  )
}

export default NavLinks