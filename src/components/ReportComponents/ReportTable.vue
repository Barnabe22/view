<template>
  <div>
    <b-button v-on:click="actualise" class="refreshBtnStyle" > Rafraîchir </b-button>
    <table class="table">
      <thead>
        <tr>
          <th scope="col" class="numberColStyle">#</th>
          <th scope="col" class="questionColStyle">Agent</th>
          <th scope="col" class="reportNumberStyle">Numero du rapport</th>
          <th scope="col" class="reportNumberStyle">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="result in results" v-bind:key="result.id">
          <th scope="row" >{{ result.id }}</th>
          <td v-if="result.user != null " >{{ result.user.surname }} {{ result.user.name }}</td>
          <td v-else >Collaborateur supprimé</td>
          <td >{{ result.id }}</td>
          <td ><a :href="'#/rapport/'+result.id"><b-button variant="light">Voir</b-button></a></td>
          
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
  name: "ReportTable",
  data() {
    return {
      results: undefined,
    };
  },
  methods: {

    actualise() {
      const headers = this.getAccessHeader();
      Vue.axios.get(this.$store.state.baseUrl+"/rapports",{headers}).then((response) => {
        this.results = response.data;
      }).catch(()=>{
            this.globalRefreshShowMsgBox('Info','C\'est possible qu\'il y ait une erreur\n Actualisation de la session','secondary')
      });
    },
  },
  beforeMount(){
        if(this.$store.state.user.role != 'ADMIN'){
            this.$router.push({ name: "connectionRoute" });
            this.$store.commit('setUser',null)
        }
    },
  mounted() {
    this.actualise()
  },
};
</script>

<style scoped>
    .refreshBtnStyle{
        float: right;
        margin-bottom: 1.0em;
    }
    .questionColStyle{
        width: 50%;
    }
    .numberColStyle{
        width: 10%;
    }
    /*.reportNumberStyle{
        text-align: center;
    }*/
</style>