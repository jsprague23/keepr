<template>
  <div class="VaultDetails">
    <h1 class="mt-5 h1">Vault Details</h1>
    <h1>For</h1>
    <h1>{{vault.name}}</h1>
    <div class="card-columns">
      <div v-for="keep in keeps">
        <div class="card col-6">
          <!-- <img class="card-img-top" :src="vault.image"> -->
          <router-link :to="{name: 'VaultDetails', params:{id: vault._id}}">
            <h1 class="card-title titles">{{keeps.name}}</h1>
          </router-link>
          <div v-if="currentUser._id">
            <button class "btn btn-danger" @click="deleteKeep(vault._id)">Delete</button>
            <button class="btn btn-success" @click="createKeep">Create Keep</button>
            <button class="btn btn-warning" @click="editVault">Edit Vault</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'VaultDetails',

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
      },
      currentUser(){
        return this.$store.state.currentUser
      }
    },
    methods: {
      deleteKeep(id) {
        this.$store.dispatch('deleteKeep', id)
      },
      editVault(id) {
        this.$store.dispatch('editVault', id)
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
