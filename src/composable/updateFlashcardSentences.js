import { APISettings } from '@/store'
import { ref } from 'vue'

const loadUpdateFlashcardSentences = () => {
  const error = ref(null)

  const updateFlashcardSentences = async (flashcardId, sentenceIds) => {
    await fetch(
      `${APISettings.APIUrl}/flashcards/${flashcardId}/sentences`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"disconnect_ids":[], "sentence_ids": sentenceIds}),
        credentials: "include",
      }
    )
      .then(response => response.json())
      .catch(err => error.value = err.message)
  }

  return { error, updateFlashcardSentences }
}

export default loadUpdateFlashcardSentences
