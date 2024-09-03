<template>
  <div class="content-medium">
    <h1>Search Word</h1>
    <div class="form-row mt-2">
      <label for="searchWord" class="form-label required size-20">search word</label>
      <input type="text" name="searchWord" v-model="word" class="form-control size-50">
      <input type="button" value="search" class="btn btn-primary" @click="searchWords">
      <input type="button" value="clear" class="btn btn-secondary" @click="clear">
    </div>
    <div v-if="error" class="invalid-feedback" style="display: block;">
      {{ error }}
    </div>
    <div v-if="flashcards.length > 0">
      <p>Flashcards</p>
      <ul class="text-left mt-4">
        <li v-for="flashcard in flashcards" :key="flashcard.id">
          <router-link :to="{ name: 'flashcard', params: { id: flashcard.id }}">{{ flashcard.keyword }}</router-link>:
          <span v-for="t in flashcard.translations">{{ t }}, </span>
        </li>
      </ul>
    </div>
    <div v-if="translation && translation.definition" class="text-left small">
      <div class="text-center">Engish - Polish Piotrowski+Saloni/FreeDict dictionary</div>
      <div v-for="line in translation.definition.split('\n')">
        {{ line }}
      </div>
    </div>
    <div v-if="synsets.synsets">
      <p class="text-center mt-4">NLTK WordNet definitions</p>
      <ol>
        <li v-for="synset in synsets.synsets" :key="synset.name" class="word-element">
          <input type="radio" :id="synset.name" :value="synset.name" v-model="synsetRadio">
          {{ synset.name }} - {{ synset.definition }}<br>
          <span class="translation">{{ synset.pol }}</span>
        </li>
      </ol>
    </div>
    <div v-if="sentences.length > 0">
      <p class="text-center mt-4">Sentences</p>
      <p v-for="sentence in sentences" :key="sentence.id">
        <input type="checkbox" :value="sentence.id" v-model="sentencesChecked">
        {{ sentence.sentence }}
      </p>
    </div>
    <div v-if="synsets.synsets || translation" class="form-row mt-2 bottom-5">
      <h2>Flashcard</h2>
      <label for="translation" class="form-label required size-20">translation</label>
      <input type="text" name="translation" v-model="translationField" class="form-control size-50">
      <input type="button" value="Add flashcard" class="btn btn-warning" @click="createFlashcard">
    </div>
  </div>
</template>

<script>
import loadAddFlashcard from '@/composable/addFlashcard'
import loadFindFlashcards from '@/composable/findFlashcards'
import loadFindSentences from '@/composable/findSentences'
import loadFindTranslation from '@/composable/findTranslation'
import loadFindSynsets from '@/composable/synsets'
import loadUpdateFlashcardSentences from '@/composable/updateFlashcardSentences'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'words',
  data() {
    return {
      sentencesChecked: [],
      synsetRadio: '',
      translationField: '',
      word: '',
    }
  },
  setup() {
    const error = ref(null)
    const { translation, findTranslation } = loadFindTranslation(error)
    const { synsets, findSynsets } = loadFindSynsets(error)
    const { flashcards, findFlashcards } = loadFindFlashcards(error)
    const { sentences, findSentences } = loadFindSentences(error)
    const { flashcard, message, addFlashcard } = loadAddFlashcard()
    const { updateFlashcardSentences } = loadUpdateFlashcardSentences(error)

    return { 
      error,
      flashcards,
      flashcard,
      translation,
      sentences,
      synsets,
      addFlashcard,
      findTranslation,
      findSynsets,
      findFlashcards,
      findSentences,
      updateFlashcardSentences,
    }
  },
  mounted () {
    const router = useRouter()
    const query = router.currentRoute.value.query

    this.word = query.q
    this.searchWords()
  },
  methods: {
    clear() {
      this.word = ''
      this.flashcards = []
      this.synsets = {}
      this.translation = {}
      this.sentences = []
    },
    async searchWords() {
      if (this.word) {
        this.findFlashcards(this.word)
        this.findTranslation(this.word)
        this.findSynsets(this.word)
        this.findSentences(this.word)
      }
    },
    async createFlashcard() {
      if (this.translationField !== '') {
        this.addFlashcard(this.word, [this.translationField])
      } else {
        this.error = "The translation is empty"
      }
    }
  },
  watch: {
    synsetRadio () {
      this.synsets.synsets.forEach(synset => {
        if (this.synsetRadio == synset.name) {
          this.translationField = synset.pol
        }
      })
    },
    flashcard () {
      this.flashcards.push(this.flashcard)
      if (this.sentencesChecked.length > 0) {
        this.updateFlashcardSentences(this.flashcard.id, this.sentencesChecked)
      }
    }
  }
}
</script>

<style>
.word-element {
  text-align: left;
}
.translation {
  font-style: italic;
  color: #822;
}

.size-50 {
  display: inline-block;
  width: 50%;
}

.size-20 {
  display: inline-block;
  width: 20%;
}

.bottom-5 {
  margin-bottom: 5%
}
</style>