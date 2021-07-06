<template>
    <div>
        <NewFiliale 
            :filiale="filiale"
            mode="UPDATE_MODE"
            :pagetitle="'Filiale #'+filialeId"
            />
            
    </div>
</template>

<script>
import NewFiliale from './NewFiliale'
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

export default {
    name:'EditFiliale',
    components:{
        NewFiliale,
    },
    data(){
        return{
            filialeId: this.$route.params.id,
            filiale:undefined,
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
        const headers = this.getAccessHeader()
        Vue.axios.get(this.$store.state.baseUrl+"/filiales/" + this.filialeId,{headers})
        .then((response) => {
          this.filiale = response.data;
        }).catch(()=>{
            this.globalRefreshShowMsgBox('Info','C\'est possible qu\'il y ait une erreur\n Actualisation de la session','secondary')
        });
    }

}
</script>