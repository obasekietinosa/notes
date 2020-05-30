import React from 'react'
import { Link } from "react-router-dom"
import './CategoryPreview.css'

export default function CategoryPreview ({ category, ...props }) {
  return (
    <div {...props} className="CategoryPreview">
      <Link to={category.link} className="title">
          <h3 className="mb-0" dangerouslySetInnerHTML={{ __html: category.name }}>
          </h3>
      </Link>
      {/* <span>
        {category.category}
      </span> */}
      <div dangerouslySetInnerHTML={{ __html: category.description }}>
      </div>
      <div>
        <Link to={category.link} className="btn btn-primary">
          Read Now
        </Link>
      </div>
    </div>
  )
}
