import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  let component
  const likeButton = jest.fn()

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="view details">
        <p className='blogUrl'>Franklin.land</p>
        <p className="blogLikes">1000</p>
        <button onClick={likeButton}>Like</button>
      </Togglable>
    )
  })

  test('renders its children', () => {
    expect(component.container.querySelector('.blogUrl')).toBeDefined()
    expect(component.container.querySelector('.blogLikes')).toBeDefined()
  })

  test('after clicking the button, the details are shown', () => {
    const button = component.getByText('view details')
    fireEvent.click(button)

    const urlElement = component.container.querySelector('.blogUrl')
    const likesElement = component.container.querySelector('.blogLikes')

    expect(urlElement).not.toHaveStyle('display: none')
    expect(likesElement).not.toHaveStyle('display: none')
  })
})