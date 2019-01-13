import Api from './Api';

export default {
  add(specifications) {
    return Api().post('/addmachine', specifications);
  },
  index() {
    return Api().get('/machines');
  },
  deleteMachine(name) {
    return Api().post('/deletemachine', name);
  },
};
