<template>
    <div>
        <NewSce 
            :sce="sce"
            mode="UPDATE_MODE"
            :pagetitle="'Service #'+sceId"
            />
            
    </div>
</template>

<script>
import NewSce from './NewSce'
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

export default {
    name:'EditSce',
    components:{
        NewSce,
    },
    data(){
        return{
            sceId: this.$route.params.id,
            sce:undefined,
            result: undefined,
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
        Vue.axios.get(this.$store.state.baseUrl+"/sce/" + this.sceId,{headers})
        .then((response) => {
          this.sce = response.data;
        }).catch(()=>{
              this.globalRefreshShowMsgBox('Info','C\'est possible qu\'il y ait une erreur\n Actualisation de la session','secondary')
          });
    }

}
</script>