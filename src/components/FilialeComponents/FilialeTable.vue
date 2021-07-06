<template>
  <div>
    <router-link to="/nouvelle-filiale">
        <b-button  class="newFilialeBtnStyle"> Nouvelle filiale </b-button>
    </router-link>
    <table class="table">
      <thead>
        <tr>
          <th scope="col" class="idColStyle">#</th>
          <th scope="col" class="idFilialeColStyle">ID de la filiale</th>
          <th scope="col" class="countryColStyle">Noms du pays</th>
          <th scope="col" class="actionColStyle">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(filiale,index) in result" v-bind:key="index">
          <th scope="row">{{ index+1 }}</th>
          <td class="idFilialeColStyle">
            {{filiale.id}}
          </td>
          <td class="countryColStyle">
            {{filiale.country}}
          </td>
          <td >
            <div class="inline-block">
                <a :href="'#/filiales/' + filiale.id" class="editBtnStyle"> <b-button variant="light">Editer</b-button> </a>
                <a :href="'#/filiales/supprimer/' + filiale.id"> <b-button variant="danger">Supprimer</b-button> </a>
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
  name: "FilialeTable",
  data() {
    return {
      result: undefined,
    };
  },
  methods: {
    actualise() {
      const headers = this.getAccessHeader()
      Vue.axios.get(this.$store.state.baseUrl+"/filiales",{headers}).then((response) => {
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
    .newFilialeBtnStyle{
        float: right;
        margin-bottom: 1.0em;
    }
    .countryColStyle{
        /*width: 30%;*/
        text-align: center;
    }
    .idFilialeColStyle{
        text-align: center;
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