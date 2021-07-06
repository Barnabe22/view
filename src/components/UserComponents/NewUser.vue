<template>
  <div>
    <h2 class="rapportTitleStyle">{{ pagetitle }}</h2>
    <template>
      <div class="formDivStyle">
            <label for="input-name">Nom:</label>
            <b-form-input
              id="input-name"
              v-model="user.name"
              :state="user.name.trim().length > 0"
              type="text"
              placeholder="Entrez votre nom"
              required
            ></b-form-input>

            <label for="input-surname">Prénom:</label>
            <b-form-input
              id="input-surname"
              v-model="user.surname"
              :state="user.surname.trim().length > 0"
              type="text"
              placeholder="Entrez votre prénom"
              required
            ></b-form-input>

            <label for="input-pseudo">Identifiant (Pseudonyme):</label>
            <b-form-input
              id="input-pseudo"
              :state="user.pseudo.trim().length >= 5"
              v-model="user.pseudo"
              type="text"
              placeholder="Entrez votre pseudonyme"
              required
              :readonly="mode == 'UPDATE_MODE'"
            ></b-form-input>

            <label for="input-email">Email:</label>
            <b-form-input
              id="input-email"
              v-model="user.email"
              :state="user.email.length >= 5"
              type="email"
              placeholder="Entrez votre email"
              required
            ></b-form-input>

            <span class="errorMsgStyle" v-show="err.emptyFieldError">{{errorMsg.emptyFieldMgs}}</span>

            <label for="input-role">Role:</label>
            <b-form-select
              id="input-role"
              v-model="user.role"
              :options="roleOptions"
              required
            ></b-form-select>

            <label for="input-filiale">Filiale:</label>
            <b-form-select
              id="input-filiale"
              v-model="user.filiale_name"
              :options="filialeOptions"
              required
            ></b-form-select>

            <label for="input-sce">Service:</label>
            <b-form-select
              id="input-sce"
              v-model="user.sce_name"
              :options="sceOptions"
              required
            ></b-form-select>

            <label for="input-poste">Poste:</label>
            <b-form-select
              id="input-poste"
              v-model="user.poste_name"
              :options="posteOptions"
              required
            ></b-form-select>

            <div v-if="mode == 'POST_MODE'" v-show="mode == 'POST_MODE'">
                <label for="input-pw">Mot de passe:</label>
                <b-form-input
                id="input-pw"
                v-model="user.password"
                :state="user.password.length<0 || user.password == confirm_password"
                type="password"
                placeholder="Entrez votre mot de passe"
                required
                ></b-form-input>

                <label for="input-cpw">Confirmation du mot de passe:</label>
                <b-form-input
                id="input-cpw"
                v-model="confirm_password"
                :state="user.password.length<0 || user.password == confirm_password"
                type="password"
                placeholder="Confirmez votre mot de passe"
                required
                ></b-form-input>
                <span class=" errorMsgStyle" v-show="err.pwNotMatchError">{{errorMsg.pwNotMatchMgs}}</span><br/>
            </div>

          <div class="inline-block saveBtnStyle">
            <b-button v-on:click="redirect" class="cancelBtnStyle" variant="danger"
            >Annuler</b-button
            >
            <b-button
            v-on:click="saveUser"
            class="submitButtonStyle0"
            variant="success"
            >Enregister</b-button>

        </div>
        
      </div>
    </template>
  </div>
</template>


<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

export default {
  name: "NewUser",
  props: {
    pagetitle: { type: String, default: "Nouveau collaborateur" },
    mode: { type: String, default: "POST_MODE" },
    user:{
      type:Object,
      default(){
        return{
          id: null,
          name: "",
          surname: "",
          pseudo: "",
          password: "",
          email: "",
          role: "USER",
          filiale_name: null,
          sce_name: null,
          poste_name: null,
        }
      }
    }
  },
  data() {
    return {
      confirm_password:"",
      sceOptions: [{ value: null, text: "----" }],
      posteOptions: [{ value: null, text: "----" }],
      filialeOptions: [
        { value: null, text: "----" },
      ],
      roleOptions:[{ text: 'USER', value: 'USER' },{ text: 'ADMIN', value: 'ADMIN' }],
      result: undefined,
      err:{
          emptyFieldError:false,
          pwNotMatchError:false
      },
      errorMsg:{
          emptyFieldMgs:'Veuillez remplir tous les champs',
          pwNotMatchMgs:'Les mots de passe ne correspondent pas'
      }
    };
  },
  methods: {
     emptyField(){
         if(this.user.name.trim().length ==0) return true;
         if(this.user.surname.trim().length ==0) return true;
         if(this.user.pseudo.trim().length ==0) return true;
         if(this.user.email.trim().length ==0) return true;
         return false;
     },
     passwordNotMatch(){
       if(this.mode == 'POST_MODE'){
         if((this.user.password.length > 0 || this.confirm_password.length > 0) && this.user.password != this.confirm_password ){
                return true;
            }
        }
        return false;
     },
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
    saveUser() {
        this.err.emptyFieldError = this.emptyField();
        this.err.pwNotMatchError = this.passwordNotMatch();
        const headers = this.getAccessHeader();
        if(!this.err.emptyFieldError){
            if (this.mode == "POST_MODE") {
              if(!this.err.pwNotMatchError){
                Vue.axios
                .post(this.$store.state.baseUrl + "/users", this.user,{headers})
                .then((response) => {
                    if (response.status == 200) {
                    this.showMsgBox("Confirmation", "Opération réussi", "success");
                    } else {
                    this.showMsgBox("Erreur", "Une erreur s'est produite", "danger");
                    }
                }).catch(()=>{
                  this.globalRefreshShowMsgBox('Info','C\'est possible qu\'il y ait une erreur\n Actualisation de la session','secondary')
                });
              }
            } else if (this.mode == "UPDATE_MODE") {
                Vue.axios
                .patch(this.$store.state.baseUrl + "/users/" + this.user.id, this.user, {headers})
                .then(() => {
                    this.showMsgBox("Confirmation", "Opération réussi", "success");
                })
                .catch(()=>{
                  this.globalRefreshShowMsgBox('Info','C\'est possible qu\'il y ait une erreur\n Actualisation de la session','secondary')
                });
            }
      }
    },
    getSce() {
      const headers = this.getAccessHeader();
      Vue.axios.get(this.$store.state.baseUrl + "/sce", {headers})
      .then((response) => {
        this.result = response.data;
        this.result.forEach((sce) => {
          this.sceOptions.push({ value: sce.name, text: sce.name });
        });
      }).catch(()=>{
          this.globalRefreshShowMsgBox('Info','C\'est possible qu\'il y ait une erreur\n Actualisation de la session','secondary')
        });
    },
    getPostes() {
      const headers = this.getAccessHeader();
      Vue.axios.get(this.$store.state.baseUrl + "/postes", {headers})
      .then((response) => {
        this.result = response.data;
        this.result.forEach((poste) => {
          this.posteOptions.push({ value: poste.name, text: poste.name });
        });
      }).catch(()=>{
          this.globalRefreshShowMsgBox('Info','C\'est possible qu\'il y ait une erreur\n Actualisation de la session','secondary')
        });
    },
    getFiliale() {
      const headers = this.getAccessHeader();
      Vue.axios
        .get(this.$store.state.baseUrl + "/filiales",{headers})
        .then((response) => {
          this.result = response.data;
          this.result.forEach((filiale) => {
            this.filialeOptions.push({
              value: filiale.country,
              text: filiale.country,
            });
          });
        }).catch(()=>{
            this.globalRefreshShowMsgBox('Info','C\'est possible qu\'il y ait une erreur\n Actualisation de la session','secondary')
          });
    },
    redirect() {
      this.$router.push({ name: "usersRoute" });
    },
  },
  beforeMount(){
        if(this.$store.state.user.role != 'ADMIN'){
            this.$router.push({ name: "connectionRoute" });
            this.$store.commit('setUser',null)
        }
    },
  mounted() {
    this.getSce();
    this.getPostes();
    this.getFiliale();
  },
  errorCaptured() {
    this.showMsgBox("Erreur", "Oops", "danger");
  },
};
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