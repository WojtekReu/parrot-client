import { APISettings } from '@/store'
import { ref } from 'vue'

const queryFlashcard = () => {
  const error = ref(null)
  const flashcard = ref({})

  const getFlashcard = async (flashcardId) => {
    await fetch(
      `${APISettings.APIUrl}/flashcards/${flashcardId}`,
      {
        credentials: "include",
      }
    )
    .then(response => {
      let data = response.json()
      if (response.status == 401) {
        window.location = "/logout"
      }
      return data
    })
    .then(data => {
      if (data.detail !== undefined && data.detail !== "") {
        error.value = data.detail
      } else {
        flashcard.value = data
      }
    })
    .catch(err => error.value = err.message)
  }

  const updateFlashcard = async (flashcardId, data) => {
    data.translations = [data.translations]
    await fetch(
    `${APISettings.APIUrl}/flashcards/${flashcardId}/update`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      }
    ) 
    .then(response => response.json())
    .then(data => flashcard.value = data)
    .catch(err => error.value = err.message)
  }

  const deleteFlashcard = async (flashcardId) => {
    await fetch(
    `${APISettings.APIUrl}/flashcards/${flashcardId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    ) 
    .then(response => response.json())
    .then(data => {
      window.location = '/flashcards'
    })
    .catch(err => error.value = err.message)
  }

  return { flashcard, error, getFlashcard, updateFlashcard, deleteFlashcard }
}

export default queryFlashcard
