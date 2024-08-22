<template>
  <p class="row mt-4"><span class="col">Keyword: </span><span class="col">{{ flashcard.keyword }}</span></p>
  <p class="row mt-4">
    <span class="col">Translation: </span>
    <div v-for="translation in flashcard.translations" class="col">{{ translation }}</div>
  </p>
</template>

<script>
export default {
    props: ['flashcard'],
}
</script>