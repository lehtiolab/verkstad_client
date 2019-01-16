import Api from './Api';

export default {
  add(properties) {
    return Api().post('/addlog', properties);
  },
  index() {
    return Api().get('/logbook');
  },
  log(logId) {
    return Api().get(`/log/${logId}`);
  },
  deleteLog(logId) {
    return Api().delete(`/deletelog/${logId}`);
  },
};
