import { useState } from "react";

const BlogForm = ({createBlog}) => {
  //TODO: should I only use one object?
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreateBlog = (event) => {
    event.preventDefault();

    const blog = {
      title,
      author,
      url,
    };
    createBlog(blog);

    //TODO: only set when create blog successfully
    setTitle('')
    setAuthor('')
    setUrl('')
  };

  return (
    <div>
      <form onSubmit={handleCreateBlog}>
        <h2>create new</h2>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div>
          url
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm