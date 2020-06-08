import React from 'react'
import Post from 'Components/Entities/Posts/Post';
import FullPost from 'Components/Entities/Posts/Renders/FullPost';

export default function PostPage({ match }) {
  return (
    <div className="Post">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Post 
              match={match}
              layout={{
                component: React.Fragment,
                props: {}
              }}
              renderAs={FullPost}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
