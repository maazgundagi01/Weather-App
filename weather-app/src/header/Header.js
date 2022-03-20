import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'
function Header() {
  return (
    <header >
    <nav>
      <h2>Weather App</h2>
      <div>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/search'>Search</Link>
          </li>
        </ul>
      </div>
      </nav>
    </header>
  )
}

export default Header
