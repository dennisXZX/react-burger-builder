import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  }

  componentDidMount() {
    // convert the string into a URLSearchParams object
    const query = new URLSearchParams(this.props.location.search);

    const ingredients = {};

    // iterate through the URLSearchParams object and extract its key and value
    for (let param of query) {
      ingredients[param[0]] = parseInt(param[1], 10);
    }

    this.setState({
      ingredients: ingredients
    })
  }

  checkoutCancelled = () => {
    this.props.history.goBack();
  }

  checkoutContinued = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelled}
          checkoutContinued={this.checkoutContinued} />
      </div>
    )
  }
}

export default Checkout;