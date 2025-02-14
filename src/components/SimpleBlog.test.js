import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'
import { tsExternalModuleReference, exportAllDeclaration } from '@babel/types'



describe('<SimpleBlog/>', () => {
  const blog = {
    title: 'Heippa maailma',
    author: 'Juuso',
    likes: 0
  }
  test('SimpleBlog renders author of the blog', async () => {

    const component = render(
      <SimpleBlog blog={blog} onClick={() => console.log()} />
    )

    expect(component.container).toHaveTextContent('Juuso')

  })
  test('Simple blog renders title of the blog', async () => {
    const component = render(
      <SimpleBlog blog={blog} onClick={() => console.log()} />
    )

    expect(component.container).toHaveTextContent('Heippa maailma')

  })
  test('Simple blog renders likes', async () => {
    const component = render(
      <SimpleBlog blog={blog} onClick={() => console.log()} />
    )

    expect(component.container).toHaveTextContent('0')

  })

  test('Button is clicked twice', async () => {
    const mockHandler = jest.fn()

    const { getByText } = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )
    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)


  })

})