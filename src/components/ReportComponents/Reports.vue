<template>
  <div>
    <h2 class="rapportTitleStyle">Listes des rapports</h2>
    <ReportTable/>
  </div>
</template>

<script>
import ReportTable from './ReportTable.vue'
export default {
  name: "Reports",
  components:{
        ReportTable
    },
    beforeMount(){
        if(this.$store.state.user.role != 'ADMIN'){
            this.$router.push({ name: "connectionRoute" });
            this.$store.commit('setUser',null)
        }
    },
};
</script>