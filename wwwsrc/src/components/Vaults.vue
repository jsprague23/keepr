<template>
  <div class="Vaults container-fluid d-flex justify-content-center">
    <h1>My Vaults</h1>
    <div class="row">
      <div v-for="Vault in Vaults" class="col">
        <router-link :to="{name: 'VaultDetails', params:{id: Vault.id}}">
          <h1 class="card-title titles">{{Vault.name}}</h1>
        </router-link>
        <h3 class="logoFont">{{Vault.Description}}</h3>
        <h4 class="logoFont">Vault Author: {{currentUser.name}}</h4>
        <h4 class="logoFont">{{Vault.Body}}</h4>
        
        <button class="btn btn-danger" @click="deleteVault(Vault.id)">Delete</button>
        </div>
    </div>
    <div class="row">
      <div class="card-columns">
        <div>
          <button @click="toggleModal(1)">Create a Vault</button>
          <modal :toggle="showModal">
            <div slot="header">
              <h3>Create Vault</h3>
            </div>
            <div>
              <form @submit.prevent="createVault">
                <input type="text" placeholder="Vault Name" v-model="newVault.name" required>
                <!--  make image background image for page -->
                <input type="text" placeholder="Vault Description" v-model="newVault.Description">
                <button type="submit">Create Vault</button>
              </form>
            </div>
          </modal>
          
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import Modal from './Modal'
  export default {
    name: 'Vaults',

    data() {
      return {
        showModal: 0,
        newVault: {
          name: '',
          Description: ''
        }

      }
    },
    components:{
      Modal
    },
    mounted() {
      this.$store.dispatch("getVaults")

    },
    computed: {
      Vaults() {
        return this.$store.state.Vaults
      },
      currentUser() {
        return this.$store.state.currentUser
      }
    },
    methods: {
      deleteVault(id) {
        this.$store.dispatch('deleteVault', id)
      },
      createVault(){
        this.$store.dispatch('createVault',this.newVault)
      },
      toggleModal(n) {
        this.showModal += n
      },
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
