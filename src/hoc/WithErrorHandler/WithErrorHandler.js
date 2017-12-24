import React, { Component, Fragment } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  // return an anonymous class
  return class extends Component {
    state = {
      error: null
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null })
    }

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error })
      });
    }

    componentWillUnmount() {
      // remove these interceptors because this high order component will be used in many places
      // and each time this component is used, interceptors will be created
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    render() {
      return (
        <Fragment>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      )
    }
  }
}

export default withErrorHandler;