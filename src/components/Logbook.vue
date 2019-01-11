<template>
  <div>
    <page-title-bar title="Logbook" />
    <b-table class="logs-table"
             :items="logs"
             :fields="fields"
             responsive
             v-if="logs.length > 0">
    </b-table>
  </div>
</template>

<script>
import PageTitleBar from './PageTitleBar.vue';
import LogService from '../services/LogService';

export default {
  name: 'Logbook',
  components: {
    PageTitleBar,
  },
  data() {
    return {
      logs: [],
      fields: {
        name: {
          label: 'Name',
          sortable: true,
        },
        createdAt: {
          label: 'Done',
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
    this.logs = (await LogService.index()).data;
  },
};
</script>

<style>

</style>
