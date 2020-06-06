import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('currentBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (userObject) => {    
    try {
      const returnedUser = await loginService.login(userObject)
      setUser(returnedUser)
      window.localStorage.setItem('currentBlogAppUser', JSON.stringify(returnedUser))
    } catch (exception) {
      setErrorMessage(exception.message)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('currentBlogAppUser')
  }

  const createBlog = async (blogObject) => {
    const newBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newBlog))
  }

  const updateLikes = async (blogObject) => {
    const updatedBlog = await blogService.updateLikes(blogObject)
    const newBlogs = blogs.map(blog =>
      (blog.id === updatedBlog.id
        ? {...blog, likes: updatedBlog.likes}
        : blog
      )
    )
    setBlogs(newBlogs)
  }
  
  const removeBlog = async (blogObject) => {
    await blogService.deleteBlog(blogObject)
    setBlogs(blogs.filter(blog => blog.id !== blogObject.blogId))
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog'>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  const loginForm = () => (
    <Togglable buttonLabel='log in'>
      <LoginForm handleLogin={handleLogin} />
    </Togglable>
  )

  return (
    <div>
      {errorMessage ? <p>{errorMessage}</p> : null}
      {user === null ?
        loginForm() :
        <div>
          <p>{`${user.name} is logged in`}</p>
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
        </div>
      }
      <h2>blogs</h2>
      <div id="blogList">
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id}
            updateLikes={updateLikes}
            removeBlog={removeBlog}
            blog={blog} 
            user={user}
          />
        )}
      </div>
    </div>
    
  )
}

export default App