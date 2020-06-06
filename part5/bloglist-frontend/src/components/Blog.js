import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, user, updateLikes, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeBlog = async (blog) => {
    const blogObject = {
      blogId: blog.id,
      user: blog.user.id,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    updateLikes(blogObject)
  }
  
  const deleteBlog = async (blog) => {
    const blogObject = {
      blogId: blog.id
    }
    if (window.confirm(`Are you sure you want to remove blog ${blog.title}?`)) {
      removeBlog(blogObject)
    }
  }

  return (
    <div style={blogStyle}>
      <strong><span className='blogTitle'>{blog.title}</span></strong>
      {' by '}
      <span className='blogAuthor'>{blog.author}</span>
      <Togglable buttonLabel='view details'>
        <p className='blogUrl'>{blog.url}</p>
        <p className="blogLikes">{blog.likes} likes</p>
        <button className="likeButton" onClick={() => likeBlog(blog)}>like</button>
        <p>{blog.author}</p>
        {(user && (user.userId === blog.user || user.userId === blog.user.id))
          ? <button className="removeButton" onClick={() => deleteBlog(blog)}>remove</button>
          : null
        }
      </Togglable>
    </div>
  )
}

export default Blog
