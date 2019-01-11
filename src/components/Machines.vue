<template>
  <div>
    <page-title-bar title="Machines" />
    <b-table class="machines-table"
             :items="machines"
             :fields="fields"
             responsive
             v-if="machines.length > 0">
    </b-table>
    <b-button class="btn-outlined"
              to="/addmachine">
      Add machine
    </b-button>
  </div>
</template>

<script>
import PageTitleBar from './PageTitleBar.vue';
import MachineService from '../services/MachineService';

export default {
  name: 'Machines',
  components: {
    PageTitleBar,
  },
  data() {
    return {
      machines: [],
      fields: {
        name: {
          label: 'Name',
          sortable: true,
        },
        type: {
          label: 'Type',
          sortable: true,
        },
        createdAt: {
          label: 'Created',
          sortable: true,
          formatter: (value) => {
            const d = new Date(value);
            return [
              d.getFullYear(),
              ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1),
              (d.getDate() < 10 ? '0' : '') + d.getDate(),
            ].join('-');
          },
        },
      },
    };
  },
  async mounted() {
    this.machines = (await MachineService.index()).data;
  },
};
</script>

<style>

</style>
