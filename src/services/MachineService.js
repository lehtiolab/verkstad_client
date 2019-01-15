import Api from './Api';

export default {
  add(specifications) {
    return Api().post('/addmachine', specifications);
  },
  index() {
    return Api().get('/machines');
  },
  deleteMachine(machineId) {
    return Api().delete(`deletemachine/${machineId}`);
  },
};
