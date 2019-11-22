import React from 'react';
import { Link } from 'gatsby';
import PreviewCompatibleImage from './PreviewCompatibleImage'

// const channelRegionNameIdx = 0
// const channelRegionLocaleIdx = 1
const channelRegionPathIdx = 2
// const channelRegionCurrencyIdx = 3

class BlogItem extends React.Component {
  render() {
    const post = this.props.post;
    const pageContext = this.props.pageContext
    const columnWidth = this.props.columnWidth ? this.props.columnWidth : 'is-6';
    let channelRegionPathPrefix = pageContext.channel.external_id.split('|')[channelRegionPathIdx]
    channelRegionPathPrefix = (!channelRegionPathPrefix.length) ? '' : '/' + channelRegionPathPrefix

    return (
      <div className={`is-parent column ${columnWidth}`} key={post.id}>
        <article
          className={`blog-list-item tile is-child box notification ${
            post.frontmatter.featuredpost ? 'is-featured' : ''
          }`}
        >
          <header>
            {post.frontmatter.featuredimage ? (
              <div className="featured-thumbnail">
                <PreviewCompatibleImage
                  imageInfo={{
                    image: post.frontmatter.featuredimage,
                    alt: `featured image thumbnail for post ${
                      post.title
                    }`,
                  }}
                />
              </div>
            ) : null}
            <p className="post-meta">
              <Link
                className="title has-text-primary is-size-4"
                to={`${channelRegionPathPrefix}${post.fields.slug}`}
              >
                {post.frontmatter.title}
              </Link>
              <span> &bull; </span>
              <span className="subtitle is-size-5 is-block">
                {post.frontmatter.date}
              </span>
            </p>
          </header>
          <p>
            {post.excerpt}
            <br />
            <br />
            <Link className="button" to={`${channelRegionPathPrefix}${post.fields.slug}`}>
              Keep Reading →
            </Link>
          </p>
        </article>
      </div>
    )
  }
}

export default BlogItem;