<template>
  <div class="Keeps">
    <h1 class="mt-5 h1">My Keeps</h1>
    <h1>For</h1>
    <h1>{{currentUser.name}}</h1>
    <div class="card-columns">
      <div v-for="keep in keeps">
        <div class="card col-6">
          <!-- <img class="card-img-top" :src="vault.image"> -->
          <router-link :to="{name: 'keepDetails', params:{id: keep.id}}">
            <h1 class="card-title titles">{{keep.name}}</h1>
          </router-link>
          <div>
            <button class="btn btn-success" @click="Modal">Create Keep</button>
            <button class="btn btn-danger" @click="deleteKeep(keep._id)">Delete</button>
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
      return {

      }
    },
    mounted() {
      this.$store.dispatch("getKeeps")

    },
    computed: {
      keeps() {
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
      createKeep(id) {
        this.$store.dispatch('createKeep', id)
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
