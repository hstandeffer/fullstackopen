import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM, fireEvent } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog /> only renders visible content', () => {
  const blog = {
    title: 'Jimbos blog',
    author: 'Jimbo',
    url: 'Franklin.land',
    likes: '1000',
  }

  const component = render(
    <Blog blog={blog} />
  )

  component.debug() // NEED THIS TO SEE ELEMENTS HTML

  test('shows title and author, but nothing else', () => {
    const titleElement = component.container.querySelector('.blogTitle')
    const authorElement = component.container.querySelector('.blogAuthor')
    expect(titleElement).toHaveTextContent('Jimbos blog')
    expect(authorElement).toHaveTextContent('Jimbo')
  
    const element = component.container.querySelector('.togglableContent')
    expect(element).toHaveStyle('display: none')
  })
})