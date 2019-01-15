import Api from './Api';

export default {
  add(properties) {
    return Api().post('/addtask', properties);
  },
  index() {
    return Api().get('/tasks');
  },
  deleteTask(taskId) {
    return Api().delete(`deletetask/${taskId}`);
  },
  task(taskId) {
    return Api().get(`/task/${taskId}`);
  },
};
