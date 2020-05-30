import React from "react"
import PostList from "Components/Entities/Posts/PostList"
import PostPreview from "Components/Entities/Posts/PostPreview/PostPreview"

export default function MostRecentPosts() {
  return (
    <div className="MostRecentPosts">
      <div className="container-fluid">
        <div className="row">
          <div className="col-10 offset-1 offset-md-0 col-md-12">
            <h4 className="text-center">Our Latest Articles</h4>
            <PostList
              limit={10}
              layout={{
                component: React.Fragment,
                props: {}
              }}
              renderAs={PostPreview}
            />
          </div>
        </div>
      </div>
    </div>
  )
}