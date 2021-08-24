import Blog from "../components/Blog";

const BlogsDisplay = ({ blogs, user }) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs
        .filter((blog) => blog.user?.username === user.username)
        .map((blog) => {
          return <Blog key={blog.id} blog={blog} />;
        })}
    </div>
  );
};

export default BlogsDisplay;
