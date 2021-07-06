<template>
  <div>
    <h2 class="rapportTitleStyle">Rapport # {{ rapportId }}</h2>
    <h5 v-if="user != null" class="rapportTitleStyle"> <span class="primaryColor">Auteur:</span> {{user.surname}} {{user.name}}</h5>
    <h5 v-else class="rapportTitleStyle"> <span class="primaryColor">Auteur:</span> Collaborateur supprimé </h5>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Questions</th>
          <th scope="col">Reponses</th>
          <th scope="col">Commentaires</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rep,index) in reponses" v-bind:key="index">
          <th scope="row">{{index+1}}</th>
          <td> {{questions_desc[index]}}</td>
          <td>{{reponses[index]}}</td>
          <td>{{comments[index]}}</td>
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
  name: "EditReport",

  data() {
    return {
      rapportId: this.$route.params.id,
      report: undefined,
      questions_desc: [],
      reponses: [],
      comments: [],
      user:{
        id: null,
        name: "",
        surname: ""
      },
    };
  },
  methods: {
      
  },
  beforeMount(){
        if(this.$store.state.user.role != 'ADMIN'){
            this.$router.push({ name: "connectionRoute" });
            this.$store.commit('setUser',null)
        }
    },
  mounted() {
      const headers = this.getAccessHeader();
      Vue.axios.get(this.$store.state.baseUrl+"/rapports/" + this.rapportId,{headers})
        .then((response) => {
          this.report = response.data;
          this.reponses= this.report.reponses
          this.questions_desc = this.report.questions_desc
          this.comments = this.report.comments
          this.user = this.report.user
        }).catch(()=>{
              this.globalRefreshShowMsgBox('Info','C\'est possible qu\'il y ait une erreur\n Actualisation de la session','secondary')
          });
  },
  computed:{
      
  }
};
</script>
