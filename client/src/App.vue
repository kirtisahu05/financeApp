<template>
  <div id="app">
          <!-- :nav-links="navLinks" -->
    <AppLayout
      :image-path="require('./assets/logo.png')"
      background="#fff"
      link-color="#777"
      hoverBackground="#ddd"
      />
  </div>
</template>

<script>
import AppLayout from '@/components/AppLayout';
export default {
  name: 'app',
  components: {
    AppLayout
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
