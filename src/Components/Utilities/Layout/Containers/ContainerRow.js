import React from 'react'

export default function ContainerRow({ children, ...props}) {
  return (
    <div className="row">
      {children}
    </div>
  )
}