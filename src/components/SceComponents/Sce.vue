<template>
    <div>
        <h2 class="rapportTitleStyle">Liste des services</h2>
        <SceTable/>
    </div>
</template>
<script>
import SceTable from './SceTable.vue'
export default {
    name:'Sce',
    components:{
        SceTable
    },
    beforeMount(){
        if(this.$store.state.user.role != 'ADMIN'){
            this.$router.push({ name: "connectionRoute" });
            this.$store.commit('setUser',null)
        }
    },
}
</script>