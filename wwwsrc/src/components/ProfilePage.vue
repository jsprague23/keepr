<template>
    <div class="container-fluid" id="background">
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
  </template>

<script>
  import Vaults from './Vaults'
  import Keeps from './Keeps'
  export default {
    name: 'ProfilePage',
    data() {
      return {
      }
    },
    components: {
      Vaults,
      Keeps
    },
    computed: {
      currentUser(){
        return this.$store.state.currentUser
      }
    },
    methods: {
      Vaults() {
        this.bool = !this.bool
      }
    }
  }
</script>

<style scoped>
  #background {
    /* background-image: url("../assets/profilePage.jpg"); */
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    height: 100vh;
  }
</style>