<template>
  <div class="wrapper">
    <page-title-bar :title="task.name" :showBack="true" v-if="task" />
    <page-title-bar title="Error" showBack="true" v-if="!task" />
    <div class="description"></div>
    <b-alert :show="message === null ? false : true">
      {{ message }}
    </b-alert>
    <table class="task-details-table" v-if="task">
      <tr>
        <td class="row-title">Description</td>
        <td>{{ task.description }}</td>
      </tr>
      <tr>
        <td class="row-title">If not OK</td>
        <td>{{ task.repare }}</td>
      </tr>
      <tr>
        <td class="row-title">First due date</td>
        <td>{{ task.startDate.split('T')[0] }}</td>
      </tr>
      <tr>
        <td class="row-title">Interval</td>
        <td>{{ task.interval + ((task.interval === 1) ? ' day' : ' days')}}</td>
      </tr>
      <tr>
        <td class="row-title">{{ (machineNames.length === 1) ? 'Machine' : 'Machines' }}</td>
        <td>{{ machineNames.join(', ') }}</td>
      </tr>
      <tr>
        <td class="row-title">Created</td>
        <td>{{ task.createdAt.split('T')[0] }}</td>
      </tr>
      <tr>
        <td class="row-title">Created by</td>
        <td>{{ task.User.name }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import PageTitleBar from './PageTitleBar.vue';
import TaskService from '../services/TaskService';

export default {
  name: 'Tasks',
  components: {
    PageTitleBar,
  },
  props: ['taskId'],
  data() {
    return {
      message: null,
      task: null,
      machineNames: [],
    };
  },
  async created() {
    try {
      this.task = (await TaskService.task(this.taskId)).data;
      const names = this.task.MachineTasks.map(
        machineTask => machineTask.Machine.name,
      );
      this.machineNames = names.filter((value, index, self) => self.indexOf(value) === index);
      this.message = null;
    } catch (err) {
      if (err.response && err.response.data.error !== '') {
        this.message = err.response.data.error;
      } else {
        this.message = 'No connection to the server. Please contact an admin.';
      }
    }
  },
};
</script>

<style scoped>
table {
  width: 100%;
  line-height: 2rem;
}

.row-title {
  font-weight: bold;
  vertical-align: top;
}
</style>
