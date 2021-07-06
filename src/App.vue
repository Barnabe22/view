<template>
  <div id="app">
    
    <!--<img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Login/>-->
    <Main/>

  </div>
</template>

<script>
import Main from './components/Main.vue'


export default {
  name: 'App',
  components: {
   Main,
  }
}
</script>

<style>
/*
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
.rapportTitleStyle {
  text-align: center;
}
.primaryColor{
    color: #35E763;
}
.submitButtonStyle0{
  background-color: #35E763;;
}
</style>
