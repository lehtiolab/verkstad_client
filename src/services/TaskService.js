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
  task(taskId) {
    return Api().get(`/task/${taskId}`);
  },
  dueTasks() {
    return Api().get('/duetasks');
  },
};
