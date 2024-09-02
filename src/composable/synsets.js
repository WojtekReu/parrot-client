import { ref } from 'vue'

const loadFindSynsets = (error) => {
  const synsets = ref({})

  const findSynsets = async (wordStr) => {
    await fetch(`${process.env.VUE_APP_API_URL}/translation/synsets/${wordStr}`)
    .then(response => response.json())
    .then(data => synsets.value = data)
    .catch(err => error.value = err)
  }

  return { synsets, findSynsets }
}

export default loadFindSynsets
