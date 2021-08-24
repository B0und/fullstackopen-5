const BlogForm = ({
  title,
  author,
  url,
  setTitle,
  setAuthor,
  setUrl,
  addBlog,
}) => (
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

export default BlogForm;
