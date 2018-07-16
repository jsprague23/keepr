<template>
  <div class="container-fluid d-flex justify-content-center">
    <h1>My Keeps</h1>
    <h1>For</h1>
    <h1>{{currentUser.name}}</h1>
    <div class="row">
      <div class="col">
          <h5 class="logoFont">{{Keep.Description}}</h5>
          <p class="logoFont">Keep Author: {{Keep.User.Username}}</p>
          <p class="logoFont">Views: {{Keep.Views}}</p>
          <p class="logoFont">Keeps: {{Keep.KeepCount}}</p>
      </div>
    </div>
    <div class="card-columns">
        <button @click="toggleModal(1)">Create a Keep</button>
      <div class="card col-6">
        <img class="card-img-top" :src="keep.image">
        <router-link :to="{name: 'keepDetails', params:{id: keep.id}}">
          <h1 class="card-title titles">{{Keep.name}}</h1>
        </router-link>
        <div>
          <button @click="toggleModal(1)">Create a Keep</button>
          <modal :toggle="showModal">
            <div slot="header">
              <h3>Create Keep</h3>
            </div>
            <div>
              <form @submit.prevent="createKeep">
                <input type="text" v-model="Keep.name" required>
                <button type="submit">Create Keep</button>
                <input type="url" placeholder="Keep Image Url" v-model="Keep.Image">
                <input type="text" placeholder="Keep Description" v-model="Keep.Description">
              </form>
            </div>
          </modal>
          <button class="btn btn-danger" @click="deleteKeep(keep.id)">Delete</button>
          <button v-if="currentUser.id == Keep.currentUserId && !keep.public" class="btn btn-warning" @click="public(keep)">Make Public</button>
        <button v-if="currentUser.id == Keep.currentUserId && keep.public" class="btn btn-warning" @click="public(keep)">Make Private</button>
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
      message:''
      return {
        showModal: 0,
      }
    },
    mounted() {
      this.$store.dispatch("getKeeps")

    },
    components: {
      Modal
    },
    computed: {
      keeps() {
        return this.$store.state.Keeps
      },
      currentUser() {
        return this.$store.state.currentUser
      }
    },
    methods: {
      deleteKeep(id) {
        this.$store.dispatch('deleteKeep', id)
      },
      createKeep(id) {
        this.$store.dispatch('createKeep', id)
        this.toggleModal(-1)
      },
      toggle(n) {
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
