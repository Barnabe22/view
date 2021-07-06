<template>
  <div>
    <b-nav vertical class="w-25">
       <b-nav-item> <router-link to="/accueil">Accueil</router-link> </b-nav-item>
       <div v-show="this.$store.state.user != undefined && this.$store.state.user.role == 'USER'">
          <b-nav-item> <router-link to="/repondre">Repondre aux questions</router-link> </b-nav-item>
       </div>
      <div v-show="this.$store.state.user != undefined && this.$store.state.user.role == 'ADMIN'">
        <b-nav-item active> <router-link to="/collaborateurs">Collaborateurs</router-link> </b-nav-item>
        <b-nav-item> <router-link to="/filiales">Filiales</router-link> </b-nav-item>
        <b-nav-item> <router-link to="/postes">Postes</router-link> </b-nav-item>
        <b-nav-item> <router-link to="/services">Services</router-link> </b-nav-item>
        <b-nav-item><router-link to="/questions">Questions</router-link> </b-nav-item>
        <b-nav-item> <router-link to="/reponses">Reponses/Rapport</router-link> </b-nav-item>
        <!--<b-nav-item> <router-link v-on:click="performLogout" >Deconnexion</router-link> </b-nav-item>-->
      </div>
      <b-nav-item><router-link to="/profile-utilisateur">Profile</router-link> </b-nav-item>
      <b-nav-item> <b-button v-on:click="performLogout" variant="danger">Deconnexion</b-button> </b-nav-item>
      <!--<b-nav-item disabled>Disabled</b-nav-item>-->
    </b-nav>
  </div>
</template>

<script>
export default {
  name: "Nav",
  methods:{
    performLogout(){
      this.$router.push({name:'deconnexionRoute'})
      //this.$emit('logout',false)
    }
  },
};
</script>