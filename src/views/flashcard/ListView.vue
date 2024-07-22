<template>
  <h1>Flashcards</h1>
  <div v-if="username">
    <p>{{ username }}`s flashcards</p>
    <table id="flashcards">
      <tr>
        <th>nr</th>
        <th>flashcards</th>
        <th>translations</th>
      </tr>
      <tr v-for="(flashcard, index) in flashcards" :key="flashcard.id">
        <td>{{ index + 1 }}</td>
        <td>{{ flashcard.keyword }}</td>
        <td>
          <div v-for="translation in flashcard.translations">{{ translation }}</div>
        </td>
      </tr>
    </table>
  </div>
  <div v-else>
    <div class="login-box"><router-link to="/login">Login</router-link></div>
    <div>Login to see your flashcards</div>
  </div>
</template>

<script>
import getFlashcards from '@/composable/getFlashcards'

export default {
  name: 'FlashcardsList',
  setup () {
    const { flashcards, error, load } = getFlashcards(0,100)
    
    load()

    return { flashcards, error}
  },
  data() {
    return {
      username: null,
    }
  },
  mounted() {
    this.username = localStorage.getItem('username')
  }
}
</script>

<style>
#flashcards {
  margin: 0 auto;
}
#flashcards tr td, #flashcards tr th {
  border: 1px solid rgb(230, 230, 230);
  padding: 4px;
}
.login-box {
  margin: 20px;
}
.login-box a {
  text-decoration: none;
  font-weight: bold;
}
</style>