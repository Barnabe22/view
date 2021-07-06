<template>
    <div>
        <NewQuestion 
            :question="question"
            mode="UPDATE_MODE"
            :pagetitle="'Question #'+questionId"
            
            />
            <!--:id="question.id"
            :description="question.description"
            :sce="question.sce"
            :poste_name="question.poste_name"-->
    </div>
</template>

<script>
import NewQuestion from './NewQuestion.vue'
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

export default {
    name:'EditQuestion',
    components:{
        NewQuestion,
    },
    data(){
        return{
            questionId: this.$route.params.id,
            question:undefined,
            sceOptions: [{ value: null, text: 'Veuillez selectionner un SCE' }],
            posteOptions: [{ value: null, text: 'Veuillez selectionner un poste' }],
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
        Vue.axios.get(this.$store.state.baseUrl+"/questions/" + this.questionId,{headers})
        .then((response) => {
          this.question = response.data;
        }).catch(()=>{
              this.globalRefreshShowMsgBox('Info','C\'est possible qu\'il y ait une erreur\n Actualisation de la session','secondary')
        });
    }

}
</script>