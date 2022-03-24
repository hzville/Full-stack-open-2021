import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
    let container
    let mockLike

    const user = {
        username: 'test',
    }
    window.localStorage.setItem('loggedUser', JSON.stringify(user))

    const blog_content = {
        title: 'test title',
        author: 'test author',
        url: 'test url',
        likes: 5,
        user: {
            username: 'test',
        },
    }

    beforeEach(() => {
        mockLike = jest.fn()
        container = render(
            <Blog blog={blog_content} addNewLike={mockLike} />
        ).container
    })

    test('blog renders only title and author', () => {
        screen.getByText('test title', { exact: false })
        screen.getByText('test author', { exact: false })
    })

    test('url and likes are hidden by default', () => {
        const div = container.querySelector('.viewableContent')
        expect(div).toHaveStyle('display: none')
    })

    test('url and likes are visible after clicking view button', () => {
        const viewButton = screen.getByText('view')
        userEvent.click(viewButton)
        screen.getByText('test url', { exact: false })
        screen.getByText('5', { exact: false })
        const div = container.querySelector('.viewableContent')
        expect(div).not.toHaveStyle('display: none')
    })

    test('pressing like button calls function 2 times', () => {
        const likeButton = screen.getByText('like')
        userEvent.click(likeButton)
        userEvent.click(likeButton)
        expect(mockLike.mock.calls).toHaveLength(2)
    })
})
