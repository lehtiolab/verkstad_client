<template>
  <div class="wrapper">
    <page-title-bar title="Add task" :showBack="true" v-if="taskId === 'add'" />
    <page-title-bar :title="task.name" :showBack="true" v-if="taskId !== 'add'" />
    <div class="description" v-if="taskId === 'add'">Create a new maintenance task.</div>
    <div class="description" v-else>Edit a maintenance task.</div>
    <b-alert :show="message === null ? false : true">
      {{ message }}
    </b-alert>
    <b-form @submit.prevent="addEditTask" @reset.prevent="reset" autocomplete="off" v-if="showForm">
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
                    label-for="machines"
                    :description="(taskId !== 'add')
                      ? 'Changing the machine selection will rearrange tasks.'
                      : ''">
        <b-form-select id="machines"
                       v-model="machineIds"
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
                    label-for="start"
                    description="If the start date is during a weekend,
                      the task is postponed to the next Monday instead.">
        <b-form-input id="start"
                      ref="start"
                      type="date"
                      v-model="task.startDate">
        </b-form-input>
      </b-form-group>
      <b-form-group id="intervalLabel"
                    label="Interval:"
                    label-for="interval"
                    description="If the interval leads to a due date during a weekend,
                      the task is postponed to the next Monday instead.">
        <b-form-input id="interval"
                      type="number"
                      v-model="task.interval"
                      placeholder="in days">
        </b-form-input>
      </b-form-group>
      <b-button type="submit" class="btn-outlined">
        {{ (taskId === 'add') ? 'Add task' : 'Save changes' }}
      </b-button>
      <b-button type="reset" class="btn-outlined">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import PageTitleBar from './PageTitleBar.vue';
import TaskService from '../services/TaskService';
import MachineService from '../services/MachineService';

export default {
  name: 'AddEditTask',
  components: {
    PageTitleBar,
  },
  props: ['taskId'],
  data() {
    return {
      task: {
        name: '',
        description: '',
        repare: '',
        startDate: '',
        interval: '',
      },
      machineIds: [],
      machines: [],
      selectedMachines: [],
      showForm: true,
      message: null,
    };
  },
  async created() {
    const machines = (await MachineService.index()).data;
    if (machines.length === 0) {
      this.message = 'First you have to define a mass spec in the machines tab.';
      this.showForm = false;
    }

    this.machines = machines.map(element => ({
      value: element.id,
      text: element.name,
    }));

    if (this.taskId !== 'add') {
      const task = (await TaskService.task(this.taskId)).data;
      this.task = {
        ...task,
        startDate: task.startDate.split('T')[0],
      };

      this.machineIds = this.task.MachineTasks.map(
        machineTask => machineTask.Machine.id,
      );
    }
  },
  methods: {
    async addEditTask() {
      try {
        if (this.taskId === 'add') {
          await TaskService.add({
            task: this.task,
            machineIds: this.machineIds,
          });
        } else {
          await TaskService.update({
            task: {
              id: this.taskId,
              ...this.task,
            },
            machineIds: this.machineIds,
          });
        }
        this.message = null;
        this.$router.push({
          path: '/tasks',
        });
      } catch (err) {
        if (err.response && err.response.data.error !== '') {
          this.message = err.response.data.error;
        } else {
          this.message = 'No connection to the server. Please contact an admin.';
        }
      }
    },
    reset() {
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
</style>
