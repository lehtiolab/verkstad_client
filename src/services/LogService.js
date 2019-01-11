import Api from './Api';

export default {
  add(properties) {
    return Api().post('/addlog', properties);
  },
  index() {
    return Api().get('/logbook');
  },
};
