<template>
  <h1>Flashcards</h1>
  <div v-if="username">
    My ({{ username }}`s) flashcards
  </div>
  <div v-else>
    Zaloguj się aby zobaczyć swoje fiszki.
  </div>
</template>

<script>

export default {
  name: 'FlashcardsList',
  data() {
    return {
      username: null,
    }
  },
  methods: {

  },
  mounted() {
    this.username = localStorage.getItem('username')
  }
}
</script>
