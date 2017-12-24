import React, { Fragment, Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('https://react-burger-app-29cd2.firebaseio.com/ingredients.json')
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      })
  }

  updatePurchaseState = (ingredients) => {
    // 1. get all the keys of the ingredients object
    // 2. get all the values of the ingredients object
    // 3. calculate the sum of all ingredient amounts
    const sum = Object.keys(ingredients)
      .map(ingredientKey => {
        return ingredients[ingredientKey];
      })
      .reduce((sum, amount) => {
        return sum + amount;
      }, 0);

    this.setState({
      purchasable: sum > 0
    });
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
    });

    // update the purchasable state
    this.updatePurchaseState(updatedIngredients);
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

    // update the purchasable state
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    // display a spinner when the order data is being sent to backend
    this.setState({ loading: true });

    // create the data object to be sent to backend
    const order = {
      ingredients: this.state.ingredients,
      // normally the price should be calculated in the server side
      // to prevent any manipulation
      price: this.state.totalPrice,
      customer: {
        name: 'Dennis',
        address: {
          street: '1 Test St',
          zipCode: '2017',
          country: 'Australia'
        },
        email: 'dennis@gmail.com'
      },
      deliveryMethod: 'express'
    }

    // send the data to backend
    axios.post('/orders.json', order)
      .then((response) => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch((error) => {
        this.setState({ loading: false, purchasing: false });
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

    let orderSummary = null;

    let burger = this.state.error ?
                 <p>Ingredients can't be loaded!</p> :
                 <Spinner />;

    // check if ingredients data is successfully retrieved from backend when the component is mounted
    if (this.state.ingredients) {
      // initialize the order summary component
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          totalPrice={this.state.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}/>
      );

      // initialize the burger and burger control components
      burger = (
        <Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            totalPrice={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            disabled={disabledInfo} />
        </Fragment>
      );
    }

    // display a spinner if order summary is still being loaded
    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);