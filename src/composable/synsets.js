import { ref } from 'vue'

const findSynsets = () => {
  const synsets = ref({})
  const error2 = ref(null)

  const loadFindSynsets = async (wordStr) => {
    await fetch(`${process.env.VUE_APP_API_URL}/translation/synsets/${wordStr}`)
    .then(response => response.json())
    .then(data => synsets.value = data)
    .catch(err => error2.value = err)
  }

  return { synsets, error2, loadFindSynsets }
}

export default findSynsets
