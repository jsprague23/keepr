<template>
  <div class="KeepDetails">
    <h1>Keep Details For {{activeKeep.name}}</h1>
    <div class="card-columns">
      <div class="card col-6">
        <h4 class="logoFont">Description:{{activeKeep.description}}</h4>
        <!-- <h4 class="logoFont">Keep Author: {{User.username}}</h4> -->
        <h4 class="logoFont">Views: {{activeKeep.views}}</h4>
        <h4 class="logoFont">Keeps: {{activeKeep.keepCount}}</h4>
        <img :src="activeKeep.image">
        <button v-if="currentUser.id == activeKeep.userId" class="btn btn-danger" @click="deleteKeep(activeKeep.id)">Delete</button>
        <button v-if="currentUser.id == activeKeep.userId" class="btn btn-warning" @click="editKeep(activeKeep.id)">Edit</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'KeepDetails',

    data() {
      return {

      }
    },
    mounted() {
      this.$store.dispatch("activeKeep")
    },
    computed: {
      currentUser(){
        return this.$store.state.currentUser
      },
      Keeps() {
        return this.$store.state.Keeps
      },
      activeKeep() {        
        this.$store.dispatch('activeKeep')
      }
    },
    methods: {
      deleteKeep(id) {
        this.$store.dispatch('deleteKeep', id)
      },
      editKeep(id) {
        this.$store.dispatch('editKeep', id)
        alert("Coming Soon!")
      }
    }
  }

</script>

<style>
  ul {
    list-style: none
  }

  .vaults {
    text-align: center
  }

</style>
