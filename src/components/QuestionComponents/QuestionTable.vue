<template>
  <div>
    <div class="topBtnDivStyle">
        <router-link to="/reglage-date-limite">
            <b-button variant="outline-secondary" class="setDateBtnStyle">Réglage date limite</b-button>
        </router-link>
        <router-link to="/nouvelle-question">
            <b-button  > Nouvelle question </b-button>
        </router-link>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col" class="idColStyle">#</th>
          <th scope="col">Questions</th>
          <th scope="col">Sce</th>
          <th scope="col">Poste</th>
          <th scope="col" class="actionColStyle">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="question in result" v-bind:key="question.id">
          <th scope="row" class="numberColStyle">{{ question.id }}</th>
          <td class="questionColStyle">
            {{question.description}}
          </td>
          <td class="sceColStyle">
            {{question.sce}}
          </td>
          <td class="posteColStyle">
            {{question.poste_name}}
          </td>
          <td >
            <div class="inline-block">
                <a :href="'#/questions/' + question.id" class="editBtnStyle"> <b-button variant="light">Editer</b-button> </a>
                <a :href="'#/questions/supprimer/' + question.id"> <b-button variant="danger">Supprimer</b-button> </a>
            </div>
            
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

export default {
  name: "QuestionTable",
  data() {
    return {
      result: undefined,
    };
  },
  methods: {
    actualise() {
      const headers = this.getAccessHeader();
      Vue.axios.get(this.$store.state.baseUrl+"/questions",{headers}).then((response) => {
        this.result = response.data;
      }).catch(()=>{
              this.globalRefreshShowMsgBox('Info','C\'est possible qu\'il y ait une erreur\n Actualisation de la session','secondary')
        });
    },
  },
  mounted() {
    this.actualise()
  },
  beforeMount(){
        if(this.$store.state.user.role != 'ADMIN'){
            this.$router.push({ name: "connectionRoute" });
            this.$store.commit('setUser',null)
        }
    },
};
</script>

<style scoped>
    .topBtnDivStyle{
        float: right;
        margin-bottom: 1.0em;
    }
    .setDateBtnStyle{
        margin-right: 1.0em;
    }
    .questionColStyle{
        width: 30%;
    }
    .sceColStyle{
        width: 20%;
    }
    .posteColStyle{
        width: 20%;
    }
    .idColStyle{
        width: 5%;
    }
    .actionColStyle{
        width: 10%;
    }
    .editBtnStyle{
        margin-right: 0.5em;
    }
</style>