<template>
  <div class="task-details">
    <page-title-bar :title="task.name" backto="/tasks" v-if="task" />
    <page-title-bar title="Error" backto="/tasks" v-if="!task" />
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
        <td>{{ task.startDate }}</td>
      </tr>
      <tr>
        <td class="row-title">Interval</td>
        <td>{{ task.interval + ((task.interval === 1) ? ' day' : ' days')}}</td>
      </tr>
      <tr>
        <td class="row-title">Machines</td>
        <td>
          <ul class="machine-list">
            <li v-for="machine in task.machines" :key="machine.id">
              {{ machine.name }}
            </li>
          </ul>
        </td>
      </tr>
      <tr>
        <td class="row-title">Created</td>
        <td>{{ task.createdAt }}</td>
      </tr>
      <tr>
        <td class="row-title">Created by</td>
        <td>tba</td>
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
      task: null,
    };
  },
  async mounted() {
    this.task = (await TaskService.task(this.taskId)).data;
  },
};
</script>

<style scoped>
table {
  width: 100%;
  line-height: 2rem;
}

.row-title {
  width: 17%;
  font-weight: bold;
  vertical-align: top;
}

ul.machine-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
