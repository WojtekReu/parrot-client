import { APISettings } from '@/store'

const loadUpdateFlashcardSentences = (error) => {
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
      .then(response => {
        if (response.status !== 204) {
          error.value = response.statusText
        }
      })
      .catch(err => error.value = err.message)
  }

  return { updateFlashcardSentences }
}

export default loadUpdateFlashcardSentences
