import React from 'react'
import Helmet from 'react-helmet'
import PostDate from './PostDate'
import PostAuthor from './PostAuthor'
import SocialShare from 'Components/Utilities/SocialShare/SocialShare'
import SyntaxHighlight from 'Components/Utilities/SyntaxHighlight/SyntaxHighlight'
import './FullPost.css'

export default function FullPost({ post }) {
  return (
    <div className="FullPost">
      <Helmet>
        <title>{post.title.rendered} - WeTalk Sound</title>
        <meta name="description" content={post.excerpt.rendered} />
        <meta property="og:title" content={`${post.title.rendered} - WeTalk Sound`} />
        <meta property="og:description" content={post.excerpt.rendered} />
        <meta property="og:image" content={`https://services.etin.space/notes/generate-image/?title=${encodeURI(post.title.rendered)}`} />
        <meta property="og:url" content={`https://notes.etin.space/posts/${post.slug}`} />
        <meta name="twitter:title" content={`${post.title.rendered} - WeTalk Sound`} />
        <meta name="twitter:description" content={post.excerpt.rendered} />
        <meta name="twitter:image" content={`https://services.etin.space/notes/generate-image/?title=${encodeURI(post.title.rendered)}`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <header className="py-5">
        <div className="container">
          <div className="row align-items-md-center">
            <div className="col-12 col-md-6">
              <img class="img-fluid" alt={post.title.rendered} src={post['_embedded']['wp:featuredmedia'][0]?.source_url} />
            </div>
            <div className="col-12 col-md-6">
              <h1
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              >
              </h1>
              <p>
                <small>
                  <PostDate date={post.date} />
                </small>
              </p>
              <PostAuthor
                author={
                  {
                    name: post._embedded.author[0].name,
                    slug: post._embedded.author[0].slug,
                    avatar: post._embedded.author[0].avatar_urls[96],
                  }
                }
              />
            </div>
          </div>
        </div>
      </header>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="wp-content">
              <SyntaxHighlight content={post.content.rendered} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <SocialShare text={"Read " + post.title.rendered + " on WeTalk Sound"} url={`https://blog.wetalksound.co/posts/${post.slug}`} tag={"#EtinNotes"} />
          </div>
        </div>
      </div>
    </div>
  )
}