import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";

import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  const [blogs, setBlogs] = useState([]);

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

  const logoutHandler = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogUser");
    blogService.setToken(null);
  };

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ? (
        <LoginForm setErrorMessage={setErrorMessage} setUser={setUser} />
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={logoutHandler}>Logout</button>
          <Togglable buttonLabel="new blog">
            <BlogForm
              setErrorMessage={setErrorMessage}
              setBlogs={setBlogs}
              blogs={blogs}
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
