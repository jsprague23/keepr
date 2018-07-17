<template>
  <div class="VaultDetails">
    <h1 class="mt-5 h1">Vault Details</h1>
    <h1>For</h1>
    <!-- <h1>{{Vault.name}}</h1> -->
    <div class="card-columns">
      <div v-for="Keep in Keeps">
        <div class="card col-6">
          <h1 class="card-title titles">{{Keeps.name}}</h1>    
          <h5>{{Keeps.Image}}</h5>
          <h5>{{Keeps.Description}}</h5>
          <h5>{{Keeps.Views}}</h5>
          <h5>{{Keeps.KeepCount}}</h5>
          <div v-if="currentUser">
            <button class "btn btn-danger" @click="deleteKeep">Delete</button>
            <button class="btn btn-warning" @click="editVault">Edit Vault</button>
          </div>
        </div>
      </div>
      <button @click="toggleModal(1)">Create a Keep</button>
          <modal :toggle="showModal">
            <div slot="header">
              <h3>Create Vault</h3>
            </div>
            <div>
              <form @submit.prevent="createKeep">
                <input type="text" placeholder="Keep Name" v-model="newKeep.name" required>
                <input type="url" placeholder="Image URL" v-model="newKeep.Image" required>                
                <input type="text" placeholder="Keep Description" v-model="newKeep.Description">
                <button type="submit">Create Keep</button>
              </form>
            </div>
          </modal>
    </div>

  </div>
</template>

<script>
  import Modal from './Modal'
  export default {
    name: 'VaultDetails',

    data() {
      return {
        showModal: 0,
        newKeep: {
          name: '',
          Image:'',
          Description: ''
        }

      }
    },
    components:{
      Modal
    },
    mounted() {
      this.$store.dispatch("getVaultKeeps")
      
    },
    computed: {
      Keeps() {
        return this.$store.state.Keeps
      },
      currentUser(){
        return this.$store.state.currentUser
      }
    },
    methods: {
      deleteKeep(id) {
        this.$store.dispatch('deleteKeep', id)
      },
      createKeep(){
        this.$store.dispatch('createKeep',this.newKeep)
      },
      editVault(id) {
        this.$store.dispatch('editVault', id)
      },
      toggleModal(n) {
        this.showModal += n
      },
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
