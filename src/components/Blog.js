import React, { useState } from 'react'

const Blog = ({ blog, updateLikes, removeBlog }) => {
  const [showMore, setShowMore] = useState(false)

  const toggleShowMore = () => {
    setShowMore(!showMore)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleShowMore}>{showMore ? 'Hide' : 'Show'}</button>
      {showMore && (
        <div>
          <div> {blog.url}</div>
          <div>
            {blog.likes}
            <button onClick={() => updateLikes(blog)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          <button onClick={() => removeBlog(blog)}>Remove</button>
        </div>
      )}
    </div>
  )
}

export default Blog
