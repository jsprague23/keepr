<template>
  <div class="container-fluid d-flex justify-content-center">
    <div class="jumbotron ">
      <h1 class="logoFont">Disinterest</h1>
      <h5 class="logoFont">Have you ever wanted to save things that you weren't interested in? Well with Disinterest that dream is now a reality! You can keep things you're disinterested about in vaults, so you never have to look at them again! You can also find out what other people aren't interested in and keep those things too!</h5>
    </div>
    <Keeps></Keeps>
  </div>
</template>

<script>
  import Keeps from './Keeps'
  export default {
    name: 'HelloWorld',
    components: {
      Keeps
    }
  }

</script>



<style>
  p {
    cursor: pointer;
    color: blue;
    text-decoration: underline;
  }

  html {
    background: rgb(173, 201, 127);
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  .jumbotron {
    text-align: center;
    background: #e5e8d8;
    margin-left: 5rem;
    margin-right: 5rem;
    margin-top: 5rem;
    margin-bottom: auto;


  }

  .container-fluid {
    background: rgb(173, 201, 127);
    background-size: cover;
    margin: 0px;
    height: 100%;
    width: 100%;

  }

  .logoFont {
    font-family: 'VT323', monospace;
  }

</style>
