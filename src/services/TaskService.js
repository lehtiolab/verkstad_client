import Api from './Api';

export default {
  addTask(properties) {
    return Api().post('/addtask', properties);
  },
};
