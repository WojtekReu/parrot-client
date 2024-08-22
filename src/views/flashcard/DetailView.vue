<template>
  <div class="content-medium">
    <h1 class="mt-4">Flashcard</h1>
    <div v-if="showEdit">
      <FlashcardEdit :form="form" :updateFlashcardAction="updateFlashcardAction" :cancelFlashcardAction="cancelFlashcardAction"/>
    </div>
    <div v-else>
      <Flashcard :flashcard="flashcard"/>
      <div class="mt-4 d-md-flex justify-content-md-end">
        <span v-if="showDelete">
          <input type="button" value=" Yes " class="btn btn-danger me-md-2" @click="deleteFlashcardConfirm">
          <input type="button" value="Cancel" class="btn btn-secondary" @click="cancelDeleteAction">
        </span>
        <span v-else>
          <input type="button" value=" Edit " class="btn btn-warning me-md-2" @click="editFlashcard">
          <input type="button" value="Delete" class="btn btn-danger" @click="deleteFlashcardAction">
        </span>
      </div>
    </div>
    <div v-if="warning" class="text-danger mt-4">{{ warning }}</div>
    <div v-if="error" class="invalid-feedback" style="display: block;">{{ error }}</div>
  </div>
</template>

<script>
import Flashcard from '@/components/flashcard/Element.vue'
import FlashcardEdit from '@/components/flashcard/Edit.vue'
import queryFlashcard from '@/composable/queryFlashcard'

export default {
  name: 'FlashcardView',
  props: ['id'],
  components: { Flashcard, FlashcardEdit },
  data () {
    return {
      form: {},
      showEdit: false,
      warning: '',
      showDelete: false,
    }
  },
  setup(props) {
    const { flashcard, error, getFlashcard, updateFlashcard, deleteFlashcard } = queryFlashcard()

    getFlashcard(props.id)

    return { flashcard, error, getFlashcard, updateFlashcard, deleteFlashcard }
  },
  methods: {
    async editFlashcard() {
      this.showEdit = true
      this.form.keyword = this.flashcard.keyword
      this.form.translations = this.flashcard.translations
    },
    async updateFlashcardAction(submitEvent) {
      submitEvent.preventDefault()
      this.updateFlashcard(this.flashcard.id, this.form)
      this.showEdit = false
    },
    async cancelFlashcardAction() {
      this.showEdit = false
    },
    async deleteFlashcardAction() {
      this.warning = "Are you sure you want to delete this flashcard?"
      this.showDelete = true
    },
    async deleteFlashcardConfirm() {
      this.deleteFlashcard(this.flashcard.id)
      window.location = "/flashcards"
    },
    cancelDeleteAction() {
      this.showDelete = false
      this.warning = ''
    }
  }
}
</script>