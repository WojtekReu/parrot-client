<template>
  <h1>Register</h1>
  <form @submit="sendForm">
    <div>
      <label for="username">username</label>
      <input type="text" v-model="username">
    </div>
    <div>
      <label for="email">email</label>
      <input type="text" v-model="email">
    </div>
    <div>
      <label for="password1">password</label>
      <input type="password" v-model="password1" required="true">
    </div>
    <div>
      <label for="password2">repeat password</label>
      <input type="password" v-model="password2" required="true">
    </div>
    <div>
      captcha
    </div>
    <div>
      <input type="submit" value="register">
    </div>
  </form>
  <div v-if="message">Message: {{ message }}</div>
  <div v-if="error">Error: {{ error }}</div>
</template>

<script>

export default {
  name: 'RegisterView',
  data() {
    return {
      email: "",
      error: "",
      message: "",
      password1: "",
      password2: "",
      username: "",
    }
  },
  methods: {
    sendForm(submitEvent) {
      submitEvent.preventDefault()
      if (this.password1 === "") {
        this.error = "Password can not be empty"
        return null
      }
      if (this.password1 !== this.password2) {
        this.error = "Passwords do not match. Repeat the same password in both password fields."
        return null
      }
      let formData = {
        "email": this.email,
        "username": this.username,
        "password": this.password1,
      }
      console.log(formData)
      fetch(
        `${process.env.VUE_APP_API_URL}/users`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      )
      .then(response => response.json())
      .then(data => {
        this.message = data
      })
      .catch(err => this.error = err.message)
    }
  }
}
</script>