<template>
  <nav v-if="$store.getters.isLoggedIn" class="bg-blue-500 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <div class="lg:flex flex-grow items-center space-x-4">
        <router-link to="/" class="text-white">Personel</router-link>
        <router-link to="/unit" class="text-white">Unit</router-link>
        <router-link to="/login" class="text-white" @click="logout">Logout</router-link>
      </div>
    </div>
  </nav>
    <!-- Main Content with margin-top -->
    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 mt-16">
      <router-view></router-view>
    </main>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: true,
      navbarOpen: false,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
/* Tailwind CSS stilleri buraya gelir */
</style>
