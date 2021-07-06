<template>
    <div>
        <NewPoste 
            :poste="poste"
            mode="UPDATE_MODE"
            :pagetitle="'Poste #'+posteId"
            />
            
    </div>
</template>

<script>
import NewPoste from './NewPoste'
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

export default {
    name:'EditPoste',
    components:{
        NewPoste,
    },
    data(){
        return{
            posteId: this.$route.params.id,
            poste:undefined,
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
        Vue.axios.get(this.$store.state.baseUrl+"/postes/" + this.posteId,{headers})
        .then((response) => {
          this.poste = response.data;
        }).catch(()=>{
              this.globalRefreshShowMsgBox('Info','Actualisation de la session','success')
        });
    }

}
</script>