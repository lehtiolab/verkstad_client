<template>
  <div>
    <page-title-bar title="Add machine" />
    <div class="description">Register a new mass spectrometer.</div>
    <b-alert :show="message === null ? false : true">
      {{ message }}
    </b-alert>
    <b-form @submit="addMachine" @reset="reset" autocomplete="off" v-if="showForm">
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
      <b-button type="submit" class="btn-outlined">Add machine</b-button>
      <b-button type="reset" class="btn-outlined">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import PageTitleBar from './PageTitleBar.vue';
import MachineService from '../services/MachineService';

export default {
  name: 'AddMachine',
  components: {
    PageTitleBar,
  },
  data() {
    return {
      machine: {
        name: '',
        type: '',
      },
      showForm: true,
      message: null,
    };
  },
  methods: {
    async addMachine() {
      try {
        await MachineService.add({
          name: this.machine.name,
          type: this.machine.type,
        });
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
.description {
  margin: 0 0 20px 0;
}

form {
  max-width: 400px;
}
</style>
