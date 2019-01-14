<template>
  <div>
    <page-title-bar title="Tasks" />
    <b-table class="tasks-table"
             :items="tasks"
             :fields="fields"
             responsive
             v-if="tasks.length > 0">
      <template slot="actions" slot-scope="row">
        <b-button size="sm" @click.stop="deleteTaskRequest(row.item)">
          Delete
        </b-button>
      </template>
    </b-table>
    <b-button class="btn-outlined"
              to="/addtask">
      Add task
    </b-button>

    <b-modal id="modalQuestion" @ok="deleteTask" @hide="resetModal" title="Delete task?">
      <p>Do you really want to delete this task?</p>
      <p>ID: {{ modalQuestion.id }}<br />
         Name: {{ modalQuestion.name }}</p>
    </b-modal>
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
        id: {
          label: 'ID',
          sortable: true,
        },
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
    this.loadTasks();
  },
  methods: {
    async loadTasks() {
      this.tasks = (await TaskService.index()).data;
      console.log(this.tasks);
    },
    deleteTaskRequest(item) {
      this.modalQuestion.id = item.id;
      this.modalQuestion.name = item.name;
      this.$root.$emit('bv::show::modal', 'modalQuestion');
    },
    async deleteTask() {
      try {
        await TaskService.deleteTask({
          id: this.modalQuestion.id,
          name: this.modalQuestion.name,
        });
        await this.loadTasks();
      } catch (err) {
        this.message = err.response.data.error;
      }
    },
    resetModal() {
      this.modalQuestion.name = null;
      this.modalQuestion.name = '';
    },
  },
};
</script>

<style>

</style>
