import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";

import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      if (user !== null) {
        blogService.setToken(user.token);
      }
    }
  }, []);

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title,
      author,
      url,
    };

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setTitle("");
      setUrl("");
      setAuthor("");
    });

    setErrorMessage(`Added blog: ${blogObject.title}`);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const logoutHandler = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogUser");
    blogService.setToken(null);
  };

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ? (
        <LoginForm setErrorMessage={setErrorMessage} setUser={setUser}/>
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={logoutHandler}>Logout</button>
          <Togglable buttonLabel="new blog">
            <BlogForm
              title={title}
              author={author}
              url={url}
              setTitle={setTitle}
              setAuthor={setAuthor}
              setUrl={setUrl}
              addBlog={addBlog}
            />
          </Togglable>
          <h2>blogs</h2>
          {blogs
            .filter((blog) => blog.user?.username === user.username)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
