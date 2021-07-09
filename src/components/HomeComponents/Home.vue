<template>
    <div>
        <h2 class="rapportTitleStyle">Accueil</h2>
        <div class="homeMsg1Style">
            P<span class="primaryColor">Q</span>
        </div>
        <div class="wcmMsgStyle">
            <p>
                <strong> Bienvenu sur la plateforme de questionnaire </strong> 
            </p>
            <p v-if="this.$store.state.user.role == 'ADMIN'">
                Gerez les collaborateurs, postes, services, questions et filiales en cliquant sur le bouton MENU
            </p>
            <p v-else-if="this.$store.state.user.role == 'USER'">
                Repondez aux questions en cliquant sur le bouton MENU
            </p>
        </div>
        
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
export default {
    name:'Home',
    data(){
        return{
            user:undefined,
        }
    },
    methods:{
        loadUser(){
            const headers = this.getAccessHeader()
            Vue.axios.get(this.$store.state.baseUrl +'/profile',{headers})
            .then(response=>{
                this.user = response.data
                this.storeUser(this.user)
            }).catch(()=>{
                this.globalRefreshShowMsgBox('Info','C\'est possible qu\'il y ait une erreur\n Actualisation de la session','secondary')
            })
        },
    },
    mounted(){
        if(this.$store.state.user == undefined){
            this.loadUser()
        }    
    },
}
</script>

<style scoped>
    .homeMsg1Style{
        text-align: center;
        font-size: 300px;
    }
    .wcmMsgStyle{
        text-align: center;
        font-size: 20px;
    }
</style>