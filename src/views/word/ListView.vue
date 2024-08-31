<template>
  <div class="content-medium">
    <h1>Search Word</h1>
    <div class="form-row mt-2">
      <label for="searchWord" class="form-label required size-20">search word</label>
      <input type="text" name="searchWord" v-model="wordsFilter" class="form-control size-50">
      <input type="button" value="search" class="btn btn-primary" @click="searchWords">
      <input type="button" value="clear" class="btn btn-secondary" @click="clear">
    </div>
    <div class="form-row mt-2">
      <label for="translation" class="form-label required size-20">translation</label>
      <input type="text" name="translation" v-model="translationField" class="form-control size-50">
      <input type="button" value="flashcard" class="btn btn-warning" @click="createFlashcard">
    </div>

    <div v-if="error" class="invalid-feedback" style="display: block;">
      {{ error }}
    </div>
    <div v-if="flashcards">
      <p>Flashcards</p>
      <ul class="text-left mt-4">
        <li v-for="flashcard in flashcards" :key="flashcard.id">
          {{ flashcard.keyword }} - {{ flashcard.translations }}
        </li>
      </ul>
    </div>
    <div class="text-center">Engish - Polish Piotrowski+Saloni/FreeDict dictionary</div>
    <div v-if="translation && translation.definition" class="text-left small">
      <div v-for="line in translation.definition.split('\n')">
        {{ line }}
      </div>
    </div>
    <p class="text-center mt-4">NLTK WordNet definitions</p>
    <ol>
      <li v-for="synset in synsets.synsets" :key="synset.name" class="word-element">
        <input type="radio" :id="synset.name" :value="synset.name" v-model="synsetRadio">
        {{ synset.name }} - {{ synset.definition }}<br>
        <span class="translation">{{ synset.pol }}</span>
      </li>
    </ol>
    <p class="text-center mt-4">Sentences</p>
    <p v-for="sentence in sentences" :key="sentence.id">
      <input type="checkbox" :value="sentence.id">
      {{ sentence.sentence }}
    </p>
  </div>
</template>

<script>
import findFlashcards from '@/composable/findFlashcards'
import findSentences from '@/composable/findSentences'
import findTranslation from '@/composable/findTranslation'
import findSynsets from '@/composable/synsets'
import { useRouter } from 'vue-router'
export default {
  name: 'words',
  data() {
    return {
      synsetRadio: '',
      translationField: '',
      wordsFilter: '',
    }
  },
  setup() {
    const { translation, error, loadFindTranslation } = findTranslation()
    const { synsets, error2, loadFindSynsets } = findSynsets()
    const { flashcards, error3, loadFindFlashcards } = findFlashcards()
    const { sentences, error4, loadFindSentences } = findSentences()

    return { flashcards, translation, sentences, synsets, error, loadFindTranslation, loadFindSynsets, loadFindFlashcards, loadFindSentences }
  },
  mounted () {
    const router = useRouter()
    const query = router.currentRoute.value.query

    this.wordsFilter = query.q
    this.searchWords()
  },
  methods: {
    clear() {
      this.wordsFilter = ''
      this.synsets = {}
      this.translation = {}
    },
    async searchWords() {
      if (this.wordsFilter) {
        this.loadFindFlashcards(this.wordsFilter)
        this.loadFindTranslation(this.wordsFilter)
        this.loadFindSynsets(this.wordsFilter)
        this.loadFindSentences(this.wordsFilter)
      }
    },
    async createFlashcard() {
      console.log(this.wordsFilter, this.translationField, this.synsetRadio)
    }
  },
  watch: {
    synsetRadio () {
      this.synsets.synsets.forEach(synset => {
        if (this.synsetRadio == synset.name) {
          this.translationField = synset.pol
        }
      })
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
</style>