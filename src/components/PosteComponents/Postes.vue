<template>
    <div>
        <h2 class="rapportTitleStyle">Liste des postes</h2>
        <PosteTable/>
    </div>
</template>
<script>
import PosteTable from './PosteTable.vue'
export default {
    name:'Postes',
    components:{
        PosteTable
    },
    beforeMount(){
        if(this.$store.state.user.role != 'ADMIN'){
            this.$router.push({ name: "connectionRoute" });
            this.$store.commit('setUser',null)
        }
    },
}
</script>