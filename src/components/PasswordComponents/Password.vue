<template>
    <div>
        <h2 class="rapportTitleStyle">Modifier votre mot de passe</h2>
        <div class="formDivStyle">
        
            <label for="input-pw">Nouveau mot de passe:</label>
            <b-form-input
            id="input-pw"
            v-model="newPassword.password"
            :state="newPassword.password.length<0 || newPassword.password == confirm_password"
            type="password"
            placeholder="Entrez votre mot de passe"
            required
            ></b-form-input>

            <label for="input-cpw">Confirmez le nouveau mot de passe:</label>
            <b-form-input
            id="input-cpw"
            v-model="confirm_password"
            :state="newPassword.password.length<0 || newPassword.password == confirm_password"
            type="password"
            placeholder="Confirmez votre mot de passe"
            required
            ></b-form-input>
            <span class=" errorMsgStyle" v-show="err.pwNotMatchError">{{errorMsg.pwNotMatchMgs}}</span><br/>

            <div class="inline-block saveBtnStyle">
                <b-button v-on:click="redirect" class="cancelBtnStyle" variant="danger"
                >Annuler</b-button
                >
                <b-button
                v-on:click="savePassword"
                class="submitButtonStyle0"
                variant="success"
                >Modifier</b-button>
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
    name:'Password',
    data(){
        return{
            newPassword:{
                password:''
            },
            confirm_password:'',
            err:{
                emptyFieldError:false,
                pwNotMatchError:false
            },
            errorMsg:{
                emptyFieldMgs:'Veuillez remplir tous les champs',
                pwNotMatchMgs:'Les mots de passe ne correspondent pas'
            }
        }
    },
    methods:{
        showMsgBox(title, msg, btnVariant) {
        this.$bvModal
            .msgBoxOk(msg, {
            title: title,
            size: "sm",
            buttonSize: "sm",
            okVariant: btnVariant,
            headerClass: "p-2 border-bottom-0",
            footerClass: "p-2 border-top-0",
            centered: true,
            })
            .then(() => {
            if (title == "Confirmation") {
                this.redirect();
            }
            });
        },
        savePassword(){
            this.err.pwNotMatchError = this.passwordNotMatch();
            const headers = this.getAccessHeader();
            if(!this.err.pwNotMatchError){
                Vue.axios
                .post(this.$store.state.baseUrl + "/new_password", this.newPassword,{headers})
                .then(() => {
                    this.showMsgBox("Confirmation", "Opération réussi", "success");
                }).catch(()=>{
                  this.globalRefreshShowMsgBox('Erreur','Une erreur est survenue lors de l\'operation','danger')
                });
              }
        },
        redirect(){
            this.$router.push({ name: "profileRoute" });
        },
        passwordNotMatch(){
            if((this.newPassword.password.length > 0 || this.confirm_password.length > 0) && this.newPassword.password != this.confirm_password ){
                    return true;
            }
            return false;
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