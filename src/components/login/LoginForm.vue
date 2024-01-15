<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required>

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      // Burada kullanıcı kimlik doğrulama işlemlerini gerçekleştirin
      if (this.username === 'example' && this.password === 'password') {
        // Başarılı giriş durumu
        this.$emit('login', true); // Ana bileşene login durumunu iletiyoruz
      } else {
        // Hatalı giriş durumu
        alert('Invalid username or password');
      }
    },
  },
};
</script>
