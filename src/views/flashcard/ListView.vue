<template>
  <h1>Flashcards</h1>
  <div v-if="username">
    <p>{{ username }}`s flashcards</p>
    <div v-if="flashcards">
      <table id="flashcards">
        <tr>
          <th>count</th>
          <th>flashcards</th>
          <th>translations</th>
        </tr>
        <tr v-for="(flashcard, index) in flashcards.items" :key="flashcard.id">
          <td>{{ index + 1 }}</td>
          <td>{{ flashcard.keyword }}</td>
          <td>
            <div v-for="translation in flashcard.translations">{{ translation }}</div>
          </td>
        </tr>
      </table>
      <div class="pagination-container">
        <span v-if="flashcards.page > 1"><a :href="'?page=' + (flashcards.page - 1) + '&size=' + flashcards.size" class="pagination-page">&lt;&lt;</a></span>
        <span class="pagination-space">total: {{ flashcards.total }}, &nbsp; page {{ flashcards.page }} of <a :href="'?page=' + (flashcards.pages) + '&size=' + flashcards.size" class="pagination-page">{{ flashcards.pages }}</a></span>
        <span v-if="flashcards.page < flashcards.pages"><a :href="'?page=' + (flashcards.page + 1) + '&size=' + flashcards.size" class="pagination-page">&gt;&gt;</a></span>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="login-box"><router-link to="/login">Login</router-link></div>
    <div>Login to see your flashcards</div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import getFlashcards from '@/composable/getFlashcards'

export default {
  name: 'FlashcardsList',
  setup () {
    const router = useRouter()
    const query = router.currentRoute.value.query
    let getToPage = query.page ? query.page : 1
    let getSize = query.size ? query.size : 100
    const { flashcards, error, load } = getFlashcards(getToPage,getSize)
    
    load()

    return { flashcards, error }
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
.pagination-page {
  margin: 0 10px;
  font-weight: bold;
}
.pagination-space {
  margin: 0 10% 30
}
.pagination-container {
  margin-top: 10px;
  margin-bottom: 40px;
}
</style>