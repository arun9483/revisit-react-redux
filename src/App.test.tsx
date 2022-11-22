import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import App from './App';
import store from './app/store';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByText(/learn/i)).toBeInTheDocument();
});
