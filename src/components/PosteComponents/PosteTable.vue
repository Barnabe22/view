<template>
  <div>
    <router-link to="/nouveau-poste">
        <b-button  class="newPosteBtnStyle"> Nouveau poste </b-button>
    </router-link>
    <table class="table">
      <thead>
        <tr>
          <th scope="col" class="idColStyle">#</th>
          <th scope="col" class="idPosteColStyle">ID du poste</th>
          <th scope="col" class="nameColStyle">Intitulé du poste</th>
          <th scope="col" class="actionColStyle">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(poste,index) in result" v-bind:key="index">
          <th scope="row">{{ index+1 }}</th>
          <td class="idPosteColStyle">
            {{poste.id}}
          </td>
          <td class="nameColStyle">
            {{poste.name}}
          </td>
          <td >
            <div class="inline-block">
                <a :href="'#/postes/' + poste.id" class="editBtnStyle"> <b-button variant="light">Editer</b-button> </a>
                <a :href="'#/postes/supprimer/' + poste.id"> <b-button variant="danger">Supprimer</b-button> </a>
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
  name: "PosteTable",
  data() {
    return {
      result: undefined,
    };
  },
  methods: {
    actualise() {
      const headers = this.getAccessHeader()
      Vue.axios.get(this.$store.state.baseUrl+"/postes", {headers}).then((response) => {
        this.result = response.data;
      }).catch(()=>{
              this.globalRefreshShowMsgBox('Info','Actualisation de la session','success')
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
    .newPosteBtnStyle{
        float: right;
        margin-bottom: 1.0em;
    }
    .nameColStyle{
        /*width: 30%;*/
        text-align: center;
    }
    .idPosteColStyle{
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