<template>
  <div class="content-medium">
    <h1>Logout page</h1>
  </div>
</template>

<script>
import { store } from '../../store'

export default {
  name: 'LogoutView',
  data () {
    return {
      store,
    }
  },
  mounted() {
    this.logoutAction()
  },
  methods: {
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
      this.store.currentUser = null
      localStorage.removeItem("username")
      window.location = "/login"
    }
  }
}
</script>