import Api from './Api';

export default {
  add(properties) {
    return Api().post('/addtask', properties);
  },
  index() {
    return Api().get('/tasks');
  },
  deleteTask(properties) {
    return Api().post('/deletetask', properties);
  },
};
