import Api from './Api';

export default {
  index() {
    return Api().get('/machinetasks');
  },
  machineTask(machineTaskId) {
    return Api().get(`/machinetask/${machineTaskId}`);
  },
};
