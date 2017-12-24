import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-app-29cd2.firebaseio.com/'
})

export default instance;