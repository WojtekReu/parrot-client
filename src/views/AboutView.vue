<template>
  <h1>About</h1>
  <div class="content-medium text-left">
    <p>This project is proof of concept</p>
    <hr>
    <p>Google has provided Google Cloud Platform where this project is running. You can use it until 10.10.2024.<br> Thanks Google</p>
    <hr>
    <p>Project use dictionary for translation: 
      <a href="https://github.com/freedict/fd-dictionaries/tree/master/eng-pol" target="_blank">"English - Polish Piotrowski+Saloni/FreeDict dictionary ver. 0.2"</a>
      and <a href="https://www.nltk.org/" target="_blank">NLTK platform</a> for word definitions.
    </p>
    <hr>
    <p>Soruce code you can find on my GitHub account: <a href="https://github.com/WojtekReu/parrot" target="_blank">https://github.com/WojtekReu/parrot</a></p>
    <hr>
    <p>About <a href="https://blog.reu.pl/o-mnie/" target="_blank">me</a> and orienteering</p>
    <p>Wojciech Zając</p>
  </div>
</template>

<script>

export default {
  name: 'AboutView',
}
</script>

<style>
.text-left {
  text-align: left;
}
</style>