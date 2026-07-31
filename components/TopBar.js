'use client'
import { useState } from 'react'
import SideMenu from './SideMenu'

export default function TopBar({ title }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="flex items-center px-4 py-4 border-b bg-white relative">
        <button onClick={() => setOpen(true)} className="text-2xl leading-none" aria-label="Open menu">
          ☰
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold pr-6">{title}</h1>
      </div>
      <SideMenu open={open} onClose={() => setOpen(false)} />
    </>
  )
}