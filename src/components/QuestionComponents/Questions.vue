<template>
    <div>
        <h2 class="rapportTitleStyle">Liste des questions</h2>
        <QuestionTable/>
    </div>
</template>
<script>
import QuestionTable from './QuestionTable.vue'
export default {
    name:'Questions',
    components:{
        QuestionTable
    },
    beforeMount(){
        if(this.$store.state.user.role != 'ADMIN'){
            this.$router.push({ name: "connectionRoute" });
            this.$store.commit('setUser',null)
        }
    },
}
</script>