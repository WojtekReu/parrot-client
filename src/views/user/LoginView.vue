<template>
  <p>Login page</p>
  <div>

    <div v-if="data">data: {{ data.body }}</div>
    <form @submit="loginAction">
      <div>
        <label for="username">username:</label>
        <input type="text" name="username" v-model="form.username">
      </div>
      <div>
        <label for="password">password:</label>
        <input type="password" name="password" v-model="form.password">
      </div>
      <div>
        <input type="submit" value="login">
        <input type="button" value="logout" @click="logoutAction">
      </div>
    </form>
    <div v-if="message">Message: {{ message }}</div>
    <div v-if="error">Error: {{ error }}</div>
    <div v-if="user">User:{{ user.id }} {{ user.username }} {{ user.first_name }} {{ user.last_name }}</div>
  </div>
</template>

<script>

export default {
  name: 'LoginView',
  data () {
    return {
      data: "",
      error: "",
      form: {
        username: "",
        password: "",
      },
      message: "",
      user: null,
    }
  },
  methods: {
    loginAction(submitEvent) {
      submitEvent.preventDefault()
      fetch(
        `${process.env.VUE_APP_API_URL}/login`,
        {
          method: "POST",
          headers: {"Content-Type": "application/x-www-form-urlencoded"},
          body: `username=${this.form.username}&password=${this.form.password}`,
          credentials: "include",
        }
      )
      .then(response => response.json())
      .then(data => {
        this.message = data
        this.getLoggedUser()
      })
      .catch(err => this.error = err.message)
    },
    getLoggedUser() {
      fetch(
        `${process.env.VUE_APP_API_URL}/users/users/whoami`,
        {
          credentials: "include",
        }
      )
      .then(response => response.json())
      .then(data => this.user = data)
      .catch(err => this.error = err.message)
    },
    logoutAction() {
      fetch(
      `${process.env.VUE_APP_API_URL}/logout`,
        {
          method: "POST",
          headers: {"Content-Type": "application/x-www-form-urlencoded"},
          credentials: "include",
        }
      )
      .then(response => response.json())
      .then(data => this.message = data)
      .catch(err => this.error = err.message)
      this.user = null
    }
  }
}
</script>