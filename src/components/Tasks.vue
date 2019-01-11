<template>
  <div>
    <page-title-bar title="Tasks" />
    <b-table class="tasks-table"
             :items="tasks"
             :fields="fields"
             responsive
             v-if="tasks.length > 0">
    </b-table>
    <b-button class="btn-outlined"
              to="/addtask">
      Add task
    </b-button>
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
  data() {
    return {
      tasks: [],
      fields: {
        name: {
          label: 'Name',
          sortable: true,
        },
        description: {
          label: 'Description',
        },
        interval: {
          label: 'Interval',
          sortable: true,
          formatter: (value) => {
            const suffix = value === 1 ? ' day' : ' days';
            return value.toString() + suffix;
          },
        },
        createdAt: {
          label: 'Created',
          sortable: true,
          formatter: (value) => {
            const d = new Date(value);
            return [
              d.getFullYear(),
              ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1),
              (d.getDate() < 10 ? '0' : '') + d.getDate(),
            ].join('-');
          },
        },
      },
    };
  },
  async mounted() {
    this.tasks = (await TaskService.index()).data;
  },
};
</script>

<style>

</style>
