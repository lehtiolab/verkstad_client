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
          <li v-for="dueMachineTask in orderedDueMachineTasks"
              :key="dueMachineTask.id"
              class="task-card"
              @click="showTaskDetails(dueMachineTask)">
            <div class="task-color-bar"
                 :class="[(dueMachineTask.dayDiff > -1) ? 'bar-red' : (dueMachineTask.dayDiff > -7)
                 ? 'bar-yellow' : 'bar-blue']">
            </div>
            <div class="task-body">
              <h1>{{ dueMachineTask.machineTask.Task.name }}</h1>
              <div class="task-machine">{{ dueMachineTask.machineTask.Machine.name }}</div>
              <div class="task-latest">Latest: {{ dueMachineTask.nextDate.split('T')[0] }}</div>
            </div>
            <b-button class="dismiss-task"
                      :class="[(dueMachineTask.dayDiff > -1)
                      ? 'bar-red' : (dueMachineTask.dayDiff > -7)
                      ? 'bar-yellow' : 'bar-blue']">
              <font-awesome-icon icon="times-circle"/>
            </b-button>
            <b-button class="check-task"
                      :class="[(dueMachineTask.dayDiff > -1)
                      ? 'bar-red' : (dueMachineTask.dayDiff > -7)
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
      dueMachineTasks: null,
    };
  },
  async mounted() {
    try {
      this.dueMachineTasks = (await TaskService.dueMachineTasks()).data.machineTasks;
    } catch (err) {
      this.message = err.response.data.error;
    }
  },
  computed: {
    orderedDueMachineTasks() {
      return _.orderBy(this.dueMachineTasks, 'dayDiff', 'desc');
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
  width: 35px;
  height: 100%;
  border-radius: 7px 0 0 7px;
}

.bar-red {
  background-color: lightcoral;
}

.bar-yellow {
  background-color: darkkhaki;
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
  padding: 5px 10px;
  background-color: rgb(233, 233, 233);
}

.task-body h1 {
  margin: 0;
  font-family: "Work Sans";
  font-size: 1.3rem;
  font-weight: 400;
}

button.dismiss-task {
  width: 60px;
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 2.2rem;
  border: none;
  border-radius: 0;
  background-color: lightcoral;
}

button.check-task {
  width: 60px;
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 2.2rem;
  border-radius: 0 7px 7px 0;
  border: none;
  background-color: darkseagreen;
}
</style>
