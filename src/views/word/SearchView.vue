<template>
  <div id="container">
    <div v-if="error">{{ error }}</div>
    Search word: {{ wordStr }}
    <div v-if="translation.definition" class="word-element">
      <div v-for="line in translation.definition.split('\n')">
        {{ line }}
      </div>
    </div>
    <p>Definitions:</p>
    <ol>
      <li v-for="word in wordsList" :key="word.id" class="word-element">
        {{ word.lem }} ({{ word.pos }}): {{ word.definition }}
      </li>
    </ol>
    <div v-if="username">
      <form @submit="addFlascard">
        <div class="form-row">
          <label for="keyword" class="form-label mt-4 required">keyword</label>
          <input type="text" name="keyword" v-model="form.keyword" class="form-control">
        </div>
        <div class="form-row">
          <label for="translations" class="form-label mt-4 required">translations</label>
          <input type="text" name="translations" v-model="form.translations" class="form-control">
        </div>
        <div v-if="error" class="invalid-feedback" style="display: block;">
          {{ error }}
        </div>
        <div class="d-grid gap-2 mt-4">
          <input type="submit" value="save" class="btn btn-primary">
        </div>
      </form>
    </div>
    <div v-else>
      <input type="button" value="save" disabled> Zaloguj się aby dodać słowo do listy fiszek.
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'WordsList',
  data() {
    return {
      error: '',
      form: {
        keyword: null,
        translations: null,
      },
      translation: '',
      username: null,
      wordStr: '',
      wordsList: []
    }
  },
  mounted() {
    this.username = localStorage.getItem("username")
    this.searchWords()
  },
  methods: {
    async searchWords() {
      const router = useRouter()
      const query = router.currentRoute.value.query
      if (query.q) {
        this.wordStr = query.q
        await fetch(`${process.env.VUE_APP_API_URL}/words/find/${this.wordStr}`)
        .then(response => response.json())
        .then(data => (this.wordsList = data))
        .catch(err => this.error = err)

        await fetch(`${process.env.VUE_APP_API_URL}/translation/find/${this.wordStr}`)
        .then(response => response.json())
        .then((data) => {
          this.translation = data
          this.form.keyword = this.translation.word
        })
        .catch(err => this.error = err)

      }
    },
    async addFlascard(submitEvent) {
      submitEvent.preventDefault()
        this.error = ""
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({keyword: this.form.keyword, translations: [this.form.translations]}),
          credentials: "include",
        }
        await fetch(process.env.VUE_APP_API_URL + "/flashcards/", requestOptions)
          .catch(err => this.error = err.message)
    }
  },
}
</script>

<style>
#container {
  text-align: left;
  margin: 5%
}
.word-element {
  text-align: left;
}
nav.navbar {
  display: none;
}
</style>