<template>
  <div class="qc-wrapper" v-if="machine">
    <page-title-bar :title="machine.name + ' Quality Control'" :showBack="true"/>
    <div class="description"></div>
    <b-alert :show="message === null ? false : true">
      {{ message }}
    </b-alert>
    <div class="description" v-if="!plotsLoaded & !message">Plots loading...</div>
    <div class="plots" v-if="plotsLoaded">
      <h5>Number of identifications</h5>
      <div :id="plots.bokeh_code.div.amount_peptides.elementid"></div>
      <hr />
      <h5>Number of PSMs</h5>
      <div :id="plots.bokeh_code.div.amount_psms.elementid"></div>
      <hr />
      <h5>Peptide precursor areas</h5>
      <div :id="plots.bokeh_code.div.precursorarea.elementid"></div>
      <hr />
      <h5>PSM MSGFScore</h5>
      <div :id="plots.bokeh_code.div.msgfscore.elementid"></div>
      <hr />
      <h5>Precursor error (ppm)</h5>
      <div :id="plots.bokeh_code.div.prec_error.elementid"></div>
      <hr />
      <h5>Retention time (min)</h5>
      <div :id="plots.bokeh_code.div.rt.elementid"></div>
    </div>
  </div>
</template>

<script>
import PageTitleBar from './PageTitleBar.vue';
import MachineService from '../services/MachineService';
import MachineQCService from '../services/MachineQCService';

// import plot from '../../data/plot.json';

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
      plots: {},
      plotsLoaded: false,
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
        this.plots = (await MachineQCService.getQCPlots(this.machine.kanteleId)); // .data?
        // this.plots = plot;
        // eslint-disable-next-line no-eval
        eval(this.plots.bokeh_code.script);
        this.plotsLoaded = true;
        this.message = null;
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
.qc-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.plots {
  overflow-y: scroll;
}

h5 {
  font-size: 1.1rem;
  font-weight: normal;
}
</style>
