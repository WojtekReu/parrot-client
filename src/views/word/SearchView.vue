<template>
  <div id="container">
    <p class="text-center">Translation for: <span class="keyword">{{ wordStr }}</span></p>
    <div v-if="translation && translation.definition" class="word-element">
      <div v-for="line in translation.definition.split('\n')">
        {{ line }}
      </div>
    </div>
    <div v-if="words.length > 0">
      <p class="text-center">Definitions:</p>
      <ol>
        <li v-for="word in words" :key="word.id" class="word-element">
          <input type="radio" :value="word.id" v-model="pickedWordId">  {{ word.lem }} ({{ word.pos }}): {{ word.definition }}
        </li>
      </ol>
    </div>
    <div v-if="username">
      <div v-if="flashcards && flashcards.length > 0">
        <p class="text-center">Your flashcards</p>
        <div v-for="flashcard in flashcards" :key="flashcard.id" title="flashcard.keyword">
          {{ flashcard.keyword }} - {{ flashcard.translations.toString() }}
        </div>
      </div>
      <p class="text-center">Add flashcard</p>
      <form @submit="addFlascard">
        <div class="form-row">
          <label for="keyword" class="form-label mt-4 required">keyword</label>
          <input type="text" name="keyword" v-model="form.keyword" class="form-control">
        </div>
        <div class="form-row">
          <label for="translations" class="form-label mt-4 required">translations</label>
          <input type="text" name="translations" v-model="form.translations" class="form-control">
        </div>
        <div v-for="error in errors" class="invalid-feedback" style="display: block;">
          {{ error }}
        </div>
        <div v-if="message" class="valid-feedback" style="display: block;">{{ message }}</div>
        <div class="d-grid gap-2 mt-4">
          <input type="submit" value="save" class="btn btn-primary">
        </div>
      </form>
    </div>
    <div v-else>
      <div class="login-box"><router-link to="/login">Login</router-link></div>
      Login to add flashcard to your flashcards.
    </div>
  </div>
</template>

<script>
import findFlashcards from '@/composable/findFlashcards'
import findTranslation from '@/composable/findTranslation'
import findWords from '@/composable/findWords'
import { useRouter } from 'vue-router'

export default {
  name: 'WordsList',
  data() {
    return {
      errors: [],
      flashcards: [],
      flashcard: null,
      form: {
        keyword: null,
        translations: null,
      },
      message: null,
      pickedWordId: null,
      translation: '',
      username: null,
      wordStr: '',
      words: [],
    }
  },
  mounted() {
    const router = useRouter()
    const query = router.currentRoute.value.query
    if (query.q) {
      this.form.keyword = this.wordStr = query.q
      this.username = localStorage.getItem("username")
      if (this.username) {
        this.loadFlashcards()
      }
      this.loadTranslation()
      this.loadWords()
    }
  },
  methods: {
    async loadFlashcards() {
      const { flashcards, error, loadFindFlashcards } = findFlashcards(this.wordStr)
      loadFindFlashcards()
      if (error.value) {
        this.errors.push(error)
      }
      this.flashcards = flashcards
    },
    async loadTranslation() {
      const { translation, error, loadFindTranslation } = findTranslation(this.wordStr)
      loadFindTranslation()
      if (error.value) {
        this.errors.push(error)
      }
      this.translation = translation
    },
    async loadWords() {
      const { words, error, loadFindWords } = findWords(this.wordStr)
      loadFindWords()
      if (error.value) {
        this.errors.push(error)
      }
      this.words = words
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
          .then(response => response.json())
          .then(data => {
            this.flashcard = data
            const requestOptions2 = {
              credentials: "include",
            }
            fetch(process.env.VUE_APP_API_URL + "/words/" + this.pickedWordId + "/sentences", requestOptions2)
              .then(response => response.json())
              .then(data => {
                const sentenceIds = []
                data.forEach(element => {
                  sentenceIds.push(element.id)
                });
                const sentencesLength = sentenceIds.length
                if (sentencesLength > 0) {
                  const requestOptions3 = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({"disconnect_ids": [], "sentence_ids": sentenceIds}),
                    credentials: "include",
                  }
                  fetch(process.env.VUE_APP_API_URL + "/flashcards/" + this.flashcard.id + "/sentences", requestOptions3)
                }
                this.message = `Saved translation '${this.flashcard.translations}' for word '${this.flashcard.keyword}' and ${sentencesLength} sentences.`
              })
          })
          .catch(err => this.errors.push(err.message))
    }
  },
}
</script>

<style>

#container {
  text-align: left;
  margin: 5%
}

.keyword {
  font-weight: bold;
  color: maroon;
}

.word-element {
  text-align: left;
}

nav.navbar {
  display: none;
}

</style>