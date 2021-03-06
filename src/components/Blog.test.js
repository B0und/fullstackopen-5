import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    url: 'www.google.com',
    author: 'jack',
    likes:0,
    user: {
      user: 'bro',
      username: 'anon'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library jack'
  )
  expect(component.container).not.toHaveTextContent(
    'www.google.com'
  )
})


test('show more adds extra info', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    url: 'www.google.com',
    author: 'jack',
    likes:0,
    user: {
      user: 'bro',
      username: 'anon'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library jack'
  )

  expect(component.container).not.toHaveTextContent(
    'www.google.com'
  )
  expect(component.container).not.toHaveTextContent(
    'like'
  )

  const showButton = component.container.querySelector('.showMore')
  fireEvent.click(showButton)

  expect(component.container).toHaveTextContent(
    'www.google.com'
  )

  expect(component.container).toHaveTextContent(
    'like'
  )

  expect(component.container).toHaveTextContent(
    '0'
  )

})


test('like button press works', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    url: 'www.google.com',
    author: 'jack',
    likes:0,
    user: {
      user: 'bro',
      username: 'anon'
    }
  }
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} updateLikes={mockHandler} />
  )

  const showButton = component.container.querySelector('.showMore')
  fireEvent.click(showButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})