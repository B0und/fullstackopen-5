import Blog from "../components/Blog";
import blogService from "../services/blogs";

const BlogsDisplay = ({ blogs, user, setBlogs }) => {
  const updateLikes = (blog) => {
    blogService.update(blog.id, { likes: blog.likes + 1 });
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    setBlogs(blogs.map((b) => (b.id !== blog.id ? b : changedBlog)));
  };

  const removeBlog = async (blog) => {
    if (window.confirm(`Do you really want to delete ${blog.title}`)) {
      await blogService.deleteBlog(blog.id);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
    }
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
          return (
            <Blog
              key={blog.id}
              blog={blog}
              updateLikes={updateLikes}
              removeBlog={removeBlog}
            />
          );
        })}
    </div>
  );
};

export default BlogsDisplay;
