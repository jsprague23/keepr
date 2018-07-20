<template>
  <div class="VaultDetails">
    <h1>Vault Details for {{activeVault.name}}</h1>
    <div class="card-columns">
      <div v-for="VaultKeep in VaultKeeps">
        <div class="card col-6">
            <router-link :to="{name: 'KeepDetails', params:{id: Keep.id}}" @click="views">
                <h1 class="card-title titles">{{VaultKeep.name}}</h1>
            </router-link>
          <img :src="VaultKeep.image">
          <h5>Description:{{VaultKeep.description}}</h5>
          <h5>Views:{{VaultKeep.views}}</h5>
          <h5>Keeps:{{VaultKeep.keepCount}}</h5>
          <select @ click="editKeep(Keep)" v-model="pubPriv">
            <option disabled value="vaultId">Please select one</option>
            <option @click="editKeep">Public</option>
            <option @click="editKeep">Private</option>
          </select>
          <span>Selected: {{ pubPriv }}</span>
          <div v-if="currentUser">
            <button class "btn btn-danger" @click="deleteKeep">Delete</button>
            <button class="btn btn-warning" @click="editKeep">Edit</button>
          </div>
          <select @ click="addKeep(Keep)" v-model="vaultId">
            <option disabled >Please select one</option>
            <option v-for="Vault in Vaults" value="Vault.id">{{Vault.name}}</option>
          </select>
        </div>
      </div>  
      <span>Selected: {{ vaultId }}</span>
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
</template>

<script>
  import Modal from './Modal'
  export default {
    name: 'VaultDetails',
    data() {
      
      return {
        pubPriv: '',
        vaultId:'',
        showModal: 0,
        newKeep: {
          name: '',
          Image: '',
          Description: ''
        }

      }
    },
    components: {
      Modal
    },
    mounted() {
      this.$store.dispatch("getVaultKeeps")
      this.$store.dispatch("getKeeps")
      },
    computed: {
      Keeps(){
        this.$store.state.Keeps
      },
      Vaults(){
        return this.$store.state.Vaults
      },
      VaultKeeps() {
        return this.$store.state.Keeps
      },
      activeVault(){
        return this.$store.state.activeVault
      },
      currentUser() {
        return this.$store.state.currentUser
      }
    },
    methods: {
      views(keep){
        keep.views++
        this.$store.dispatch('editKeep', keep)
      },
      deleteKeep(id) {
        this.$store.dispatch('deleteKeep', id)
      },
      createKeep() {
        this.$store.dispatch('createKeep', this.newKeep)
      },
      editKeep(id) {
        this.$store.dispatch('editKeep', id)
        alert("Coming Soon!")
      },
      toggleModal(n) {
        this.showModal += n
      },
      addKeep(Keep) {
        Keep.keepCount++
          this.$store.dispatch('editKeep', id)
        this.$store.dispatch('createVaultKeep', {KeepId:keep.id, VaultId:this.vaultId, UserId: currentUser.id})
        alert("Added to Keeps!")
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
