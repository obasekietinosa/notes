import React from 'react'
import { Link } from "react-router-dom"
import './CategoryPreview.css'

export default function CategoryPreview ({ category, ...props }) {
  return (
    <div {...props} className="CategoryPreview">
      <img className="img-fluid img-round" style={{borderRadius: '10px'}} alt={category.name} src={`https://services.etin.space/wts/extra/${category.slug}.jpg`} />
      <Link to={category.link} className="title">
          <h5 className="mb-0" dangerouslySetInnerHTML={{ __html: category.name }}>
          </h5>
          <small>{ `${category.count} Article(s)` }</small>
      </Link>
      <div dangerouslySetInnerHTML={{ __html: category.description }}>
      </div>
    </div>
  )
}