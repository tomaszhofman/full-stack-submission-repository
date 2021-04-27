import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog', () => {
  let component;
  let mockHandler;
  beforeEach(() => {
    const blog = {
      author: 'Adam Mickiewicz',
      title: 'Imigracja',
    };

    component = render(<Blog blog={blog} updateLikeCount={mockHandler} />);
    mockHandler = jest.fn();
  });

  test('blog component renders the blog title and author', () => {
    const el = component.getByText('Imigracja');
    expect(el).toBeDefined();
  });

  test('checks that the blog url na number of likes are shonw', () => {
    const button = component.getByText('view');
    fireEvent.click(button);

    const div = component.container.querySelector('.toggableElement');
    const el = component.getByText('Imigracja');
    expect(el).toBeDefined();
    console.log(el);
  });

  //   test('checks if button is clicked twice', () => {
  //     mockHandler = jest.fn();

  //     const button = component.getByText('view');
  //     fireEvent.click(button);

  //     const voteButton = component.getByText('vote');
  //     fireEvent.click(voteButton);

  //     expect(mockHandler.mock.calls).toHaveLength(1);
  //   });
});
