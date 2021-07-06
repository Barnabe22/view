<template>
  <div>
    <router-link to="/nouveau-service">
        <b-button  class="newSceBtnStyle"> Nouveau service </b-button>
    </router-link>
    <table class="table">
      <thead>
        <tr>
          <th scope="col" class="idColStyle">#</th>
          <th scope="col" class="idSceColStyle">ID du service</th>
          <th scope="col" class="nameColStyle">Intitulé du service</th>
          <th scope="col" class="actionColStyle">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(sce,index) in result" v-bind:key="index">
          <th scope="row">{{ index+1 }}</th>
          <td class="idSceColStyle">
            {{sce.id}}
          </td>
          <td class="nameColStyle">
            {{sce.name}}
          </td>
          <td >
            <div class="inline-block">
                <a :href="'#/services/' + sce.id" class="editBtnStyle"> <b-button variant="light">Editer</b-button> </a>
                <a :href="'#/services/supprimer/' + sce.id"> <b-button variant="danger">Supprimer</b-button> </a>
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
  name: "SceTable",
  data() {
    return {
      result: undefined,
    };
  },
  methods: {
    actualise() {
      const headers = this.getAccessHeader();
      Vue.axios.get(this.$store.state.baseUrl+"/sce",{headers}).then((response) => {
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
    .newSceBtnStyle{
        float: right;
        margin-bottom: 1.0em;
    }
    .nameColStyle{
        /*width: 30%;*/
        text-align: center;
    }
    .idSceColStyle{
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