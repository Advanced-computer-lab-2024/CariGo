import React from 'react'

export function Button({ children, variant = 'default', className = '', ...props }) {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors'
  const variantClasses = variant === 'default' 
    ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
    : 'bg-transparent border border-gray-700 text-gray-300 hover:bg-gray-800'

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  )
}

