<template>
  <div>
    <page-title-bar title="Add machine" :showBack="true" v-if="machineId === 'add'" />
    <page-title-bar :title="machine.name" :showBack="true" v-if="machineId !== 'add'"/>
    <div class="description" v-if="machineId === 'add'">Register a new mass spectrometer.</div>
    <div class="description" v-else>Edit the mass spectrometer.</div>
    <b-alert :show="message === null ? false : true">
      {{ message }}
    </b-alert>
    <b-form @submit="addEditMachine" @reset="reset" autocomplete="off" v-if="showForm">
      <b-form-group id="nameLabel"
                    label="Name:"
                    label-for="name">
        <b-form-input id="name"
                      type="text"
                      v-model="machine.name"
                      required
                      placeholder="Enter name">
        </b-form-input>
      </b-form-group>
      <b-form-group id="typeLabel"
                    label="Type:"
                    label-for="type">
        <b-form-input id="type"
                      v-model="machine.type"
                      placeholder="Enter type">
        </b-form-input>
      </b-form-group>
      <b-form-group id="kanteleIdLabel"
                    label="Kantele ID:"
                    label-for="kanteleId"
                    description="Pleas ask your local admin.">
        <b-form-input id="kanteleId"
                      v-model="machine.kanteleId"
                      placeholder="Enter Kantele ID">
        </b-form-input>
      </b-form-group>
      <b-button type="submit" class="btn-outlined" v-if="machineId === 'add'">
        Add machine
      </b-button>
      <b-button type="submit" class="btn-outlined" v-if="machineId !== 'add'">
        Save changes
      </b-button>
      <b-button type="reset" class="btn-outlined">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import PageTitleBar from './PageTitleBar.vue';
import MachineService from '../services/MachineService';

export default {
  name: 'AddEditMachine',
  components: {
    PageTitleBar,
  },
  props: ['machineId'],
  data() {
    return {
      machine: {
        name: '',
        type: '',
        kanteleId: null,
      },
      showForm: true,
      message: null,
    };
  },
  async mounted() {
    if (this.machineId !== 'add') {
      this.machine = (await MachineService.machine(this.machineId)).data;
    }
  },
  methods: {
    async addEditMachine() {
      try {
        if (this.machineId === 'add') {
          await MachineService.add(this.machine);
        } else {
          await MachineService.update(this.machine);
        }
        this.$router.push({
          path: '/machines',
        });
      } catch (err) {
        this.message = err.response.data.error;
      }
    },
    reset(evt) {
      evt.preventDefault();
      this.machine.name = '';
      this.machine.type = '';
      this.message = null;
      this.showForm = false;
      this.$nextTick(() => { this.showForm = true; });
    },
  },
};
</script>

<style scoped>
form {
  max-width: 400px;
}
</style>
