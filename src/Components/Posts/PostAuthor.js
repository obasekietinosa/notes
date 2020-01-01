import React from 'react'
import { Link } from "react-router-dom"

export default function PostAuthor(props) {
    return (
        <author>
            by &nbsp;
            <Link to={ "/author/" + props.author.slug }>
                 <img 
                    style={ { width:"50px", height:"50px", borderRadius:"50%", verticalAlign:"middle" } } 
                    src={props.author.avatar}
                /> &nbsp;
                { props.author.name } 
            </Link>
        </author>
    )
}
