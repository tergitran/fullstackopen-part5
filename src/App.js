import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import authenService from "./services/authen";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //TODO: should I only use one object?
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const [toast, setToast] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userJSON = localStorage.getItem("loginUserInfor");
    const user = JSON.parse(userJSON);
    if (user) {
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      if (
        !username ||
        !password ||
        username.length < 3 ||
        password.length < 3
      ) {
        setToast({
          message: 'invalid username or password' + Math.random() * 10,
          type: 'error'
        })
        // console.log("invalid username or password");
        return;
      } else {
        const user = await authenService.login({
          username,
          password,
        });
        localStorage.setItem("loginUserInfor", JSON.stringify(user));
        setUser(user);
        blogService.setToken(user.token);
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("loginUserInfor");
    setUser(null);
  };

  const createBlog = async (event) => {
    event.preventDefault();

    try {
      const blog = {
        title,
        author,
        url,
      };
      const newBlog = await blogService.postBlog(blog);
      setBlogs(blogs.concat(newBlog)) //TODO: newBlog user only return ID
      setToast({
        message: `a new blog ${newBlog.title}! by ${newBlog.author} added`,
        type: 'success',
        time: 1000
      })
    } catch (error) {
      console.log(error);
    }
  };

  const loginForm = () => {
    return (
      <div>
        <form onSubmit={handleLogin}>
          <h2>Log in to application</h2>
          { !!toast && <Notification message={toast.message} type={toast.type}></Notification>}
          <div>
            <label>
              username
              <input
                value={username}
                onChange={({ target }) => {
                  setUsername(target.value);
                }}
              ></input>
            </label>
          </div>
          <div>
            <label>
              password
              <input
                value={password}
                onChange={({ target }) => {
                  setPassword(target.value);
                }}
              ></input>
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  };

  const blogForm = () => {
    return (
      <div>
        <form onSubmit={createBlog}>
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
    );
  };

  if (user !== null) {
    return (
      <div>
        <h2>blogs</h2>
        { !!toast && <Notification message={toast.message} type={toast.type} time={toast.time}></Notification>}
        <div>
          {user.name} logged in <button onClick={logout}>logout</button>
        </div>
        <br></br>
        {blogForm()}
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }
  return loginForm();
};

export default App;
