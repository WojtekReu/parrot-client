<template>
  <div class="content-medium">
    <h1>Login page</h1>
    <form @submit="loginAction">
      <div class="form-row">
        <label for="username" class="form-label mt-4 required">username</label>
        <input type="text" name="username" v-model="form.username" class="form-control">
      </div>
      <div class="form-row">
        <label for="password" class="form-label mt-4 required">password</label>
        <input type="password" name="password" v-model="form.password" class="form-control">
      </div>
      <div v-if="error" class="invalid-feedback" style="display: block;">
        {{ error }}
      </div>
      <div class="d-grid gap-2 mt-4">
        <input type="submit" value="login" class="btn btn-primary">
      </div>
    </form>
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
      user: null,
    }
  },
  methods: {
    loginAction(submitEvent) {
      submitEvent.preventDefault()
      this.error = ""
      fetch(
        `${process.env.VUE_APP_API_URL}/login`,
        {
          method: "POST",
          headers: {"Content-Type": "application/x-www-form-urlencoded"},
          body: `username=${this.form.username}&password=${this.form.password}`,
          credentials: "include",
        }
      )
      .then(response => response.json().then(data => ({status: response.status, body: data})))
      .then(obj => {
        if (obj.status !== 200) {
          this.error = obj.body.detail
        } else {
          window.location = "/account"
        }
      })
      .catch(err => this.error = err.message)
    }
  }
}
</script>