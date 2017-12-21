import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
  /* 1. extract the keys from the object and turn them into an array
     2. represent the amount of each ingredient using the length of an array
        [Array(1), Array(1), Array(2), Array(2)], each element in the array is 'undefined'
     3. map each array and convert each 'undefined' into a <BurgerIngredient /> component
  */
  const transformedIngredients = Object.keys(props.ingredients).map((ingredientKey) => {
    return [...Array(props.ingredients[ingredientKey])].map((_, index) => {
      return <BurgerIngredient key={ingredientKey + index} type={ingredientKey} />
    });
  });

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  )
}

export default burger;