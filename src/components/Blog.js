import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, deletePost }) => {
  let [visible, setVisible] = useState(false);
  let [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    try {
      const updatedBlog = await blogService.updateBlog(blog.id, {likes: likes ? likes + 1 : 1});
      setLikes(updatedBlog.likes)
    } catch (error) {
      console.log(error);
    }
  }
  const handleDelete = () => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (result) {
      deletePost(blog.id);
    }
  }

  const detail = () => {
    return (
      <>
        <div>{blog.url}</div>
        <div>
          likes {likes ? likes : 0} <button onClick={handleLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button style={{backgroundColor: 'greenyellow'}} onClick={handleDelete}>delete</button>
      </>
    )
  }
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>
          {visible ? "hide" : "view"}
        </button>
      </div>
      {
        visible && detail()
      }
    </div>
  );
};

export default Blog;
