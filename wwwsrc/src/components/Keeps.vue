<template>
  <div class="Keeps container-fluid d-flex justify-content-center">
    <h1>Find Disinteresting Things!</h1>
    <div class="row">
      <div v-for="Keep in Keeps" class="col">
        <router-link :to="{name: 'KeepDetails', params:{id: keep.id}}" @click="Views">
          <h1 class="card-title titles">{{Keep.name}}</h1>
        </router-link>
        <h3 class="logoFont">{{Keep.Description}}</h3>
        <h4 class="logoFont">Keep Author: {{Keep.User.Username}}</h4>
        <h4 class="logoFont">Views: {{Keep.Views}}</h4>
        <h4 class="logoFont">Keeps: {{Keep.KeepCount}}</h4>
        <h4 class="logoFont">{{Keep.image}}</h4>
        <button v-if="currentUser.id == Keep.currentUser.id" class="btn btn-danger" @click="deleteKeep(Keep._id)">Delete</button>
        <button v-if="currentUser.id == Keep.currentUser.id" class="btn btn-warning" @click="">Make Public</button>
        <button v-if="currentUser.id == Keep.currentUser.id" class="btn btn-warning" @click="">Make Private</button>
        <button class="btn btn-success" @click="addKeep(keep)">Add Keep</button>
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
  import router from '../router/index'
  export default {
    name: 'Keeps',
    data() {
      message: ''
      return {
        showModal: 0,
        newKeep: {
          name: '',
          Image: '',
          Description: ''

        },
        vaultId:''
      }
    },
    mounted() {
      this.$store.dispatch("getKeeps")

    },
    components: {
      Modal
    },
    computed: {
      Keeps() {
        return this.$store.state.Keeps
      },
      currentUser() {
        return this.$store.state.currentUser
      }
    },
    methods: {
      addKeep(keep){        
        // this.$store.state.userKeeps(id)
        // alert("Added to Favorites")
        keep.keepCount++ 
        //send put request to update keep
        // dispatch create vault keep passing it the keepid & this.vaultId
    },
      deleteKeep(id) {
        this.$store.dispatch('deleteKeep', id)
      },
      createKeep() {
        this.$store.dispatch('createKeep', this.createKeep)
        this.toggleModal(-1)
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
