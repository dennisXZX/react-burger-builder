import React, { Component, Fragment } from 'react'

import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.css';

class modal extends Component {

  // use shouldComponentUpdate() to optimize performance
  // the app should not re-render Modal component when it's hidden
  // Modal component should be re-rendered only when user clicks 'ORDER NOW' button
  shouldComponentUpdate(nextProps, nextState) {
    // Modal component re-render only when the 'show' property changes
    return nextProps.show !== this.props.show;
  }

  render() {
    return (
      <Fragment>
        <Backdrop
          clicked={this.props.modalClosed}
          show={this.props.show} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}>
          {this.props.children}
        </div>
      </Fragment>
    )
  }
}

export default modal;