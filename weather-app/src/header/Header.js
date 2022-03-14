import React from 'react'
import './header.css'
function Header() {
  return (
    <header >
    <nav>
      <h2>Weather App</h2>
      <div>
        <ul>
          <li href="">home</li>
          <li href="">search</li>
          <li href="">bookmarks</li>
        </ul>
      </div>
      </nav>
      {/* Class Naming h=> header, b=> banner, c=> child,
          l=> label, t=> title, st=> subtitle */}
      <div className='h-b'>
        <div className='h-b-c'>
          <div className='h-b-c-l'>
            <h1 className='h-b-c-l-t'>Switzerland</h1>
            <h2 className='h-b-c-l-st'>Manitoba, Canada</h2>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
