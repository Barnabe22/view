<template>
  <div id='conteneur'>
    <h1 class="titre"> Plateforme de <span class="primaryColor">Q</span>uestionnaire</h1>
    <Form v-on:submit="reEmitconnectionState($event)"/>
  </div>
</template>

<script>
import Form from './Form'
export default {
  name: "Login",
  components:{
    Form
  },
  data() {
    return {

    };
  },
  methods:{
    reEmitconnectionState(connectionState){
      this.$emit('submit',connectionState)
    }
  },
};
</script>

<style scoped>
    #conteneur{
        margin-left: 35%;
        margin-right: 35%;
        margin-top:200px;
    }
    .titre{
        text-align: center;
        font-size: 2.0rem;
        margin-bottom: 1.5rem;
    }
    

</style>