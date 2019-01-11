<template>
  <div>
    <page-title-bar title="Users" />
    <b-table class="user-table"
             :items="users"
             :fields="fields"
             responsive
             v-if="users.length > 0">
    </b-table>
    <b-button class="btn-outlined"
              to="/login"
              v-if="!$store.state.isUserLoggedIn">
      Login
    </b-button>
    <b-button class="btn-outlined"
              to="/signup">
      Add user
    </b-button>
  </div>
</template>

<script>
import PageTitleBar from './PageTitleBar.vue';
import AuthenticationService from '../services/AuthenticationService';

export default {
  name: 'Users',
  components: {
    PageTitleBar,
  },
  data() {
    return {
      users: [],
      fields: {
        name: {
          label: 'Name',
          sortable: true,
        },
        email: {
          label: 'eMail',
        },
        createdAt: {
          label: 'Created',
          sortable: true,
          formatter: (value) => {
            const d = new Date(value);
            return [
              d.getFullYear(),
              ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1),
              (d.getDate() < 10 ? '0' : '') + d.getDate(),
            ].join('-');
          },
        },
      },
    };
  },
  async mounted() {
    this.users = (await AuthenticationService.index()).data;
  },
};
</script>

<style>

</style>