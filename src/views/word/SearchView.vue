<template>
  <div id="container">
    <div v-if="error">{{ error }}</div>
    Search word: {{ wordStr }}
    <div v-if="translation" class="word-element">
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
    <div v-if="store.currentUser">
      <input type="button" value="save">
    </div>
  </div>
</template>

<script>
import { store } from '../../store'
import { useRouter } from 'vue-router'

export default {
  name: 'WordsList',
  data() {
    return {
      error: '',
      store,
      translation: '',
      wordStr: '',
      wordsList: []
    }
  },
  mounted() {
    this.searchWords()
  },
  methods: {
    searchWords() {
      const router = useRouter()
      const query = router.currentRoute.value.query
      if (query.q) {
        this.wordStr = query.q
        fetch(`${process.env.VUE_APP_API_URL}/words/find/${this.wordStr}`)
        .then(response => response.json())
        .then(data => (this.wordsList = data))
        .catch(err => this.error = err)

        fetch(`${process.env.VUE_APP_API_URL}/translation/find/${this.wordStr}`)
        .then(response => response.json())
        .then(data => (this.translation = data))
        .catch(err => this.error = err)

      }
    }
  }
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