<template>
  <div class="vaults">
    <h1 class="mt-5 h1">My Vaults</h1>
    <div class="card-columns">
      <!-- <div v-if=currentUser._id></div> -->
      <div v-for="vault in vaults">
        <div class="card col-6">
          <img class="card-img-top" :src="vault.image">
          <router-link :to="{name: 'VaultDetails', params:{id: vault._id}}">
            <h1 class="card-title titles">{{vault.title}}</h1>
          </router-link>
          <button @click="deleteVault(vault._id)">Delete</button>
        </div>
      </div>
      <button>hello</button>
      </div>

    </div>
</template>

<script>
  export default {
    name: 'Vaults',

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
      },
      currentUser() {
        return this.$store.state.currentUser
      }
    },
    methods: {
      deleteVault(id) {
        this.$store.dispatch('deleteVault', id)
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
