const axios = require('axios');

const Kantele = axios.create({
  baseURL: 'https://mozzarella.scilifelab.se/dash',
});

export default {
  getQCPlots(kanteleId) {
    return Kantele.get(`/longqc/${kanteleId}`);
  },
};
