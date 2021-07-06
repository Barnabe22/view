<template>
    <div>
        <h2 class="rapportTitleStyle">Liste des filiales</h2>
        <FilialeTable/>
    </div>
</template>
<script>
import FilialeTable from './FilialeTable.vue'
export default {
    name:'Filiales',
    components:{
        FilialeTable
    },
    beforeMount(){
        if(this.$store.state.user.role != 'ADMIN'){
            this.$router.push({ name: "connectionRoute" });
            this.$store.commit('setUser',null)
        }
    },
}
</script>