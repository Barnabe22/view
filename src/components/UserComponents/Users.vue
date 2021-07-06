<template>
    <div>
        <h2 class="rapportTitleStyle">Liste des collaborateurs</h2>
        <UserTable/>
    </div>
</template>
<script>
import UserTable from './UserTable.vue'
export default {
    name:'Users',
    components:{
        UserTable
    },
    beforeMount(){
        if(this.$store.state.user.role != 'ADMIN'){
            this.$router.push({ name: "connectionRoute" });
            this.$store.commit('setUser',null)
        }
    },
    
}
</script>