<template>
  <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Home</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link to="/words" class="nav-link">Words</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/account/books" class="nav-link">Books</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/flashcards" class="nav-link">Flashcards</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
        </ul>
        <ul  v-if="username" class="navbar-nav d-flex">
          <li class="nav-item">
            <router-link to="/account" class="nav-link">Account</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/logout" class="nav-link">Logout</router-link>
          </li>
        </ul>
        <ul v-else class="navbar-nav d-flex">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">Register</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  data() {
    return {
      username: null
    }
  },
  mounted () {
    this.username = localStorage.getItem('username')
  }
}
</script>