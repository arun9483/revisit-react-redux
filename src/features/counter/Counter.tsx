import React, { useRef } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectCount,
  increment,
  decrement,
  incrementByAmount,
  incrementIfOdd,
  incrementAsync,
} from './CounterSlice';

import style from './Counter.module.css';
const Counter: React.FC<{}> = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const counter = useAppSelector(selectCount);

  const dispatch = useAppDispatch();

  const increase = () => {
    dispatch(increment());
  };

  const decrease = () => {
    dispatch(decrement());
  };

  const add = () => {
    if (inputRef.current?.value) {
      dispatch(incrementByAmount(parseInt(inputRef.current.value)));
    }
  };

  const addAmountIfOdd = () => {
    if (inputRef.current?.value) {
      dispatch(incrementIfOdd(parseInt(inputRef.current.value)));
    }
  };

  const addAsync = () => {
    if (inputRef.current?.value) {
      dispatch(incrementAsync(parseInt(inputRef.current.value)));
    }
  };

  return (
    <div className={style['counter-container']}>
      <h1>Counter</h1>
      <div className={style['upper-container']}>
        <button onClick={decrease}>-</button>
        <span>{counter}</span>
        <button onClick={increase}>+</button>
      </div>
      <div className={style['lower-container']}>
        <input ref={inputRef} />
        <button onClick={add}>Add Amount</button>
        <button onClick={addAsync}>Add Async</button>
        <button onClick={addAmountIfOdd}>Add If Odd</button>
      </div>
    </div>
  );
};

export default Counter;
