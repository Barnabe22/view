<template>
    <div>
        <h2 class="rapportTitleStyle">Suppression de la question # {{questionId}}</h2>
        <div class="contentStyle">
            <strong class="demandStyle">Voulez vous vraiment supprimer la question {{questionId}} ? </strong> 
            <div class="inline-block btnStyle">
                <b-button variant="secondary" v-on:click="redirect" class="cancelBtnStyle">Annuler</b-button>
                <b-button variant="danger" v-on:click="performDelete">Supprimer</b-button>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

export default {
    name:'DeleteQuestion',
    data(){
        return{
            questionId: this.$route.params.id,
        }
    },
    methods:{
        redirect() {
            this.$router.push({ name: "questionsRoute" });
        },
        performDelete(){
            const headers = this.getAccessHeader();
            Vue.axios.delete(this.$store.state.baseUrl+"/questions/" + this.questionId,{headers})
            .then(() => {
                this.showMsgBox("Confirmation", "Opération réussi", "success");
            }).catch(()=>{
              this.globalRefreshShowMsgBox('Info','C\'est possible qu\'il y ait une erreur\n Actualisation de la session','secondary')
          });
        },
        showMsgBox(title, msg, btnVariant) {
            this.$bvModal
            .msgBoxOk(msg, {
            title: title,
            size: "sm",
            buttonSize: "sm",
            okVariant: btnVariant,
            headerClass: "p-2 border-bottom-0",
            footerClass: "p-2 border-top-0",
            centered: true,
            })
            .then(() => {
            if (title == "Confirmation") {
                this.redirect();
            }
        });
    }
    },
    beforeMount(){
        if(this.$store.state.user.role != 'ADMIN'){
            this.$router.push({ name: "connectionRoute" });
            this.$store.commit('setUser',null)
        }
    }

}
</script>

<style scoped>
    .contentStyle{
        margin-top: 150px;
        text-align: center;
    }
    .btnStyle{
        margin-top: 20px ;
    }
    .cancelBtnStyle{
        margin-right: 1.0em;
    }
</style>