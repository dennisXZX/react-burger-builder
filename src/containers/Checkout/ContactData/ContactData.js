import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import axios from '../../../axios-orders';

import classes from './ContactData.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();

    // display a spinner when the order data is being sent to backend
    this.setState({ loading: true });

    // create the data object to be sent to backend
    const order = {
      ingredients: this.props.ingredients,
      // normally the price should be calculated in the server side
      // to prevent any manipulation
      price: this.props.price,
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
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }

  render() {
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your name" />
        <input className={classes.Input} type="email" name="email" placeholder="Your email" />
        <input className={classes.Input} type="text" name="street" placeholder="Street" />
        <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
        <Button
          btnType="Success"
          clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;