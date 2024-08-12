<template>
  <h1>Parrot</h1>
  <div class="content-medium">
    <p>Choose your favourite book and practice your English skills.</p>
    <h2>How to use?</h2>
    <ol class="howto text-left">
      <li>Register account</li>
      <li>Add book content <RouterLink to="/account/books">Books</RouterLink></li>
      <li>
        You can configure your 
        <a href="https://play.google.com/store/apps/details?id=org.readera" target="_blank">ReadEra app</a> 
        book reader to use parrot
      </li>
      <li>
        Add search engine address <a href="https://parrot.reu.pl">https://parrot.reu.pl</a> to your web browser (ex. Firefox). 
        Set this new entry as default search engine for browser.<br>
        <img src="/img/1_Screenshot_Firefox.jpg" alt="Screenshot for Edytuj wyszukiwarkę">
      </li>
      <li>
        Before you can add new flashcard click "więcej" to configure translator<br>
        <img src="/img/2_Screenshot_ReadEra.jpg" alt="1 Screenshot ReadEra">
      </li>
      <li>
        Click "DOSTOSUJ"<br>
        <img src="/img/3_Screenshot_ReadEra.jpg" alt="2 Screenshot ReadEra">
      </li>
      <li>
        Click "Tłumacz"<br>
        <img src="/img/4_Screenshot_ReadEra.jpg" alt="3 Screenshot ReadEra">
      </li>
      <li>
        Click "DODAJ APLIKACJĘ"<br>
        <img src="/img/5_Screenshot_ReadEra.jpg" alt="4 Screenshot ReadEra">
      </li>
      <li>
        Choose Firefox or browser where have you configured search engine.<br>
        <img src="/img/6_Screenshot_ReadEra.jpg" alt="5 Screenshot ReadEra">
      </li>
      <li>
        Now you can click "Przetłumacz" to tranlate word and add to flashcards<br>
        <img src="/img/2_Screenshot_ReadEra.jpg" alt="1 Screenshot ReadEra">
      </li>
      <li>
        Now you can add flashcard to your list<br>
        <img src="/img/7_Screenshot_Firefox.jpg" alt="Screenshot add definition to your flashcards">
      </li>
      <li>
        When you want to practice words go <RouterLink to="/account/books">Book list</RouterLink>
      </li>
    </ol>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
}
</script>

<style>
.text-left {
  text-align: left;
}
.howto li {
  margin-top: 20px;
  font-size: 19px;
}
</style>