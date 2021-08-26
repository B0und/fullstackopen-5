import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import BlogForm from './BlogForm'

describe('<BlogForm>',  () => {
  test('renders BlogForm content',  async () => {

    const addBlog = jest.fn()

    const component = render(<BlogForm addBlog={addBlog} />)


    const title = component.container.querySelector('#title')

    fireEvent.change(title, {
      target: { value: 'testing title' }
    })


    const author = component.container.querySelector('#author')
    fireEvent.change(author, {
      target: { value: 'testing author' }
    })

    const url = component.container.querySelector('#url')
    fireEvent.change(url, {
      target: { value: 'testing url' }
    })

    const form = component.container.querySelector('#form')
    fireEvent.submit(form)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0]).toBe('testing title')
    expect(addBlog.mock.calls[0][1]).toBe('testing author')
    expect(addBlog.mock.calls[0][2]).toBe('testing url')

  })
})