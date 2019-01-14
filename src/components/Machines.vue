<template>
  <div>
    <page-title-bar title="Machines" />
    <b-table class="machines-table"
             :items="machines"
             :fields="fields"
             responsive
             v-if="machines.length > 0">
      <template slot="actions" slot-scope="row">
        <b-button size="sm" class="mr-2 btn-delete" @click.stop="deleteMachineRequest(row.item)">
          Delete
        </b-button>
      </template>
    </b-table>
    <b-button class="btn-outlined"
              to="/addmachine">
      Add machine
    </b-button>

    <b-modal id="modalQuestion" @ok="deleteMachine" @hide="resetModal" title="Delete machine?">
      <p>Do you really want to delete this machine?</p>
      <p>{{ modalQuestion.name }}</p>
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
            return d.toISOString().split('T')[0];
          },
        },
        actions: {
          label: '',
          sortable: false,
        },
      },
      modalQuestion: {
        name: '',
      },
    };
  },
  async mounted() {
    await this.loadMachines();
  },
  methods: {
    async loadMachines() {
      this.machines = (await MachineService.index()).data;
    },
    deleteMachineRequest(item) {
      this.modalQuestion.name = item.name;
      this.$root.$emit('bv::show::modal', 'modalQuestion');
    },
    async deleteMachine() {
      try {
        await MachineService.deleteMachine({
          name: this.modalQuestion.name,
        });
        await this.loadMachines();
        this.message = 'Machine deletion was successful.';
      } catch (err) {
        console.log(err);
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
