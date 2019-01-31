<template>
  <div class="bar">
    <b-button class="btn-back" :to="{ path: $store.state.route.from.fullPath }" v-if="showBack">
      <font-awesome-icon icon="arrow-alt-circle-left"/>
    </b-button>
    <h1>{{ title }}</h1>
    <div class="date">{{ today }}</div>
  </div>
</template>

<script>
export default {
  name: 'PageTitleBar',
  props: [
    'title',
    'showBack',
  ],
  data() {
    return {
      today: null,
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    };
  },
  created() {
    const d = new Date();
    this.today = [this.days[d.getDay()], d.toISOString().split('T')[0]].join(', ');
  },
};
</script>

<style scoped>
.bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  min-height: 7rem;
  margin: 0;
  padding: 1.6rem 0 0 0;
  font-family: 'Work Sans', sans-serif;
  border-bottom: 0.1rem solid #9dd5f8;
}

.bar h1 {
  font-weight: 200;
  font-size: 4rem;
}

a.btn-back, a.btn-back.btn-secondary.active {
  margin: auto 0;
  font-size: 2.5rem;
  color: #9dd5f8;
  background-color: #fff;
  border: none;
}

.date {
  font-size: 2rem;
  font-weight: 200;
}
</style>
