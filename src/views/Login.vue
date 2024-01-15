<!-- src/views/Login.vue -->

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
      <h2 class="text-2xl font-semibold mb-4">Login</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email:</label>
          <input v-model="email" type="text" id="email" class="w-full p-2 border rounded mt-1">
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Password:</label>
          <input v-model="password" type="password" id="password" class="w-full p-2 border rounded mt-1">
        </div>
        <button type="submit" class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '@/services/axiosService'

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    handleSubmit() {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      });
      axios.post('/login/', {
        email: this.email,
        password: this.password,
      })
          .then(response => {
            this.$router.push('/');
            this.$store.dispatch('login', response.data.access);
            this.$store.commit('setUser', response.data.user.unit_id);
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('user', response.data.user.unit_id);
          })
          .catch(error => {
            console.error('Login error:', error.response.data);
          });
    },
  },
};
</script>
