<template>
  <div class="Keeps">
    <h1 class="mt-5 h1">My Keeps</h1>
    <h1>For</h1>
    <h1>{{currentUser.name}}</h1>
    <div class="card-columns">
        <button @click="toggleModal(1)">Create a Keep</button>
      <div class="card col-6">
        <!-- <img class="card-img-top" :src="vault.image"> -->
        <router-link :to="{name: 'keepDetails', params:{id: keep.id}}">
          <h1 class="card-title titles">{{keep.name}}</h1>
        </router-link>
        <div>
          <button @click="toggleModal(1)">Create a Keep</button>
          <modal :toggle="showModal">
            <div slot="header">
              <h3>Create Keep</h3>
            </div>
            <div>
              <form @submit.prevent="createKeep">
                <input type="text" v-model="keep.name" required>
                <button type="submit">Create Keep</button>
                <input type="url" placeholder="Keep Image Url" v-model="keep.image">
                <input type="text" placeholder="Keep Description" v-model="Keep.Description">
              </form>
            </div>
          </modal>
          <button class="btn btn-danger" @click="deleteKeep(keep._id)">Delete</button>
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
  ul {
    list-style: none
  }

  .vaults {
    text-align: center
  }

</style>
