import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Blog from './Blog';

afterEach(cleanup);
describe.only('<Blog />', () => {
  let component;
  let mockHandler;

  beforeEach(() => {
    const blog = {
      title: 'Julet',
      author: 'Romeo',
      url: 'urli',
      user: '12345678910',
      likes: 1,
    };
    const user = {
      username: 'moi',
    };

    let setUpdate;

    mockHandler = jest.fn();
    component = render(
      <Blog
        blog={blog}
        setUpdate={setUpdate}
        user={user}
        onClick={mockHandler}
      />
    );
  });

  it('renders its title', () => {
    const div = component.getByText('Julet');
    expect(div).toBeInTheDocument();
  });

  it('clicks show more', () => {
    const button = component.getByText('view');
    fireEvent.click(button);

    const likes = component.getByText('hide');
    expect(likes).toBeInTheDocument();
  });
});
