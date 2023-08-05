import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import ToggleContent from "./components/ToggleContent";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import authenService from "./services/authen";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      getBlogs();
    } catch (error) {
      console.log(error);
    }
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
      setToast({
        message: 'invalid username or password ' + new Date(),
        type: 'error'
      })
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("loginUserInfor");
    setUser(null);
  };

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.postBlog(blog);
      // setBlogs(blogs.concat(newBlog)) //TODO: newBlog user only return ID
      //TODO: temporary resolve
      await getBlogs();
      setToast({
        message: `a new blog ${newBlog.title}! by ${newBlog.author} added`,
        type: 'success'
      })
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    try {
      await blogService.deleteBlog(id);
      setBlogs(blogs.filter(blog => blog.id !== id));
      setToast({
        message: `delete blog successfully`,
        type: 'success'
      })
    } catch (error) {
      console.log(error);
      setToast({
        message: `can't delete blog`,
        type: 'error'
      })
    }
  }

  const getBlogs = async () => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    setBlogs(blogs);
  }

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
      <ToggleContent label={'create blog'}>
        <BlogForm createBlog={createBlog}>
        </BlogForm>
      </ToggleContent>
    )
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
          <Blog key={blog.id} blog={blog} deletePost={deletePost}/>
        ))}
      </div>
    );
  }
  return loginForm();
};

export default App;
