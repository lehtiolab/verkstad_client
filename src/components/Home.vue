<template>
  <div class="task-wrapper">
    <page-title-bar title="Home" />
    <div class="description"></div>
    <b-alert :show="message === null ? false : true">
      {{ message }}
    </b-alert>
    <div class="task-board" v-if="machineTasksAvailable">
      <div class="task-box">
        <h5>Latest today</h5>
        <ol class="latest-today">
          <machine-task-card v-for="dueMachineTask in orderedDueMachineTasks.today"
                             :key="dueMachineTask.id"
                             class="task-card"
                             :data="dueMachineTask">
          </machine-task-card>
        </ol>
      </div>
      <div class="task-box">
        <h5>Upcoming</h5>
        <ol class="upcoming">
          <machine-task-card v-for="dueMachineTask in orderedDueMachineTasks.upcoming"
                             :key="dueMachineTask.id"
                             class="task-card"
                             :data="dueMachineTask">
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
import MachineTaskService from '../services/MachineTaskService';

export default {
  name: 'Home',
  components: {
    PageTitleBar,
    MachineTaskCard,
  },
  data() {
    return {
      message: null,
      machineTasksAvailable: false,
      dueMachineTasks: {
        today: null,
        upcoming: null,
      },
      reloadInterval: 60000, // 1 min
    };
  },
  async mounted() {
    await this.loadMachineTasks();
    setInterval(async () => {
      await this.loadMachineTasks();
    }, this.reloadInterval);
  },
  beforeDestroy() {
    clearInterval();
  },
  methods: {
    async loadMachineTasks() {
      try {
        const dueMachineTasks = (await MachineTaskService.index()).data.machineTasks;
        if (dueMachineTasks.length === 0) {
          this.machineTasksAvailable = false;
          this.message = 'There are no upcoming tasks. '
                          + 'Please define new tasks.';
        } else {
          this.dueMachineTasks.today = dueMachineTasks.filter(
            machineTask => machineTask.dayDiff >= -1,
          );
          this.dueMachineTasks.upcoming = dueMachineTasks.filter(
            machineTask => machineTask.dayDiff < -1,
          );
          this.machineTasksAvailable = true;
        }
      } catch (err) {
        this.message = err.response.data.error;
      }
    },
  },
  computed: {
    orderedDueMachineTasks() {
      return {
        today: _.orderBy(this.dueMachineTasks.today, 'dayDiff', 'desc'),
        upcoming: _.orderBy(this.dueMachineTasks.upcoming, 'dayDiff', 'desc'),
      };
    },
  },
};
</script>

<style scoped>
.task-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
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
