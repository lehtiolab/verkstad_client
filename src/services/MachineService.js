import Api from './Api';

export default {
  addMachine(specifications) {
    return Api().post('/addmachine', specifications);
  },
};
