<template>
    <div class="container">
        <div v-if="this.$store.state.connected">
            <SideBar/><!-- v-on:logout="getLogoutOrder($event)"-->
            <router-view> </router-view>
        </div>
        <div v-else>
            <Login /><!-- v-on:submit="getConnectionState($event)"-->
        </div>
    </div>
</template>

<script>
import Login from './LoginComponents/Login.vue'
import SideBar from './NavComponents/SideBar.vue'
export default {
    name:'Main',
    components:{
        Login,
        SideBar,
    },
    data(){
        return {
            connected:false,
        }
    },
    methods:{
        getConnectionState(state){
            this.connected = state
        },
        getLogoutOrder(order){
            this.connected = order
        }

    }
}
</script>