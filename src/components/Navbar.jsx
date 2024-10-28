import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between px-8 py-2 bg-emerald-400'>
        <div className="logo font-bold text-2 xl ">
            <span>iNotes</span>
        </div>
        <ul className='flex space-x-8'>
            <li>Home </li>
            <li>Todos</li>
        </ul>
    </nav>
  )
}

export default Navbar