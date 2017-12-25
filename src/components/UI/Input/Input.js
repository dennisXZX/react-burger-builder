import React from 'react';

import classes from './Input.css';

const input = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case ('input'):
      inputElement = <input
        value={props.value}
        className={classes.InputElement}
        {...props.elementConfig} onChange={props.changed}/>;
      break;
    case ('textarea'):
      inputElement = <textarea
        value={props.value}
        className={classes.InputElement}
        {...props.elementConfig} onChange={props.changed}/>
      break;
    case ('select'):
      inputElement = <select
        value={props.value}
        className={classes.InputElement} onChange={props.changed}>
        {props.elementConfig.options.map((option) => (
          <option value={option.value} key={option.value}>{option.displayValue}</option>
        ))}
      </select>
      break;
    default:
      inputElement = <input
        value={props.value}
        className={classes.InputElement}
        {...props.elementConfig} onChange={props.changed}/>;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  )
}

export default input;
