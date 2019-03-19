<template>
  <div class="wrapper">
    <page-title-bar title="Users" />
    <div class="description"></div>
    <b-alert :show="message === null ? false : true">
      {{ message }}
    </b-alert>
    <b-table class="user-table"
             :items="users"
             :fields="fields"
             responsive
             v-if="users.length > 0">
      <template slot="actions" slot-scope="row">
        <b-button size="sm"
                  class="mr-2 btn-delete"
                  @click.stop="deleteUserRequest(row.item)"
                  v-show="$store.state.token">
          Delete
        </b-button>
      </template>
    </b-table>
    <b-button class="btn-outlined"
              to="/login"
              v-if="!$store.state.user && this.users.length > 0">
      Login
    </b-button>
    <b-button class="btn-outlined"
              to="/signup">
      Add user
    </b-button>

    <b-modal id="modalQuestion" @ok="deleteUser" title="Delete user?">
      <p>Do you really want to kick out this user?</p>
      <p><strong>{{ modalQuestion.userName }}<br />
         {{ modalQuestion.userEMail }}</strong></p>
      <p style="color: crimson; font-weight: bold"
         v-if="$store.state.user"
         v-show="$store.state.user.email === modalQuestion.userEMail">
        Warning: You are going to delete yourself. If you continue,
        you will be logged out automatically.
      </p>
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
            return d.toISOString().split('T')[0];
          },
        },
        actions: {
          label: '',
          sortable: false,
        },
      },
      modalQuestion: {
        userId: null,
        userName: '',
        userEMail: '',
      },
    };
  },
  async created() {
    await this.loadUsers();
  },
  methods: {
    async loadUsers() {
      try {
        this.users = (await AuthenticationService.index()).data;
        if (this.users.length === 0) {
          this.message = 'There are no users registered.';
        } else {
          this.message = null;
        }
      } catch (err) {
        if (err.response && err.response.data.error !== '') {
          this.message = err.response.data.error;
        } else {
          this.message = 'No connection to the server. Please contact an admin.';
        }
      }
    },
    deleteUserRequest(item) {
      this.modalQuestion.userId = item.id;
      this.modalQuestion.userName = item.name;
      this.modalQuestion.userEMail = item.email;
      this.$root.$emit('bv::show::modal', 'modalQuestion');
    },
    async deleteUser() {
      try {
        await AuthenticationService.deleteUser(this.modalQuestion.userId);
        if (this.$store.state.user
            && (this.modalQuestion.userEMail === this.$store.state.user.email)) {
          this.logout();
        }
        this.loadUsers();
        this.message = null;
      } catch (err) {
        if (err.response && err.response.data.error !== '') {
          this.message = err.response.data.error;
        } else {
          this.message = 'No connection to the server. Please contact an admin.';
        }
      }
    },
    logout() {
      this.$store.dispatch('logout');
    },
  },
};
</script>

<style scoped>
</style>
