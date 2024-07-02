<template>
  <div class="content-medium">
    <h1>Register</h1>
    <form @submit="sendForm">
      <div class="form-row">
        <label for="username" class="form-label mt-4 required">username</label>
        <input id="username" type="text" v-model="username" class="form-control" required>
      </div>
      <div class="form-row">
        <label for="email" class="form-lable mt-4 required">email</label>
        <input id="email" type="email" v-model="email" class="form-control" aria-describedby="emailHelp" required>
      </div>
      <div class="form-row">
        <label for="password1" class="form-lable mt-4 required">password</label>
        <input type="password" v-model="password1" :class=password1Class @focusout="checkPassword1" required>
        <div v-if="password1Error" class="invalid-feedback" style="display: block;">
          {{ password1Error }}
        </div>
      </div>
      <div class="form-row">
        <label for="password2" class="form-lable mt-4 required">repeat password</label>
        <input type="password" v-model="password2" :class="password2Class" @focusout="checkPassword2" required>
        <div v-if="password2Error" class="invalid-feedback" style="display: block;">
          {{ password2Error }}
        </div>
      </div>
      <div v-if="errors.length > 0" class="invalid-feedback" style="display: block;">
        <p v-for="error in errors">{{ error }}</p>
      </div>
      <div v-if="message" class="valid-feedback" style="display: block;">{{ message }}</div>
      <div class="d-grid gap-2 mt-4">
        <input type="submit" value="Register" class="btn btn-lg btn-primary">
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'RegisterView',
  data() {
    return {
      email: "",
      errors: [],
      message: "",
      password1: "",
      password1Class: "form-control",
      password1Error: "",
      password2: "",
      password2Class: "form-control",
      password2Error: "",
      username: "",
    }
  },
  methods: {
    checkPassword1() {
      if (this.password1 === "") {
        if (this.password1Class.indexOf("is-invalid") === -1) {
          this.password1Class += " is-invalid"
        }
        this.password1Error = "Password can not be empty"
        return false
      } else {
        this.password1Class = this.password1Class.replace("is-invalid", "")
        this.password1Error = ""
        return true
      }
    },
    checkPassword2() {
      if (this.password1 !== this.password2) {
        if (this.password2Class.indexOf("is-invalid") === -1) {
          this.password2Class += " is-invalid"
        }
        this.password2Error = "Passwords do not match. Repeat the same password in both password fields."
        return false
      } else {
        this.password2Class = this.password2Class.replace("is-invalid", "")
        this.password2Error = ""
        return true
      }
    },
    sendForm(submitEvent) {
      submitEvent.preventDefault()
      let validationResult = this.checkPassword1() && this.checkPassword2()
      if (validationResult === false) {
        return null
      } 

      let formData = {
        "email": this.email,
        "username": this.username,
        "password": this.password1,
      }
      this.errors = []
      this.message = ""
      fetch(
        `${process.env.VUE_APP_API_URL}/users`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      )
      .then(response => response.json().then(data => ({status: response.status, body: data})))
      .then(obj => {
        if (obj.status === 201) {
          this.message = "Created user " + obj.body.username
        } else {
          if (Array.isArray(obj.body.detail)) {
            for (let i=0; i<obj.body.detail.length; i++){
              const error = obj.body.detail[i]
              this.errors.push(error.loc[1] + ": " + error.msg)
            }
          } else {
            this.errors = [obj.body.detail]
          }
        }
      })
      .catch(err => this.errors = [err.message])
    }
  }
}
</script>