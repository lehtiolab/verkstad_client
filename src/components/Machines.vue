<template>
  <div>
    <page-title-bar title="Machines" />
    <div class="description"></div>
    <b-alert :show="message === null ? false : true">
      {{ message }}
    </b-alert>
    <b-table class="machines-table"
             :items="machines"
             :fields="fields"
             responsive
             v-if="machines.length > 0">
      <template slot="actions" slot-scope="row">
        <b-button size="sm" class="mr-2 btn-showqc" @click.stop="showQC(row.item)" v-if="false">
          Show QC
        </b-button>
        <b-button size="sm"
                  class="mr-2 btn-delete"
                  v-show="$store.state.token"
                  @click.stop="deleteMachineRequest(row.item)">
          Delete
        </b-button>
      </template>
    </b-table>
    <b-button class="btn-outlined"
              to="/addmachine"
              v-show="$store.state.token">
      Add machine
    </b-button>
    <b-modal id="modalQuestion" @ok="deleteMachine" @hide="resetModal" title="Delete machine?">
      <p>Do you really want to delete this machine?</p>
      <p><strong>{{ modalQuestion.name }}</strong></p>
      <p>Please note: Deleting a machine can lead to tasks
        without machine. Please control your task settings
        after deletion.</p>
    </b-modal>
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
      message: null,
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
        kanteleId: {
          label: 'Kantele ID',
          sortable: true,
        },
        createdAt: {
          label: 'Created',
          sortable: true,
          formatter: (value) => {
            const d = new Date(value);
            return d.toISOString().split('T')[0];
          },
        },
        'User.name': {
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
        name: '',
      },
    };
  },
  async mounted() {
    await this.loadMachines();
  },
  methods: {
    async loadMachines() {
      try {
        this.machines = (await MachineService.index()).data;
        if (this.machines.length === 0) {
          this.message = 'There are no machines.';
        }
      } catch (err) {
        this.message = err.response.data.error;
      }
    },
    deleteMachineRequest(item) {
      this.modalQuestion = {
        id: item.id,
        name: item.name,
      };
      this.$root.$emit('bv::show::modal', 'modalQuestion');
    },
    showQC(item) {
      this.$router.push({
        name: 'machineqc',
        params: {
          machineId: item.id,
        },
      });
    },
    async deleteMachine() {
      try {
        await MachineService.deleteMachine(this.modalQuestion.id);
        await this.loadMachines();
      } catch (err) {
        this.message = err.response.data.error;
      }
    },
    resetModal() {
      this.modalQuestion.name = '';
    },
  },
};
</script>

<style>

</style>
