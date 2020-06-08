import React from 'react'
import { Link } from "react-router-dom"
import './CategoryPreview.css'

export default function CategoryPreview ({ category, ...props }) {
  return (
    <div {...props} className="CategoryPreview">
      <Link to={category.link} className="title">
      <img className="img-fluid img-round" style={{borderRadius: '10px'}} alt={category.name} src={`https://services.etin.space/wts/extra/${category.slug}.jpg`} />
        <h6 className="mb-0" dangerouslySetInnerHTML={{ __html: category.name }}>
        </h6>
        <small>{ `${category.count} Article(s)` }</small>
      </Link>
      <div dangerouslySetInnerHTML={{ __html: category.description }}>
      </div>
    </div>
  )
}