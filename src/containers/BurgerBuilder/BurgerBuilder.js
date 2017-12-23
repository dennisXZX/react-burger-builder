import React, { Fragment, Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 0
  }

  addIngredientHandler = (type) => {
    // create a new object based on the current ingredient object
    const updatedIngredients = {
      ...this.state.ingredients
    }

    // get the current amount of the ingredient
    const currentAmount = this.state.ingredients[type];
    const updatedAmount = currentAmount + 1;

    // update the ingredient amount in the new object
    updatedIngredients[type] = updatedAmount;

    // calculate the new total price
    const priceAddition = INGREDIENT_PRICES[type];
    const currentTotalPrice = this.state.totalPrice;
    const updatedTotalPrice = currentTotalPrice + priceAddition;

    // update the state
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedTotalPrice
    })
  }

  removeIngredientHandler = (type) => {
    // get the current amount of the ingredient
    const currentAmount = this.state.ingredients[type];

    if (currentAmount <= 0) {
      return;
    }

    // create a new object based on the current ingredient object
    const updatedIngredients = {
      ...this.state.ingredients
    }

    const updatedAmount = currentAmount - 1;

    // update the ingredient amount in the new object
    updatedIngredients[type] = updatedAmount;

    // calculate the new total price
    const pricededuction = INGREDIENT_PRICES[type];
    const currentTotalPrice = this.state.totalPrice;
    const updatedTotalPrice = currentTotalPrice - pricededuction;

    // update the state
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedTotalPrice
    });
  }

  render() {
    // create a copy of the ingredient object
    // { salad: 1, bacon: 2, cheese: 0, meat: 0 }
    const disabledInfo = {
      ...this.state.ingredients
    };

    // convert the object to the new format
    // { salad: true, bacon: true, cheese: false, meat: false }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          totalPrice={this.state.totalPrice}
          disabled={disabledInfo} />
      </Fragment>
    );
  }
}

export default BurgerBuilder;