<template>
  <div>
    <h2 class="rapportTitleStyle">{{ pagetitle }}</h2>
    <div class="textareaStyle">
      <label for="filiale-state">Filiale</label>
      <b-form-input id="filiale-state" v-model="filiale.country" placeholder="Entrez une filiale"></b-form-input>
      
      <div class="inline-block saveBtnStyle">
        <b-button v-on:click="redirect" class="cancelBtnStyle" variant="danger"
          >Annuler</b-button
        >
        <b-button
          v-on:click="saveFiliale"
          class="submitButtonStyle0"
          variant="success"
          >Enregister</b-button>
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
  name: "NewFiliale",
  props: {
    pagetitle: {type: String,default: "Nouvelle filiale"},
    mode: {type: String,default: "POST_MODE",},
    filiale:{
      type:Object,
      default(){
        return{
          id:null,
          country:"",
        }
      }
    }
  },
  data() {
    return {
      result: undefined,
    };
  },
  methods: {
    
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
    saveFiliale() {
      const headers = this.getAccessHeader()
      if (this.mode == "POST_MODE") {
        Vue.axios
          .post(this.$store.state.baseUrl + "/filiales", this.filiale,{headers})
          .then(() => {
              this.showMsgBox("Confirmation", "Filiale enregistrée avec succès", "success");
          }).catch(()=>{
              this.globalRefreshShowMsgBox('Info','C\'est possible qu\'il y ait une erreur\n Actualisation de la session','secondary')
          });
      } else if (this.mode == "UPDATE_MODE") {
        Vue.axios
          .patch(this.$store.state.baseUrl + "/filiales/"+this.filiale.id, this.filiale,{headers})
          .then(() => {
            this.showMsgBox("Confirmation", "Modifications effectuées avec succès", "success");
          })
          .catch(() => {
            this.globalRefreshShowMsgBox('Info','C\'est possible qu\'il y ait une erreur\n Actualisation de la session','secondary')
          });
      }
    },
    redirect() {
      this.$router.push({ name: "filialesRoute" });
    },
  },
  beforeMount(){
        if(this.$store.state.user.role != 'ADMIN'){
            this.$router.push({ name: "connectionRoute" });
            this.$store.commit('setUser',null)
        }
    },
  mounted() {
  },
};
</script>

<style scoped>
.inputStyle {
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
</style>