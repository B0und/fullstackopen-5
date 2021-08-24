import React, { useState } from "react";

const Blog = ({ blog, updateLikes }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleShowMore}>{showMore ? "Hide" : "Show"}</button>
      {showMore && (
        <div>
          <div> {blog.url}</div>
          <div>
            {blog.likes}
            <button onClick={() => updateLikes(blog)}>like</button>
          </div>
          <div>{blog.user.name}</div>
        </div>
      )}
    </div>
  );
};

export default Blog;
