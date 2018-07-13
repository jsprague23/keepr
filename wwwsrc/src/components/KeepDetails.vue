<template>
  <div class="vaults">
    <h1 class="mt-5 h1">Keep Details</h1>
    <h1>For</h1>
    <h1>{{keep.name}}</h1>
    <div class="card-columns">
      <div v-for="Keep in Keeps">
        <div class="card col-6">
          <!-- <img class="card-img-top" :src="vault.image"> -->
          <div v-if="currentUser._id">
            <button class "btn btn-danger" @click="deleteKeep(vault._id)">Delete</button>
            <button class="btn btn-warning" @click="editKeep(keep._id)">Edit Keep</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'vaults',

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
