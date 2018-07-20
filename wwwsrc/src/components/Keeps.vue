<template>
  <div class="Keeps container-fluid d-flex justify-content-center">
    <h1>Find Disinteresting Things!</h1>
    <div class="row">
      <div v-for="Keep in Keeps" class="col" :key="Keep.id">
        <router-link @click.native="activeKeep(Keep)" :to="{name: 'KeepDetails', params:{id: Keep.id}}" @click="views">
          <h1 class="card-title titles">{{Keep.name}}</h1>
        </router-link>
        <h4 class="logoFont">Description:{{Keep.description}}</h4>
        <!-- <h4 class="logoFont">Keep Author: {{User.username}}</h4> -->
        <h4 class="logoFont">Views: {{Keep.views}}</h4>
        <h4 class="logoFont">Keeps: {{Keep.keepCount}}</h4>
        <img :src="Keep.image">
        <button v-if="currentUser.id == Keep.userId"class="btn btn-danger" @click="deleteKeep(Keep.id)">Delete</button>
        <!-- <button v-if="user.id == keep.userid" class="btn btn-warning" @click="">Make Public</button>
        <button v-if="user.id == keep.userid" class="btn btn-warning" @click="">Make Private</button> -->
        
        <select @ click="addKeep(Keep)" v-model="vaultId">
            <option disabled >Please select one</option>
            <option v-for="Vault in Vaults" value="Vault.id" :key="Vault.id">{{Vault.name}}</option>
          </select>
        <span>Selected: {{ vaultId }}</span>
      </div>
    </div>
    <div class="row">
      <div class="card-columns">
        <div>
          <button @click="toggleModal(1)">Create a Keep</button>
          <modal :toggle="showModal">
            <div slot="header">
              <h3>Create Keep</h3>
            </div>
            <div>
              <form @submit.prevent="createKeep">
                <input type="text" placeholder="Keep Name" v-model="newKeep.name" required>
                <input type="url" placeholder="Keep Image Url" v-model="newKeep.Image">
                <input type="text" placeholder="Keep Description" v-model="newKeep.Description">
                <button type="submit">Create Keep</button>
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
    name: 'Keeps',
    data() {
      message: ''
      return {
        vaultId: '',
        showModal: 0,
        newKeep: {
          name: '',
          Image: '',
          Description: ''

        },
        vaultId: ''
      }
    },
    mounted() {
      this.$store.dispatch("getKeeps")
      this.$store.dispatch("authenticate")
      this.$store.dispatch("getVaults")

    },
    components: {
      Modal
    },
    computed: {
      Keeps() {
        return this.$store.state.Keeps
      },
      Vaults(){
        return this.$store.state.Vaults
      },
      currentUser() {
        return this.$store.state.currentUser
      }
    },
    methods: {
      views(Keep) {
        keep.views++
          this.$store.dispatch('editKeep', keep)
      },
      addKeep(Keep) {
        Keep.keepCount++
          this.$store.dispatch('editKeep', id)
        this.$store.dispatch('createVaultKeep', {KeepId:keep.id, VaultId:this.vaultId, UserId: currentUser.id})
        alert("Added to Keeps!")
      },
      deleteKeep(id) {
        this.$store.dispatch('deleteKeep', id)
      },
      createKeep() {
        this.$store.dispatch('createKeep', this.newKeep)
        this.toggleModal(-1)
      },
      toggleModal(n) {
        this.showModal += n
      },
      activeKeep(Keep) {
        this.$store.dispatch('activeKeep', Keep)
      }
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
