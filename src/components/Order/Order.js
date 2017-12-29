import React from 'react';

import classes from './Order.css';

const order = (props) => {
  const ingredients = [];

  // convert to an array of [{name: "bacon", amount: 1}, {name: "cheese", amount: 0}]
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    })
  }

  const ingredientOutput = ingredients.map((ingredient) => {
    return (
      <span
        key={ingredient.name}
        className={classes.Ingredient}>
        {ingredient.name} ({ingredient.amount})
      </span>
    )
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        <span>Price: </span>
        <span>USD {parseFloat(props.price).toFixed(2)}</span>
      </p>
    </div>
  )
};

export default order;