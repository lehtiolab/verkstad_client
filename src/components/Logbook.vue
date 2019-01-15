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
        machine: {
          label: 'Machine',
          sortable: true,
        },
        user: {
          label: 'User',
          sortable: true,
        },
        createdAt: {
          label: 'Last done',
          sortable: true,
          formatter: (value) => {
            const d = new Date(value);
            return d.toISOString().split('T')[0];
          },
        },
        mode: {
          label: 'OK',
          sortable: true,
        },
      },
    };
  },
  async mounted() {
    const rawLogs = (await LogService.index()).data;
    this.logs = rawLogs.map(e => ({
      name: e.MachineTask.Task.name,
      createdAt: e.createdAt,
      machine: e.MachineTask.Machine.name,
      mode: e.mode,
      // user: e.User.name,
    }));
  },
};
</script>

<style>

</style>
