<template>
  <div class="KeepDetails">
    <h1 class="mt-5 h1">Keep Details</h1>
    <h1>For</h1>
    <h1>{{Keep.name}}</h1>
    <div class="card-columns">
      <div v-for="Keep in Keeps">
        <div class="card col-6">
            <h4 class="logoFont">Description:{{Keep.description}}</h4>
            <!-- <h4 class="logoFont">Keep Author: {{User.username}}</h4> -->
            <h4 class="logoFont">Views: {{Keep.views}}</h4>
            <h4 class="logoFont">Keeps: {{Keep.keepCount}}</h4>
            <img>{{Keep.image}}</img>
            <button v-if="currentUser.id == Keep.userId"class="btn btn-danger" @click="deleteKeep(Keep.id)">Delete</button>
            <button v-if="currentUser.id == Keep.userId"class="btn btn-warning" @click="editKeep(Keep.id)">Edit</button>          
        </div>
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
      this.$store.dispatch("getKeeps")

    },
    computed: {
      vaults() {
        return this.$store.state.keeps
      }
    },
    methods: {
      deleteKeep(id) {
        this.$store.dispatch('deleteKeep', id)
      },
      editKeep(id) {
        this.$store.dispatch('editKeep',id)
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
