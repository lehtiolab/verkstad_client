<template>
  <div class="bar">
    <h1>{{ title }}</h1>
    <div class="date">{{ today }}</div>
  </div>
</template>

<script>
export default {
  name: 'PageTitleBar',
  props: [
    'title',
  ],
  data() {
    return {
      today: null,
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    };
  },
  mounted() {
    const d = new Date();
    const dFormatted = [
      d.getFullYear(),
      ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1),
      (d.getDate() < 10 ? '0' : '') + d.getDate(),
    ].join('-');
    this.today = [this.days[d.getDay()], dFormatted].join(', ');
  },
};
</script>

<style scoped>

.bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  margin: 0 0 20px 0;
  border-bottom: 3px solid #9dd5f8;
}

.bar h1 {
  font-family: 'Work Sans', sans-serif;
  font-size: 4rem;
}

.date {
  font-family: 'Work Sans', sans-serif;
  font-size: 2rem;
}
</style>
