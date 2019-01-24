import axios from 'axios';
import store from '../store/store';

export default () => axios.create({
  // baseURL: 'http://localhost:8081/',
  baseURL: 'https://mozzarella.scilifelab.se/verkstad_api/',
  headers: {
    Authorization: `Bearer ${store.state.token}`,
  },
});
