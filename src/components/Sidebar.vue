<template>
  <b-nav class="sidebar" type="dark">
    <div class="navbar-header">
      <b-navbar-brand class="logo-wrapper" to="/">
        <font-awesome-icon icon="oil-can"/>
      </b-navbar-brand>
      <h6 class="subtitle">Mass Spectrometer Maintenance</h6>
    </div>
    <div class="navbar-body">
      <b-nav-item to="/signup">Sign up</b-nav-item>
    </div>
    <div class="navbar-footer">
      <b-nav-text>Lehtiö Lab 2019</b-nav-text>
    </div>
  </b-nav>
</template>

<script>
export default {};
</script>

<style scoped>
.sidebar {
  display: flex;
  align-items: flex-start;
  min-width: 250px;
  max-width: 250px;
  background: #9dd5f8;
  color: #fffcf9;
}

.navbar-header {
  width: 90%;
  margin: 36px auto 0 auto;
  text-align: center;
}

.navbar-header a {
  color: #fffcf9;
}

.logo-wrapper {
  width: 140px;
  height: 140px;
  margin-left: 12px;
  font-size: 5rem;
  border: 5px solid #fffcf9;
  border-radius: 50%;
}

.subtitle {
  margin-top: 10px;
  font-size: 1.2rem;
}

.navbar-body {
  width: 90%;
  margin: auto;
  text-align: center;
}

.navbar-footer {
  align-self: flex-end;
  width: 90%;
  height: 50px;
  margin: 0 auto 0 auto;
  font-size: .8rem;
  text-align: center;
}
</style>
