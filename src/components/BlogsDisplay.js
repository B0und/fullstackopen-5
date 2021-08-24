import Blog from "../components/Blog";
import blogService from "../services/blogs";

const BlogsDisplay = ({ blogs, user, setBlogs }) => {
  const updateLikes = (blog) => {
    blogService.update(blog.id, { likes: blog.likes + 1 });
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    setBlogs(blogs.map((b) => (b.id !== blog.id ? b : changedBlog)));
  };

  return (
    <div>
      <h2>blogs</h2>
      {blogs
        .filter((blog) => blog.user?.username === user.username)
        .sort((a, b) => {
          if (a.likes > b.likes) return -1;
          return a.likes < b.likes ? 1 : 0;
        })
        .map((blog) => {
          return <Blog key={blog.id} blog={blog} updateLikes={updateLikes} />;
        })}
    </div>
  );
};

export default BlogsDisplay;
