import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  }
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
};

export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    // send a sign up request to Firebase
    axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAs5vT4Uvj7xs65g7XVfCNbv_n0QUgr-8Q', authData)
      .then((response) => {
        console.log(response);
        dispatch(authSuccess(response));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFail(error));
      })
  }
};