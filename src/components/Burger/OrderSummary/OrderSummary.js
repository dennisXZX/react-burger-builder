import React, { Fragment } from 'react'

import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  // 1. get all the keys from the ingredients object
  // 2. generate a list based on the keys
  const ingredientSummary = Object.keys(props.ingredients)
    .map((ingredientKey) => {
      return (
        <li key={ingredientKey}>
          <span style={{ textTransform: 'capitalize' }}>{ingredientKey}</span>
          <span>: {props.ingredients[ingredientKey]}</span>
        </li>
      )
    });

  return (
    <Fragment>
      <h2>Your Order</h2>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p style={{ fontWeight: 'bold' }}>Total Price: ${props.totalPrice.toFixed(2)}</p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
    </Fragment>
  );
};

export default orderSummary;