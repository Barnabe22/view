<template>
  <div>
    <div v-if="badResponse" class="errorMessageStyle"> Identifiant ou mot de passe incorrect </div>
    <b-form @submit.stop.prevent>
      <!--ID input -->
      <div class="bottomStyle">
        <label for="feedback-user">Identifiant</label>
        <b-form-input
          v-model="userLogin.pseudo"
          :state="pseudoValidation"
          id="feedback-user"
        ></b-form-input>
        <b-form-invalid-feedback :state="pseudoValidation">
          Le nombre de caractère de l'ID doit être compris entre 5 et 12
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="pseudoValidation"> </b-form-valid-feedback>
      </div>
      <!-- -->

      <!-- Password input -->
      <div class="bottomStyle">
        <label for="text-password">Mot de passe</label>
        <b-form-input
          v-model="userLogin.password"
          :state="passwordValidation"
          type="password"
          id="text-password"
          aria-describedby="password-help-block"
        ></b-form-input>
        <b-form-invalid-feedback :state="passwordValidation">
          Le mot de passe doit contenir au moins 4 caractères.
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="passwordValidation">
        </b-form-valid-feedback>
        <!--<b-form-text id="password-help-block">
          Your password must be 8-20 characters long, contain letters and numbers,
          and must not contain spaces, special characters, or emoji.
        </b-form-text>  -->
      </div>
      <!-- -->

      <!--submit button -->
      <b-button class="bottomStyle submitButtonStyle submitButtonStyle0" @click="performLogin" variant="success">
        Se connecter
      </b-button>
    </b-form>
    <!--
    <b-button  v-on:click="increment" variant="secondary">
        increment
    </b-button>-->
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default {
  name: "Form",
  props: {
  },
  data() {
    return {
      userLogin: {
        pseudo: "",
        password: "",
      },
      badResponse : false,
      connectionState:false,
    };
  },
  methods: {
    performLogin() {
      Vue.axios.post('http://216.137.189.207:8080/questionnaire/login', this.userLogin)
      .then((response)=>{
        if( response.status == 200){
          this.connectionState = true;
          this.badResponse = false;
          this.storePseudo(this.userLogin.pseudo);
          this.storeAccessToken(response.data.access_token)
          this.storeRefreshToken(response.data.refresh_token)
          this.storeConnectionState(this.connectionState)
          //this.$emit('submit',this.connectionState)
          this.redirect()
          
        }else{
          this.connectionState = false;
          this.badResponse = true;
        }
        
      }).catch(()=>{
        this.connectionState = false;
        this.badResponse = true;
        this.globalSimple2ShowMsgBox("Erreur serveur","Problème de communication \n avec le serveur","danger")
      });
    },
    redirect(){
      this.$router.push({ name: "accueilRoute" });
    }
  },
  computed: {
    pseudoValidation() {
      return this.userLogin.pseudo.length > 4 && this.userLogin.pseudo.length < 13;
    },
    passwordValidation() {
      return this.userLogin.password.length >= 4;
    },
  },
  beforeMount(){
        if(this.$store.state.user != undefined && this.$store.state.user.role != 'ADMIN'){
            this.$router.push({ name: "connectionRoute" });
            this.$store.commit('setUser',undefined)
        }
    },
};
</script>
<style scoped>
.bottomStyle {
  margin-bottom: 1em;
}
.submitButtonStyle{
  margin-top: 0.5em;
  width: 100%;
}
.errorMessageStyle{
  color: red;
  width: 100%;
  text-align: right;
}

</style>