import React, { useState } from "react";

const Blog = ({ blog }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div>
      {!showMore && blog.title} {!showMore && blog.author}
      {showMore && (
        <div>
          <div> {blog.title}</div>
          <div> {blog.author}</div>
          <div> {blog.url}</div>
          <div>
            {" "}
            blog.likes
            <button>like</button>
          </div>
        </div>
      )}
      <button onClick={toggleShowMore}>{showMore ? "Hide" : "Show"}</button>
    </div>
  );
};

export default Blog;
