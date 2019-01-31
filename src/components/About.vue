<template>
  <div class="wrapper">
    <page-title-bar title="About this app" />
    <div class="description">Verkstad – The mass spec maintenance app.</div>
    <br />
    <p>
      This app was created by Matthias Stahl in the
      <a href="http://lehtiolab.se">Lehtiö laboratory</a>
      at <a href="http://ki.se">Karolinska Institutet</a> in winter 2019.
    </p>
    <br />
    <p>
      Client code: <a href="https://github.com/mtstahl/verkstad_client">github.com/mtstahl/verkstad_client</a>
    </p>
    <p>
      Server code: <a href="https://github.com/mtstahl/verkstad_server">github.com/mtstahl/verkstad_server</a>
    </p>
    <br />
    <p>
      Please note: The server is logging request information from this app.
    </p>
  </div>
</template>

<script>
import PageTitleBar from './PageTitleBar.vue';

export default {
  name: 'About',
  components: {
    PageTitleBar,
  },
};
</script>

<style scoped>
a {
  color: #9dd5f8;
}
</style>
