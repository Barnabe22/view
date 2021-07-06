<template>
    <div>
        <h2 class="rapportTitleStyle">Votre profile</h2>
        <div class="formDivStyle">
            <label for="input-name">Nom:</label>
            <b-form-input
              id="input-name"
              v-model="user.name"
              type="text"
              readonly
            ></b-form-input>

            <label for="input-surname">Prénom:</label>
            <b-form-input
              id="input-surname"
              v-model="user.surname"
              type="text"
              readonly
            ></b-form-input>

            <label for="input-pseudo">Identifiant (Pseudonyme):</label>
            <b-form-input
              id="input-pseudo"
              v-model="user.pseudo"
              type="text"
              readonly
            ></b-form-input>

            <label for="input-email">Email:</label>
            <b-form-input
              id="input-email"
              v-model="user.email"
              type="email"
              readonly
            ></b-form-input>


            <label for="input-filiale">Filiale:</label>
            <b-form-input
              id="input-filiale"
              v-model="user.filiale_name"
              type="text"
              readonly
            ></b-form-input>

            <label for="input-sce">Service:</label>
            <b-form-input
              id="input-sce"
              v-model="user.sce_name"
              type="text"
              readonly
            ></b-form-input>

            <label for="input-poste">Poste:</label>
            <b-form-input
              id="input-poste"
              v-model="user.poste_name"
              type="text"
              readonly
            ></b-form-input>

          <div class="inline-block saveBtnStyle">
            <b-button v-on:click="redirect" class="cancelBtnStyle" variant="danger"
            >Retour</b-button
            >
            <b-button
            v-on:click="redirectToAuthentication"
            class="submitButtonStyle0"
            variant="success"
            >Modifier le mot de passe</b-button>

        </div>
        
      </div>
    </div>
</template>

<script>
export default {
    name:'Profile',
    data(){
        return{
            user:this.$store.state.user,
        }
    },
    methods:{
        redirect() {
            this.$router.push({ name: "accueilRoute" });
        },
        redirectToAuthentication() {
            this.$router.push({ name: "authenticationRoute" });
        },
    }
}
</script>

<style scoped>
.textareaStyle {
  margin-left: 100px;
  margin-right: 100px;
  margin-top: 50px;
}
.saveBtnStyle {
  float: right;
  margin-top: 1em;
}
.cancelBtnStyle {
  margin-right: 0.5em;
}
.formDivStyle{
    margin-right: 20%;
    margin-left: 20%;
}
.errorMsgStyle{
    float: right;
    color: red;
}
</style>