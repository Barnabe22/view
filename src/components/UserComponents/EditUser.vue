<template>
    <div>
        <NewUser 
            :user="user"
            mode="UPDATE_MODE"
            :pagetitle="'Editer le profile du collaborateur '+userId"
            />
    </div>
</template>

<script>
import NewUser from './NewUser.vue'
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

export default {
    name:'EditQuestion',
    components:{
        NewUser,
    },
    data(){
        return{
            userId: this.$route.params.id,
            user:undefined,
        }
    },
    beforeMount(){
        if(this.$store.state.user.role != 'ADMIN'){
            this.$router.push({ name: "connectionRoute" });
            this.$store.commit('setUser',null)
        }
    },
    mounted(){
        const headers = this.getAccessHeader();
        Vue.axios.get(this.$store.state.baseUrl+"/users/" + this.userId, {headers})
        .then((response) => {
          this.user = response.data;
        }).catch(()=>{
              this.globalRefreshShowMsgBox('Info','C\'est possible qu\'il y ait une erreur\n Actualisation de la session','secondary')
        });
    }

}
</script>