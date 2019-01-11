<template>
  <div>
    <page-title-bar title="Sign up" />
    <div class="description">Register a new user for this app by submitting the form below.</div>
    <b-alert :show="signUpMessage === null ? false : true">
      {{ signUpMessage }}
    </b-alert>
    <b-form @submit="signUp" @reset="reset" autocomplete="off" v-if="showForm">
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
      <b-form-group id="nameLabel"
                    label="Name:"
                    label-for="name">
        <b-form-input id="name"
                      type="text"
                      v-model="user.name"
                      required
                      placeholder="Enter name">
        </b-form-input>
      </b-form-group>
      <b-form-group id="passwordLabel"
                    label="Password:"
                    label-for="password">
        <b-form-input id="password"
                      type="password"
                      v-model="user.password"
                      required
                      placeholder="Enter password (>3 characters)">
        </b-form-input>
      </b-form-group>
      <b-button type="submit" class="btn-outlined">Sign up</b-button>
      <b-button type="reset" class="btn-outlined">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import PageTitleBar from './PageTitleBar.vue';
import AuthenticationService from '../services/AuthenticationService';

export default {
  name: 'Signup',
  components: {
    PageTitleBar,
  },
  data() {
    return {
      user: {
        email: '',
        name: '',
        password: '',
      },
      showForm: true,
      signUpMessage: null,
    };
  },
  methods: {
    async signUp() {
      try {
        await AuthenticationService.signUp({
          email: this.user.email,
          name: this.user.name,
          password: this.user.password,
        });
        this.signUpMessage = 'Successfully signed up!';
        this.showForm = false;
      } catch (error) {
        this.signUpMessage = error.response.data.error;
      }
    },
    reset(evt) {
      evt.preventDefault();
      this.user.email = '';
      this.user.name = '';
      this.user.password = '';
      this.signUpMessage = null;
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
