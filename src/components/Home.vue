<template>
  <div class="task-wrapper">
    <page-title-bar title="Home" />
    <div class="description">Mass spec maintenance for pros. See all due tasks below.</div>
    <b-alert :show="message === null ? false : true">
      {{ message }}
    </b-alert>
    <div class="task-board">
      <div class="task-box">
        <ol class="daily">
          <li v-for="dueTask in orderedDueTasks"
              :key="dueTask.id"
              class="task-card">
            <div class="task-color-bar"
                 :class="[(dueTask.dayDiff > -1) ? 'bar-red' : (dueTask.dayDiff > -7)
                 ? 'bar-yellow' : 'bar-blue']">
            </div>
            <div class="task-body">
              <h1>{{ dueTask.task.name }}</h1>
              <div class="task-machines">{{ formatMachines(dueTask.task.machines) }}</div>
              <div class="task-latest">Latest: {{ dueTask.nextDate.split('T')[0] }}</div>
            </div>
            <b-button class="check-task"
                      :class="[(dueTask.dayDiff > -1) ? 'bar-red' : (dueTask.dayDiff > -7)
                      ? 'bar-yellow' : 'bar-blue']">
              <font-awesome-icon icon="check-circle"/>
            </b-button>
          </li>
        </ol>
      </div>
      <div class="task-box"></div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import PageTitleBar from './PageTitleBar.vue';
import TaskService from '../services/TaskService';

export default {
  name: 'Home',
  components: {
    PageTitleBar,
  },
  data() {
    return {
      message: null,
      dueTasks: null,
    };
  },
  async mounted() {
    try {
      this.dueTasks = (await TaskService.dueTasks()).data.dueTasks;
      // make a task for each machine that appears
    } catch (err) {
      this.message = err.response.data.error;
    }
  },
  computed: {
    orderedDueTasks() {
      return _.orderBy(this.dueTasks, 'dayDiff', 'desc');
    },
  },
  methods: {
    formatMachines(machines) {
      const machineNames = machines.map(element => element.name);
      return machineNames.join(', ');
    },
  },
};
</script>

<style scoped>
.description {
  margin: 0 0 20px 0;
}

.task-board {
  display: flex;
  width: 100%;
}

.task-box {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
}

ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

li.task-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 80px;
  margin: 0 10px 10px 0;
}

.task-color-bar {
  width: 6%;
  height: 100%;
  border-radius: 7px 0 0 7px;
}

.bar-red {
  background-color: lightcoral;
}

.bar-yellow {
  background-color: goldenrod;
}

.bar-blue {
  background-color: #9dd5f8;
}

.task-body {
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100%;
  height: 100%;
  padding: 3px;
  background-color: rgba(238, 238, 238, 0.336);
}

.task-body h1 {
  margin: 0;
  font-family: "Work Sans";
  font-size: 1.3rem;
  font-weight: 400;
}

button.check-task {
  width: 12%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 2.2rem;
  border-radius: 0 7px 7px 0;
  border: none;
}
</style>
