import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
]

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      <span>Total price: </span>
      <span className={classes.priceLabel}>
        {props.totalPrice.toFixed(2)}
      </span>
    </p>
    {controls.map((control) => (
      <BuildControl
        key={control.label}
        label={control.label}
        type={control.type}
        addIngredient={() => props.ingredientAdded(control.type)}
        removeIngredient={() => props.ingredientRemoved(control.type)}
        disabled={props.disabled[control.type]} />
    ))}
  </div>
);

export default buildControls;