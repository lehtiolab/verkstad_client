<template>
  <li class="task-card">
    <div class="task-color-bar"
         :class="[(data.dayDiff > -1) ? 'bar-red' : (data.dayDiff > -7)
         ? 'bar-yellow' : 'bar-blue']">
    </div>
    <div class="task-body" @click="showTaskDetails">
      <h1>{{ data.machineTask.Task.name }}</h1>
      <div class="task-machine">{{ data.machineTask.Machine.name }}</div>
      <div class="task-latest">
        Latest: {{ data.nextDate.split('T')[0] }}
        ({{ (data.dayDiff &lt; -1)
           ? 'in ' + formatDay(data.dayDiff)
           : ((data.dayDiff &lt; 0)
           ? 'today'
           : formatDay(data.dayDiff) + ' ago') }})
      </div>
    </div>
    <b-button class="check-task"
              :class="[(data.dayDiff > -1)
              ? 'bar-red' : (data.dayDiff > -7)
              ? 'bar-yellow' : 'bar-blue']"
              :disabled="!Boolean($store.state.token)"
              @click="checkTask">
      <font-awesome-icon icon="check-circle"/>
    </b-button>
    <b-button class="dismiss-task"
              :class="[(data.dayDiff > -1)
              ? 'bar-red' : (data.dayDiff > -7)
              ? 'bar-yellow' : 'bar-blue']"
              :disabled="!Boolean($store.state.token)"
              @click="dismissTask">
      <font-awesome-icon icon="times-circle"/>
    </b-button>
  </li>
</template>

<script>
import LogService from '../services/LogService';

export default {
  name: 'Login',
  props: ['data'],
  methods: {
    async checkTask() {
      try {
        await LogService.add({
          status: 'check',
          machineTaskId: this.data.machineTask.id,
          comment: '',
        });
        this.$emit('machineTaskChecked');
      } catch (err) {
        // console.log(err);
      }
    },
    dismissTask() {
      this.$router.push({
        name: 'workonmachinetask',
        params: {
          mode: 'dismiss',
          machineTaskId: this.data.machineTask.id,
        },
      });
    },
    showTaskDetails() {
      this.$router.push({
        name: 'taskdetails',
        params: {
          taskId: this.data.machineTask.Task.id,
        },
      });
    },
    formatDay(days) {
      const rounded = Math.abs(Math.ceil(days));
      if (rounded > 1) {
        return `${rounded} days`;
      }
      return `${rounded} day`;
    },
  },
};
</script>

<style scoped>
li.task-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 5.5rem;
  margin: 0 2% 2% 0;
}

.task-color-bar {
  width: 10%;
  max-width: 30px;
  height: 100%;
  border-radius: 5px 0 0 5px;
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
  padding: 0.6rem;
  background-color: rgb(233, 233, 233);
}

.task-body h1 {
  margin: 0;
  font-family: "Work Sans";
  font-size: 1.3rem;
  font-weight: 400;
}

button {
  width: 17%;
  max-width: 60px;
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 2.2rem;
  border: none;
}

button.dismiss-task {
  border-radius: 0 5px 5px 0;
  background-color: lightcoral;
}

button.check-task {
  border-radius: 0;
  background-color: darkseagreen;
}
</style>
