import { APISettings } from '@/store'
import { ref } from 'vue'

const loadAddFlashcard = () => {
  const flashcard = ref({})
  const message = ref({})
  let status = null

  const addFlashcard = async (keyword, translations) => {
    await fetch(
      `${APISettings.APIUrl}/flashcards/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({keyword, translations}),
        credentials: "include",
      }
    )
      .then(response => {
        status = response.status
        return response.json()
      })
      .then(data => {
        if (status === 201) {
          message.value.text = "Added new flashcard."
          message.value.type = "success"
          flashcard.value = data
        } else {
          message.value.text = data.detail
          message.value.type = "error"
        }
      })
      .catch(err => {
        message.value.text = err.message
        message.value.type = "error"
      })
  }

  return { flashcard, message, addFlashcard }
}

export default loadAddFlashcard
