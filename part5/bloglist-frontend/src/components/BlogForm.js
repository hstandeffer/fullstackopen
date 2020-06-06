import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })

    setTitle('')
    setUrl('')
    setAuthor('')
  }

  return (
    <form onSubmit={addBlog}>
      <h2>Create new</h2>
      <div>
        title:
        <input
          value={title}
          type="text"
          name="title"
          id="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          value={author}
          type="text"
          name="author"
          id="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          value={url}
          type="text"
          name="url"
          id="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id="submitBlog" type="submit">create</button>
    </form>
  )
}

export default BlogForm