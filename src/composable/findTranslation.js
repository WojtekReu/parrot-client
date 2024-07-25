import { ref } from 'vue'

const findTranslation = (wordStr) => {
  const translation = ref(null)
  const error = ref(null)

  const loadFindTranslation = async () => {
    await fetch(`${process.env.VUE_APP_API_URL}/translation/find/${wordStr}`)
    .then(response => response.json())
    .then(data => translation.value = data)
    .catch(err => error.value = err)
  }

  return { translation, error, loadFindTranslation }
}

export default findTranslation
