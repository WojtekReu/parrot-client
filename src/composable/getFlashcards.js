import { ref } from 'vue'

const getFlashcards = (page, size) => {
  const flashcards = ref(null)
  const error = ref(null)

  const load = async () => {
    await fetch(
      `${process.env.VUE_APP_API_URL}/users/flashcards?page=${page}&size=${size}`,
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
