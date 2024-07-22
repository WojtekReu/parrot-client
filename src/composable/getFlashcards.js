import { ref } from 'vue'

const getFlashcards = (start, end) => {
  const flashcards = ref(null)
  const error = ref(null)

  const load = async () => {
    await fetch(
      `${process.env.VUE_APP_API_URL}/users/flashcards`,
      {
        credentials: "include",
      }
    )
      .then(response => response.json())
      .then(data => flashcards.value = data)
      .catch(err => error.value = err.message)
  }

  return { flashcards, error, load }
}

export default getFlashcards
