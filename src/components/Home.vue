<template>
  <div class="task-wrapper">
    <page-title-bar title="Home" />
    <div class="description"></div>
    <b-alert :show="message === null ? false : true">
      {{ message }}
    </b-alert>
    <div class="task-board">
      <div class="task-box">
        <h5>Latest today</h5>
        <ol class="latest-today">
          <machine-task-card v-for="dueMachineTask in orderedDueMachineTasks.today"
                             :key="dueMachineTask.id"
                             class="task-card"
                             :data="dueMachineTask"
                             @click="showTaskDetails(dueMachineTask)">
          </machine-task-card>
        </ol>
      </div>
      <div class="task-box">
        <h5>Upcoming</h5>
        <ol class="upcoming">
          <machine-task-card v-for="dueMachineTask in orderedDueMachineTasks.upcoming"
                             :key="dueMachineTask.id"
                             class="task-card"
                             :data="dueMachineTask"
                             @click="showTaskDetails(dueMachineTask)">
          </machine-task-card>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import PageTitleBar from './PageTitleBar.vue';
import MachineTaskCard from './MachineTaskCard.vue';
import TaskService from '../services/TaskService';

export default {
  name: 'Home',
  components: {
    PageTitleBar,
    MachineTaskCard,
  },
  data() {
    return {
      message: null,
      dueMachineTasks: {
        today: null,
        upcoming: null,
      },
    };
  },
  async mounted() {
    try {
      const dueMachineTasks = (await TaskService.dueMachineTasks()).data.machineTasks;
      this.dueMachineTasks.today = dueMachineTasks.filter(
        machineTask => machineTask.dayDiff >= -1,
      );
      this.dueMachineTasks.upcoming = dueMachineTasks.filter(
        machineTask => machineTask.dayDiff < -1,
      );
    } catch (err) {
      this.message = err.response.data.error;
    }
  },
  computed: {
    orderedDueMachineTasks() {
      return {
        today: _.orderBy(this.dueMachineTasks.today, 'dayDiff', 'desc'),
        upcoming: _.orderBy(this.dueMachineTasks.upcoming, 'dayDiff', 'desc'),
      };
    },
  },
  methods: {
    showTaskDetails(item) {
      this.$router.push({
        name: 'taskdetails',
        params: {
          taskId: item.machineTask.Task.id,
        },
      });
    },
    checkTask() {},
  },
};
</script>

<style scoped>
.task-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.description {
  margin: 0 0 20px 0;
}

.task-board {
  display: flex;
  justify-content: space-between;
  height: 100%;
}

.task-box {
  display: flex;
  flex-direction: column;
  width: 49%;
  height: 100%;
}

.task-box h5 {
  font-family: "Work Sans", sans-serif;
  font-size: 1.8rem;
  font-weight: 200;
}

ol {
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow-y: scroll;
}
</style>
