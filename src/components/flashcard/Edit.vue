<template>
  <div class="content-medium">
    <form class="form-edit" @submit="updateFlashcardAction">
      <div class="form-row">
        <label for="keyword" class="col form-label mt-4 required">Keyword:</label>
        <input type="text" name="keyword" v-model="form.keyword" class="col form-control">
      </div>
      <div class="form-row">
        <label for="translations" class="col form-label mt-4 required">Translations:</label>
        <input type="text" name="translations[]" v-model="form.translations" class="col form-control">
      </div>
      <div class="gap-2 mt-4 d-md-flex justify-content-md-end">
        <input type="submit" value="save" class="btn btn-primary me-md-2">
        <input type="button" value="cancel" class="btn btn-secondary" @click="cancelFlashcardAction">
      </div>
    </form>
  </div>
</template>

<script>
export default {
    props: ['form', 'updateFlashcardAction', 'cancelFlashcardAction'],
}
</script>

<style>
.form-edit label.form-label {
  width: 40%;
  text-align: center;
}
.form-edit input.form-control {
  display: inline-block;
  width: 60%;
}
</style>