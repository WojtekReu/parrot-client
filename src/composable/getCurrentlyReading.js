import { ref } from 'vue'

const getCurrentlyReading = () => {
  const currentlyReading = ref({})
  const error = ref(null)

  const loadCurrentlyReading = async () => {
    await fetch(
      `${process.env.VUE_APP_API_URL}/books/reading`,
      {
        credentials: "include",
      }
    )
      .then(response => response.json())
      .then(data => currentlyReading.value = data)
      .catch(err => error.value = err.message)
  }

  return { currentlyReading, error, loadCurrentlyReading }
}

export default getCurrentlyReading
