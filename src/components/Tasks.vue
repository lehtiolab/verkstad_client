<template>
  <div class="wrapper">
    <page-title-bar title="Tasks" />
    <div class="description"></div>
    <b-alert :show="message === null ? false : true">
      {{ message }}
    </b-alert>
    <b-table class="tasks-table"
             :items="tasks"
             :fields="fields"
             responsive
             v-if="tasks.length > 0">
      <template slot="actions" slot-scope="row">
        <b-button size="sm"
                  class="mr-2 btn-details"
                  @click.stop="showEdit(row.item)"
                  v-show="$store.state.token">
          Edit
        </b-button>
        <b-button size="sm"
                  class="mr-2 btn-delete"
                  @click.stop="deleteTaskRequest(row.item)"
                  v-show="$store.state.token">
          Delete
        </b-button>
      </template>
    </b-table>
    <b-button class="btn-outlined"
              to="/addedittask/add"
              v-show="$store.state.token">
      Add task
    </b-button>

    <b-modal id="modalQuestion" @ok="deleteTask" title="Delete task?">
      <p>Do you really want to delete this task?</p>
      <p><strong>{{ modalQuestion.name }}</strong></p>
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
      message: null,
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
  async created() {
    await this.loadTasks();
  },
  methods: {
    async loadTasks() {
      try {
        this.tasks = (await TaskService.index()).data;
        if (this.tasks.length === 0) {
          this.message = 'There are no tasks.';
        } else {
          this.message = null;
        }
      } catch (err) {
        if (err.response && err.response.data.error !== '') {
          this.message = err.response.data.error;
        } else {
          this.message = 'No connection to the server. Please contact an admin.';
        }
      }
    },
    deleteTaskRequest(item) {
      this.modalQuestion.id = item.id;
      this.modalQuestion.name = item.name;
      this.$root.$emit('bv::show::modal', 'modalQuestion');
    },
    async deleteTask() {
      try {
        await TaskService.deleteTask(this.modalQuestion.id);
        await this.loadTasks();
        this.message = null;
      } catch (err) {
        if (err.response && err.response.data.error !== '') {
          this.message = err.response.data.error;
        } else {
          this.message = 'No connection to the server. Please contact an admin.';
        }
      }
    },
    showEdit(item) {
      this.$router.push({
        name: 'addedittask',
        params: {
          taskId: item.id,
        },
      });
    },
  },
};
</script>

<style scoped>
</style>
