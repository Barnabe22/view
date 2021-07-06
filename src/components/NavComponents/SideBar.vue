<template>
  <div>
    <b-button v-b-toggle.sidebar-1 class="menu">MENU</b-button>
    <b-sidebar id="sidebar-1" shadow>
      <template v-slot:title> 
        Plateforme de <span class="primaryColor">Q</span>uestionnaire
      </template>

      <Nav v-on:logout="reEmitLogoutOrder($event)"/>

    </b-sidebar>
  </div>
</template>

<script>
import Nav from './Nav.vue'
export default {
    name:'SideBar',
    components:{
      Nav
    },
    methods:{
      reEmitLogoutOrder(order){
        this.$emit('logout',order)
      }
    }
}
</script>

<style scoped>
  .menu{
    background-color: #35E763;
    color: black;
  }
</style>