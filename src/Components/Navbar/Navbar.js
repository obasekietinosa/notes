import React from 'react'
import "./Navbar.css"
import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <div className="Navbar">
            <h3>
                <Link to="/">
                    Etin's Notes 
                </Link>
            </h3>
            <small>A Memoir by Etin Obaseki</small>
        </div>
    )
}
