import React from 'react'

export function PlayButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/20"
      aria-label="Play video"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    </button>
  )
}

