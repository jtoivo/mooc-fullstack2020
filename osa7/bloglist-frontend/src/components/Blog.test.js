import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Test title',
  author: 'Some Name',
  url: 'addr.xyz/abc',
  likes: 50,
  user: {
    username: 'tester',
    name: 'Test User'
  }
}

test('renders only title and author by default', () => {
  const component = render(
    <Blog blog={blog} username='tester' handleLike={jest.fn()} handleRemove={jest.fn()} />
  )
  expect(component.container).toHaveTextContent('Test title Some Name')

  const details = component.container.querySelector('.details')
  expect(details).toHaveStyle('display: none')
})

test('renders also url and likes after clicking view', () => {
  const component = render(
    <Blog blog={blog} username='tester' handleLike={jest.fn()} handleRemove={jest.fn()} />
  )
  expect(component.container).toHaveTextContent('Test title Some Name')

  const button = component.getByText('view')
  fireEvent.click(button)

  const details = component.container.querySelector('.details')
  expect(details).toHaveStyle('display: block')

  expect(component.container.querySelector('.url')).toHaveTextContent('addr.xyz/abc')
  expect(component.container.querySelector('.likes')).toHaveTextContent('50')
})

test('clicking like twice calls handler twice', () => {
  const mockLike = jest.fn()

  const component = render(
    <Blog blog={blog} username='tester' handleLike={mockLike} handleRemove={jest.fn()} />
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockLike.mock.calls).toHaveLength(2)
})