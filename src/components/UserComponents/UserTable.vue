<template>
  <div>
    <router-link to="/nouveau-collaborateur">
        <b-button  class="newBtnStyle"> Nouveau collaborateur </b-button>
    </router-link>
    <table class="table">
      <thead>
        <tr>
          <th scope="col" class="idColStyle">#</th>
          <th scope="col">Noms</th>
          <th scope="col">Prénoms</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col" class="actionsColStyle">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in result" v-bind:key="user.id">
          <th scope="row" class="numberColStyle">{{ user.id }}</th>
          <td >
            {{user.name}}
          </td>
          <td >
            {{user.surname}}
          </td>
          <td >
            {{user.email}}
          </td>
          <td >
            {{user.role}}
          </td>
          <td >
            <div class="inline-block">
                <a :href="'#/collaborateurs/' + user.id" class="editBtnStyle"> <b-button variant="light">Editer</b-button> </a>
                <a :href="'#/collaborateurs/supprimer/' + user.id"> <b-button variant="danger">Supprimer</b-button> </a>
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
  name: "UserTable",
  data() {
    return {
      result: undefined,
    };
  },
  methods: {
    actualise() {
      const headers = this.getAccessHeader();
      Vue.axios.get(this.$store.state.baseUrl+"/users",{headers}).then((response) => {
        this.result = response.data;
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
    .newBtnStyle{
        float: right;
        margin-bottom: 1.0em;
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
    .numberColStyle{
        width: 10%;
    }
    .idColStyle{
        width: 5%;
    }
    .actionsColStyle{
        width: 10%;
    }
    .editBtnStyle{
        margin-right: 0.5em;
    }
</style>