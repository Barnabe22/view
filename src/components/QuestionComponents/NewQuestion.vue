<template>
  <div>
    <h2 class="rapportTitleStyle">{{ pagetitle }}</h2>
    <div class="textareaStyle">
      <label for="textarea-state">Description de la question</label>
      <b-form-textarea
        id="textarea-state"
        v-model="question.description"
        :state="question.description.length >= 10"
        placeholder="Entrez au moins 10 caractère"
        rows="3"
      ></b-form-textarea>

      <b-form-checkbox
          id="checkbox-qcm"
          v-model="question.is_qcm"
          name="checkbox-qcm"
          value="true"
          unchecked-value="false"
          v-on:change="toggleCollapse"
        >
          C'est du QCM?
      </b-form-checkbox>

      <b-collapse id="collapse-qcm" class="mt-2">
        <b-card>
          <label for="suggestions-tags">Le type de QCM</label>
          <b-form-select id="qcm_mode-select-state" v-model="question.qcm_mode" :options="qcmModeOptions"></b-form-select>
          
          <label for="suggestions-tags">Les reponses possibles</label>
          <b-form-tags input-id="suggestions-tags" v-model="question.suggestions"></b-form-tags>
        </b-card>
      </b-collapse>

      <label for="sce-select-state">Service concerné</label>
      <b-form-select
        id="sce-select-state"
        v-model="question.sce"
        :options="sceOptions"
      ></b-form-select>

      <label for="poste-select-state">Poste concerné</label>
      <b-form-select
        id="poste-select-state"
        v-model="question.poste_name"
        :options="posteOptions"
      ></b-form-select>

      <div class="inline-block saveBtnStyle">
        <b-button v-on:click="redirect" class="cancelBtnStyle" variant="danger"
          >Annuler</b-button
        >
        <b-button
          v-on:click="saveQuestion"
          class="submitButtonStyle0"
          variant="success"
          >Enregister</b-button
        >
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
  name: "NewQuestion",
  props: {
    pagetitle: {type: String,default: "Nouvelle question"},
    mode: {type: String,default: "POST_MODE",},
    question:{
      type:Object,
      default(){
        return{
          id:null,
          description:"",
          sce:null,
          poste_name:null,
          is_qcm:"false",
          qcm_mode:"RADIO",
          suggestions:[]
        }
      }
    }
  },
  data() {
    return {
      sceOptions: [{ value: "Tout", text: "Tout" }],
      posteOptions: [{ value: "Tout", text: "Tout" }],
      qcmModeOptions: [{ value: 'RADIO', text: "QCM à reponse unique" },{ value: 'CHECK', text: "QCM à plusieurs reponses" }],
      result: undefined,
      collapseState:"false",
      collapseOldState:"false",
    };
  },
  methods: {
    toggleCollapse(){
      this.collapseState = this.question.is_qcm
      if(this.collapseState != this.collapseOldState){
        this.$root.$emit('bv::toggle::collapse', 'collapse-qcm')
        this.collapseOldState = this.collapseState
      }
        
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
    saveQuestion() {
      const headers = this.getAccessHeader();
      if (this.mode == "POST_MODE") {
        Vue.axios
          .post(this.$store.state.baseUrl + "/questions", this.question,{headers})
          .then(() => {
              this.showMsgBox("Confirmation", "Opération réussi", "success");
          }).catch(()=>{
              this.globalRefreshShowMsgBox('Info','C\'est possible qu\'il y ait une erreur\n Actualisation de la session','secondary')
          });
      } else if (this.mode == "UPDATE_MODE") {
        Vue.axios
          .patch(this.$store.state.baseUrl + "/questions/"+this.question.id, this.question,{headers})
          .then(() => {
            this.showMsgBox("Confirmation", "Opération réussi", "success");
          })
          .catch(()=>{
              this.globalRefreshShowMsgBox('Info','C\'est possible qu\'il y ait une erreur\n Actualisation de la session','secondary')
          });
      }
    },
    getSce() {
      const headers = this.getAccessHeader();
      Vue.axios.get(this.$store.state.baseUrl + "/sce",{headers}).then((response) => {
        this.result = response.data;
        this.result.forEach((sce) => {
          this.sceOptions.push({ value: sce.name, text: sce.name });
        });
      }).catch(()=>{
              this.globalRefreshShowMsgBox('Info','C\'est possible qu\'il y ait une erreur\n Actualisation de la session','secondary',{ name: "questionsRoute" })
          });
    },
    getPostes() {
      const headers = this.getAccessHeader();
      Vue.axios.get(this.$store.state.baseUrl + "/postes",{headers}).then((response) => {
        this.result = response.data;
        this.result.forEach((poste) => {
          this.posteOptions.push({ value: poste.name, text: poste.name });
        });
      }).catch(()=>{
              this.globalRefreshShowMsgBox('Info','C\'est possible qu\'il y ait une erreur\n Actualisation de la session','secondary',{ name: "questionsRoute" })
      });
    },
    redirect() {
      this.$router.push({ name: "questionsRoute" });
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
  },
  errorCaptured(){
      this.showMsgBox("Erreur", "Oops", "danger");
  }
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
</style>