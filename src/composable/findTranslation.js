import { ref } from 'vue'

const loadFindTranslation = (error) => {
  const translation = ref(null)

  const findTranslation = async (wordStr) => {
    await fetch(`${process.env.VUE_APP_API_URL}/translation/find/${wordStr}`)
    .then(response => response.json())
    .then(data => translation.value = data)
    .catch(err => error.value = err)
  }

  return { translation, findTranslation }
}

export default loadFindTranslation
