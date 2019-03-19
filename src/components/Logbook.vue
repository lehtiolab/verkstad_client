<template>
  <div class="wrapper">
    <page-title-bar title="Logbook" />
    <div class="description"></div>
    <b-alert :show="message === null ? false : true">
      {{ message }}
    </b-alert>
    <b-table class="logs-table"
             :items="logs"
             :fields="fields"
             sort-by="createdAt"
             :sort-desc="true"
             responsive
             v-if="logs.length > 0">
      <template slot="status" slot-scope="row">
        <font-awesome-icon v-if="row.value === 'check'"
                           icon="check-circle"
                           style="color:darkseagreen" />
        <font-awesome-icon v-else-if="row.value === 'dismiss'"
                           icon="times-circle"
                           style="color:lightcoral" />
      </template>
      <template slot="actions" slot-scope="row">
        <b-button size="sm"
                  class="mr-2 btn-details"
                  @click.stop="showDetails(row.item)"
                  v-show="$store.state.token">
          Details
        </b-button>
        <b-button size="sm"
                  class="mr-2 btn-delete"
                  @click.stop="deleteLogRequest(row.item)"
                  v-show="$store.state.token">
          Delete
        </b-button>
      </template>
    </b-table>
    <b-modal id="modalQuestion" @ok="deleteLog" title="Delete log?">
      <p>Do you really want to delete this log?</p>
    </b-modal>
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
      message: null,
      logs: [],
      fields: {
        status: {
          label: 'Status',
          sortable: true,
        },
        task: {
          label: 'Task',
          sortable: true,
        },
        machine: {
          label: 'Machine',
          sortable: true,
        },
        createdAt: {
          label: 'Done',
          sortable: true,
          formatter: (value) => {
            const d = new Date(value);
            return d.toISOString().split('.')[0].replace('T', ' ');
          },
        },
        user: {
          label: 'by',
          sortable: true,
        },
        actions: {
          label: '',
          sortable: false,
        },
      },
      modalQuestion: {
        id: null,
      },
    };
  },
  async created() {
    await this.loadLogs();
  },
  methods: {
    async loadLogs() {
      try {
        this.logs = (await LogService.index()).data;
        if (this.logs.length === 0) {
          this.message = 'There are no logs.';
        } else {
          this.message = null;
        }
      } catch (err) {
        if (err.response && err.response.data.error !== '') {
          this.message = err.response.data.error;
        } else {
          this.message = 'No connection to the server. Please contact an admin.';
        }
      }
    },
    showDetails(item) {
      this.$router.push({
        name: 'logdetails',
        params: {
          logId: item.id,
        },
      });
    },
    deleteLogRequest(item) {
      this.modalQuestion.id = item.id;
      this.$root.$emit('bv::show::modal', 'modalQuestion');
    },
    async deleteLog() {
      try {
        await LogService.deleteLog(this.modalQuestion.id);
        await this.loadLogs();
        this.message = null;
      } catch (err) {
        if (err.response && err.response.data.error !== '') {
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
