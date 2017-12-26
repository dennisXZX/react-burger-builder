import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

import * as actionType from '../../stores/actions';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    // axios.get('https://react-burger-app-29cd2.firebaseio.com/ingredients.json')
    //   .then((response) => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: true });
    //   })
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

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    const queryParams = [];

    // convert the ingredient object into an array
    // ["bacon=1", "cheese=0", "meat=0", "salad=1"]
    for (let ingredient in this.props.ingredients) {
      queryParams.push(`${ingredient}=${encodeURIComponent(this.props.ingredients[ingredient])}`);
    }

    queryParams.push(`price=${this.state.totalPrice}`);

    // convert the ingredient array into a string
    // 'bacon=0&cheese=0&meat=0&salad=1'
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryString}`
    });
  }

  render() {
    // create a copy of the ingredient object
    // { salad: 1, bacon: 2, cheese: 0, meat: 0 }
    const disabledInfo = {
      ...this.props.ingredients
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
    if (this.props.ingredients) {
      // initialize the order summary component
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          totalPrice={this.props.price}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}/>
      );

      // initialize the burger and burger control components
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            totalPrice={this.props.price}
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) => dispatch({
      type: actionType.ADD_INGREDIENT,
      ingredientName: ingredientName
    }),
    onIngredientRemoved: (ingredientName) => dispatch({
      type: actionType.REMOVE_INGREDIENT,
      ingredientName: ingredientName
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));