<template>
    <div class="vaults">
      <h1 class="mt-5 h1">Vault Details</h1>
      <h1>For</h1>
      <h1>{{vault.name}}</h1>
          <div class="card-columns">
              <div v-for="vault in vaults">
                <div class="card col-6">
                  <!-- <img class="card-img-top" :src="vault.image"> -->
                  <router-link :to="{name: 'VaultDetails', params:{id: vault._id}}">
                    <h1 class="card-title titles">{{keep.name}}</h1>
                  </router-link>
                  <button @click="deleteKeep(vault._id)">Delete</button>
                  <div v-if="currentUser._id">
                      <button class="btn btn-success" @click="createKeep">Create Keep</button>
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
        this.$store.dispatch("getVaults")
        
      },
      computed: {
        vaults() {
          return this.$store.state.vaults
        }
      },
      methods: {
        deleteVault(id) {
          this.$store.dispatch('deleteVault',id)
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