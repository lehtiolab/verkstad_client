<template>
  <div v-if="machine">
    <page-title-bar :title="machine.name + ' Quality Control'" :showBack="true"/>
    <div class="description">Quality control plots from Kantele.</div>
    <b-alert :show="message === null ? false : true">
      {{ message }}
    </b-alert>
  </div>
</template>

<script>
import PageTitleBar from './PageTitleBar.vue';
import MachineService from '../services/MachineService';
import MachineQCService from '../services/MachineQCService';

export default {
  name: 'MachineQC',
  components: {
    PageTitleBar,
  },
  props: ['machineId'],
  data() {
    return {
      message: null,
      machine: null,
      plots: null,
    };
  },
  async created() {
    try {
      this.machine = (await MachineService.machine(this.machineId)).data;
      if (this.machine.length === 0) {
        this.message = 'There are no machines.';
      } else if (!this.machine.kanteleId) {
        this.message = 'You have not provided a Kantele ID. No QC data can be fetched.';
      } else {
        this.loadPlots();
      }
    } catch (err) {
      if (err.response) {
        this.message = err.response.data.error;
      } else {
        this.message = 'No connection to the server. Please contact an admin.';
      }
    }
  },
  methods: {
    async loadPlots() {
      try {
        this.plots = (await MachineQCService.getQCPlots(this.machine.kanteleId)).data;
        this.message = this.plots;
      } catch (err) {
        if (err.response) {
          this.message = err.response.data.error;
        } else {
          this.message = 'No connection to the server. Please contact an admin.';
        }
      }
    },
  },
};
</script>

<style scoped>
</style>
