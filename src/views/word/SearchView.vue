<template>
  <div class="content-medium">
    <p class="text-center small">Engish - Polish Piotrowski+Saloni/FreeDict dictionary: <span class="keyword">{{ wordStr }}</span></p>
    <div v-if="translation && translation.definition" class="text-left small">
      <div v-for="line in translation.definition.split('\n')">
        {{ line }}
      </div>
    </div>
    <div v-if="words.length > 0">
      <p class="text-center">WordNet definitions:</p>
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
import loadFindFlashcards from '@/composable/findFlashcards'
import loadFindTranslation from '@/composable/findTranslation'
import findWords from '@/composable/findWords'
import { useRouter } from 'vue-router'

export default {
  name: 'wordsSearch',
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
  setup() {
    const error = ref(null)
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
      const error = ref(null)
      const { flashcards, findFlashcards } = loadFindFlashcards(error)
      findFlashcards(this.wordStr)
      if (error.value) {
        this.errors.push(error)
      }
      this.flashcards = flashcards
    },
    async loadTranslation() {
      const error = ref(null)
      const { translation, findTranslation } = loadFindTranslation(error)
      findTranslation(this.wordStr)
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
            const wordIds = []
            this.words.forEach(el => {
              wordIds.push(el.id)
            })
            const requestOptions1 = {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json"},
              body: JSON.stringify({"disconnect_ids": [], "word_ids": wordIds})
            }
            fetch(process.env.VUE_APP_API_URL + "/flashcards/" + data.id + "/words", requestOptions1)

            if (this.pickedWordId !== null) {
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
            }
          })
          .catch(err => this.errors.push(err.message))
    }
  },
}
</script>

<style>
.keyword {
  font-weight: bold;
  color: maroon;
}

.word-element {
  text-align: left;
}
</style>