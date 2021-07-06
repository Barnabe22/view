<template>
    <div>
        <h2 class="rapportTitleStyle">Authentifiez vous</h2>
            <div class="formDivStyle">
            
                <label for="input-pw">Saisissez votre mot de passe actuel:</label>
                <b-form-input
                id="input-pw"
                v-model="userLogin.password"
                type="password"
                placeholder="Entrez votre mot de passe actuel"
                required
                ></b-form-input>
                <div class="inline-block saveBtnStyle">
                    <b-button v-on:click="redirectToProfile" class="cancelBtnStyle" variant="danger"
                    >Retour</b-button
                    >
                    <b-button
                    v-on:click="authenticate"
                    class="submitButtonStyle0"
                    variant="success"
                    >Valider</b-button>
                </div>
            </div>
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

export default {
    name:'Authentication',
    data(){
        return{
            userLogin:{
                pseudo:this.$store.state.user.pseudo,
                password:''
            }
        }
    },
    methods:{
         authenticate(){
            const headers = this.getAccessHeader();
            Vue.axios
            .post(this.$store.state.baseUrl + "/login", this.userLogin,{headers})
            .then(() => {
                    this.redirectToModification()
            }).catch(()=>{
                this.globalRefreshShowMsgBox('Erreur','Mot de passe incorrect','danger')
            });
        },
        redirectToProfile() {
            this.$router.push({ name: "profileRoute" });
        },
        redirectToModification() {
            this.$router.push({ name: "passwordRoute" });
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