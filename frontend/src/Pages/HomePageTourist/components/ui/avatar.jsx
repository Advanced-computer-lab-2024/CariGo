import React from 'react'

export function Avatar({ src, alt, fallback }) {
  return (
    <div className="relative h-10 w-10 overflow-hidden rounded-full">
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-600 text-white">
          {fallback}
        </div>
      )}
    </div>
  )
}

