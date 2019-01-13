<template>
  <div>
    <page-title-bar title="Users" />
    <b-alert :show="message === null ? false : true">
      {{ message }}
    </b-alert>
    <b-table class="user-table"
             :items="users"
             :fields="fields"
             responsive
             v-if="users.length > 0">
      <template slot="actions" slot-scope="row">
        <b-button size="sm" @click.stop="deleteUserRequest(row.item)">
          Delete
        </b-button>
      </template>
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

    <b-modal id="modalQuestion" @ok="deleteUser" @hide="resetModal" title="Delete user?">
      <p>Do you really want to delete this user?</p>
      <p>{{ modalQuestion.userName }}<br />
         {{ modalQuestion.userEMail }}</p>
    </b-modal>
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
      message: null,
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
        actions: {
          label: '',
          sortable: false,
        },
      },
      modalQuestion: {
        userName: '',
        userEMail: '',
      },
    };
  },
  async mounted() {
    this.users = (await AuthenticationService.index()).data;
  },
  methods: {
    deleteUserRequest(item) {
      this.modalQuestion.userName = item.name;
      this.modalQuestion.userEMail = item.email;
      this.$root.$emit('bv::show::modal', 'modalQuestion');
    },
    async deleteUser() {
      try {
        await AuthenticationService.deleteUser({
          email: this.modalQuestion.userEMail,
        });
        if (this.modalQuestion.userEMail === this.$store.state.user.email) this.logout();
        this.message = 'User deletion was successful.';
      } catch (err) {
        this.message = 'An error occured while deleting a user.';
      }
    },
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
    },
    resetModal() {
      this.modalQuestion.userName = '';
      this.modalQuestion.userEMail = '';
    },
  },
};
</script>

<style>

</style>
