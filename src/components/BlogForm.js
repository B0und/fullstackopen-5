import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ setErrorMessage, blogs, setBlogs, blogFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title,
      author,
      url,
    };

    blogFormRef.current.toggleVisibility();

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs([...blogs, blogObject]);
      setTitle("");
      setUrl("");
      setAuthor("");
    });

    setErrorMessage(`Added blog: ${blogObject.title}`);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  return (
    <div>
      <h2>Create a new Blog</h2>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button onClick={addBlog}>Create a new blog</button>
    </div>
  );
};

export default BlogForm;
