<template>
  <div>
    <page-title-bar title="Add task" />
    <div class="description">Create a new maintenance task.</div>
    <b-alert :show="message === null ? false : true">
      {{ message }}
    </b-alert>
    <b-form @submit="addTask" @reset="reset" autocomplete="off" v-if="showForm">
      <b-form-group id="nameLabel"
                    label="Name:"
                    label-for="name">
        <b-form-input id="name"
                      type="text"
                      v-model="task.name"
                      placeholder="Must be unique"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="descriptionLabel"
                    label="Description:"
                    label-for="description">
        <b-form-input id="description"
                      v-model="task.description"
                      placeholder="What is the actual task?">
        </b-form-input>
      </b-form-group>
      <b-form-group id="machineLabel"
                    label="Select machines:"
                    label-for="machines">
        <b-form-select id="machines"
                       v-model="task.machineIds"
                       :options="machines"
                       multiple>
        </b-form-select>
      </b-form-group>
      <b-form-group id="repareLabel"
                    label="If not OK:"
                    label-for="repare">
        <b-form-input id="repare"
                      v-model="task.repare"
                      placeholder="What to do?">
        </b-form-input>
      </b-form-group>
      <b-form-group id="startLabel"
                    label="Start date:"
                    label-for="start">
        <b-form-input id="start"
                      type="date"
                      v-model="task.start">
        </b-form-input>
      </b-form-group>
      <b-form-group id="intervalLabel"
                    label="Interval:"
                    label-for="interval">
        <b-form-input id="interval"
                      type="number"
                      v-model="task.interval"
                      placeholder="in days">
        </b-form-input>
      </b-form-group>
      <b-button type="submit" class="btn-outlined">Add task</b-button>
      <b-button type="reset" class="btn-outlined">Reset</b-button>
    </b-form>
    <b-button class="btn-outlined"
              to="/addmachine"
              v-if="!showForm">
      Add machine
    </b-button>
  </div>
</template>

<script>
import PageTitleBar from './PageTitleBar.vue';
import TaskService from '../services/TaskService';
import MachineService from '../services/MachineService';

export default {
  name: 'AddTask',
  components: {
    PageTitleBar,
  },
  data() {
    return {
      task: {
        name: '',
        description: '',
        machineIds: [],
        repare: '',
        start: '',
        interval: '',
      },
      machines: [],
      showForm: true,
      message: null,
    };
  },
  async mounted() {
    const machines = (await MachineService.index()).data;

    if (machines.length === 0) {
      this.message = 'First you have to define a mass spec in the machines tab.';
      this.showForm = false;
    }

    this.machines = machines.map(element => ({
      value: element.id,
      text: element.name,
    }));
  },
  methods: {
    async addTask() {
      try {
        await TaskService.add({
          name: this.task.name,
          description: this.task.description,
          machineIds: this.task.machineIds,
          repare: this.task.repare,
          start: this.task.start,
          interval: this.task.interval,
        });
        this.$router.push({
          path: '/tasks',
        });
      } catch (err) {
        this.message = err.response.data.error;
      }
    },
    reset(evt) {
      evt.preventDefault();
      this.task.name = '';
      this.task.description = '';
      this.task.machineId = null;
      this.task.repare = '';
      this.task.start = '';
      this.task.interval = '';
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
  max-width: 600px;
}
</style>
