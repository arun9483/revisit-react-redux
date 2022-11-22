import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  render,
  screen,
  within,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { counterReducer } from './counterSlice';
import Counter from './Counter';

describe('render Counter Component', () => {
  test('render initial state', () => {
    const store = configureStore({
      reducer: {
        counter: counterReducer,
      },
    });
    render(
      <Provider store={store}>
        <Counter />
      </Provider>
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Counter');
    const decrementButton = screen.getByRole('button', {
      name: '-',
    });

    const incrementButton = screen.getByRole('button', {
      name: '+',
    });

    const addAmountButton = screen.getByRole('button', {
      name: 'Add Amount',
    });

    const addAsyncButton = screen.getByRole('button', {
      name: 'Add Async',
    });

    const addIfOddButton = screen.getByRole('button', {
      name: 'Add If Odd',
    });

    const inputField = screen.getByRole('textbox');

    expect(decrementButton).toBeInTheDocument();
    expect(incrementButton).toBeInTheDocument();
    expect(addAmountButton).toBeInTheDocument();
    expect(addAsyncButton).toBeInTheDocument();
    expect(addIfOddButton).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveValue('');
    expect(screen.getByText(10)).toBeInTheDocument();
  });

  test('verify decrement button functionality', async () => {
    const store = configureStore({
      reducer: {
        counter: counterReducer,
      },
    });
    render(
      <Provider store={store}>
        <Counter />
      </Provider>
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Counter');
    const inputField = screen.getByRole('textbox');

    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveValue('');
    expect(screen.getByText(10)).toBeInTheDocument();

    const decrementButton = screen.getByRole('button', {
      name: '-',
    });

    expect(decrementButton).toBeInTheDocument();

    userEvent.click(decrementButton);

    // Loading state displays and gets removed once results are displayed
    await waitForElementToBeRemoved(() => screen.queryByText('10'));

    expect(screen.getByText(9)).toBeInTheDocument();
  });

  test('verify increment button functionality', async () => {
    const store = configureStore({
      reducer: {
        counter: counterReducer,
      },
    });
    render(
      <Provider store={store}>
        <Counter />
      </Provider>
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Counter');
    const inputField = screen.getByRole('textbox');

    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveValue('');
    expect(screen.getByText(10)).toBeInTheDocument();

    const incrementButton = screen.getByRole('button', {
      name: '+',
    });

    expect(incrementButton).toBeInTheDocument();

    userEvent.click(incrementButton);

    // Loading state displays and gets removed once results are displayed
    await waitForElementToBeRemoved(() => screen.queryByText('10'));

    expect(screen.getByText(11)).toBeInTheDocument();
  });

  test('verify Add Amount button functionality', async () => {
    const store = configureStore({
      reducer: {
        counter: counterReducer,
      },
    });
    render(
      <Provider store={store}>
        <Counter />
      </Provider>
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Counter');
    const inputField = screen.getByRole('textbox');

    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveValue('');
    expect(screen.getByText(10)).toBeInTheDocument();

    const addAmountButton = screen.getByRole('button', {
      name: 'Add Amount',
    });
    expect(addAmountButton).toBeInTheDocument();

    userEvent.type(inputField, '20');

    await screen.findByDisplayValue('20');
    userEvent.click(addAmountButton);

    const text30 = await screen.findByText('30');
    expect(text30).toBeInTheDocument();
  });

  test('verify Add Amount button functionality - with empty text', async () => {
    const store = configureStore({
      reducer: {
        counter: counterReducer,
      },
    });
    render(
      <Provider store={store}>
        <Counter />
      </Provider>
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Counter');
    const inputField = screen.getByRole('textbox');

    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveValue('');
    expect(screen.getByText(10)).toBeInTheDocument();

    const addAmountButton = screen.getByRole('button', {
      name: 'Add Amount',
    });
    expect(addAmountButton).toBeInTheDocument();
    userEvent.click(addAmountButton);
    expect(screen.getByText(10)).toBeInTheDocument();
  });
  test('verify Add If Odd button functionality - add amount if current value is odd', async () => {
    const store = configureStore({
      reducer: {
        counter: counterReducer,
      },
    });
    render(
      <Provider store={store}>
        <Counter />
      </Provider>
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Counter');
    const inputField = screen.getByRole('textbox');

    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveValue('');
    expect(screen.getByText(10)).toBeInTheDocument();

    const addAmountButton = screen.getByRole('button', {
      name: 'Add Amount',
    });
    expect(addAmountButton).toBeInTheDocument();

    userEvent.type(inputField, '11');

    await screen.findByDisplayValue('11');
    userEvent.click(addAmountButton);

    const text21 = await screen.findByText('21');
    expect(text21).toBeInTheDocument();

    userEvent.clear(inputField);

    userEvent.type(inputField, '9');

    await screen.findByDisplayValue('9');

    const addIfOddButton = screen.getByRole('button', {
      name: 'Add If Odd',
    });
    expect(addIfOddButton).toBeInTheDocument();
    userEvent.click(addIfOddButton);

    const text30 = await screen.findByText('30');
    expect(text30).toBeInTheDocument();
  });

  test('verify Add If Odd button functionality - do not add amount if current value is even', async () => {
    const store = configureStore({
      reducer: {
        counter: counterReducer,
      },
    });
    render(
      <Provider store={store}>
        <Counter />
      </Provider>
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Counter');
    const inputField = screen.getByRole('textbox');

    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveValue('');
    expect(screen.getByText(10)).toBeInTheDocument();

    userEvent.type(inputField, '9');

    await screen.findByDisplayValue('9');

    const addIfOddButton = screen.getByRole('button', {
      name: 'Add If Odd',
    });
    expect(addIfOddButton).toBeInTheDocument();
    userEvent.click(addIfOddButton);

    expect(screen.queryByText('19')).not.toBeInTheDocument();
  });

  test('verify Add If Odd button functionality - with empty text', async () => {
    const store = configureStore({
      reducer: {
        counter: counterReducer,
      },
    });
    render(
      <Provider store={store}>
        <Counter />
      </Provider>
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Counter');
    const inputField = screen.getByRole('textbox');

    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveValue('');
    expect(screen.getByText(10)).toBeInTheDocument();

    const addIfOddButton = screen.getByRole('button', {
      name: 'Add If Odd',
    });
    expect(addIfOddButton).toBeInTheDocument();
    userEvent.click(addIfOddButton);

    expect(screen.getByText('10')).toBeInTheDocument();
  });

  test('verify Add Async button functionality - resolve', async () => {
    const store = configureStore({
      reducer: {
        counter: counterReducer,
      },
    });
    render(
      <Provider store={store}>
        <Counter />
      </Provider>
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Counter');
    const inputField = screen.getByRole('textbox');

    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveValue('');
    expect(screen.getByText(10)).toBeInTheDocument();

    userEvent.type(inputField, '5');

    await screen.findByDisplayValue('5');

    const addAsyncButton = screen.getByRole('button', {
      name: 'Add Async',
    });
    expect(addAsyncButton).toBeInTheDocument();
    userEvent.click(addAsyncButton);

    const text15 = await screen.findByText('15');
    expect(text15).toBeInTheDocument();
  });

  test('verify Add Async button functionality - reject', async () => {
    const store = configureStore({
      reducer: {
        counter: counterReducer,
      },
    });
    render(
      <Provider store={store}>
        <Counter />
      </Provider>
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Counter');
    const inputField = screen.getByRole('textbox');

    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveValue('');
    expect(screen.getByText(10)).toBeInTheDocument();

    userEvent.type(inputField, '4');

    await screen.findByDisplayValue('4');

    const addAsyncButton = screen.getByRole('button', {
      name: 'Add Async',
    });
    expect(addAsyncButton).toBeInTheDocument();
    userEvent.click(addAsyncButton);
    const failedMessage = await screen.findByText(
      'Async add failed because enter amount is not multiple of 5'
    );
    expect(failedMessage).toBeInTheDocument();
  });

  test('verify Add Async button functionality - reject with default value', async () => {
    const store = configureStore({
      reducer: {
        counter: counterReducer,
      },
    });
    render(
      <Provider store={store}>
        <Counter />
      </Provider>
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Counter');
    const inputField = screen.getByRole('textbox');

    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveValue('');
    expect(screen.getByText(10)).toBeInTheDocument();

    const addAsyncButton = screen.getByRole('button', {
      name: 'Add Async',
    });
    expect(addAsyncButton).toBeInTheDocument();
    userEvent.click(addAsyncButton);
    const failedMessage = await screen.findByText(
      'Async add failed because enter amount is not multiple of 5'
    );
    expect(failedMessage).toBeInTheDocument();
  });
});
