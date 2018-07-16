<template>
  <div class="container-fluid d-flex justify-content-center">
    <div class="jumbotron ">
      <h1 class="logoFont">Welcome to your profile.</h1>
      <h5 class="logoFont">Here you can look at, edit, create and delete your keeps, if they are private. You can also move keeps between vaults,
        edit, create, and delete your vaults. Happy Keeping!</h5>
      <div class="row">
        <div class="col">
          <Vaults></Vaults>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <Keeps></Keeps>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vaults from './Vaults'
  import Keeps from './Keeps'
  export default {
    name: 'ProfilePage',
    data() {
      return {}
    },
    components: {
      Vaults,
      Keeps
    },
    computed: {
      currentUser() {
        return this.$store.state.currentUser
      },
      userKeeps() {
        return this.$store.state.userKeeps
      },
      userVaults() {
        return this.$store.state.userVaults
      }
    },
    methods: {}
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
