import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  }

  componentWillMount() {
    // convert the string into a URLSearchParams object
    const query = new URLSearchParams(this.props.location.search);

    const ingredients = {};
    let price = 0;

    // iterate through the URLSearchParams object and extract its key and value
    for (let param of query) {
      if (param[0] === 'price') {
        price = param[1];
      } else {
        ingredients[param[0]] = parseInt(param[1], 10);
      }
    }

    this.setState({
      ingredients: ingredients,
      totalPrice: price
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
        <Route
          path={this.props.match.path + '/contact-data'}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...props} />
          )} />
      </div>
    )
  }
}

export default Checkout;