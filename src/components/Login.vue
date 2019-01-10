<template>
  <div>
    <page-title-bar title="Login" />
    <div class="description">Come in and take care of your mass specs.</div>
    <b-alert :show="loginMessage === null ? false : true">
      {{ loginMessage }}
    </b-alert>
    <b-form @submit="login" @reset="reset" v-if="showForm">
      <b-form-group id="emailLabel"
                    label="eMail address:"
                    label-for="email">
        <b-form-input id="email"
                      type="email"
                      v-model="user.email"
                      required
                      placeholder="Enter eMail">
        </b-form-input>
      </b-form-group>
      <b-form-group id="passwordLabel"
                    label="Password:"
                    label-for="password">
        <b-form-input id="password"
                      type="password"
                      v-model="user.password"
                      required
                      placeholder="Enter password">
        </b-form-input>
      </b-form-group>
      <b-button type="submit" class="btn-outlined">Login</b-button>
      <b-button type="reset" class="btn-outlined">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import PageTitleBar from './PageTitleBar.vue';
import AuthenticationService from '../services/AuthenticationService';

export default {
  name: 'Login',
  components: {
    PageTitleBar,
  },
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      showForm: true,
      loginMessage: null,
    };
  },
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.user.email,
          password: this.user.password,
        });
        this.$store.dispatch('setToken', response.data.token);
        this.$store.dispatch('setUser', response.data.user);
        this.loginMessage = 'Successfully logged in!';
        this.showForm = false;
      } catch (error) {
        this.loginMessage = error.response.data.error;
      }
    },
    reset(evt) {
      evt.preventDefault();
      this.user.email = '';
      this.user.name = '';
      this.user.password = '';
      this.loginMessage = null;
      this.showForm = false;
      this.$nextTick(() => { this.showForm = true; });
    },
  },
};
</script>

<style scoped>
.description {
  margin: 0 0 20px 0;
}

form {
  max-width: 400px;
}
</style>
