import Api from './Api';

export default {
  signUp(credentials) {
    return Api().post('/signup', credentials);
  },
};
