import Api from './Api';

export default {
  add(properties) {
    return Api().post('/addtask', properties);
  },
  update(properties) {
    return Api().put(`/updatetask/${properties.task.id}`, properties);
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
