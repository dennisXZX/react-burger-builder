import React, { Fragment } from 'react'

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
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to Checkout?</p>
    </Fragment>
  );
};

export default orderSummary;