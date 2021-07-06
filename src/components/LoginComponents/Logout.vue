<template>
    <div>

    </div>
</template>

<script>
export default {
    name:'Logout',
    mounted(){
        this.storeUser('setUser',undefined)
        this.storeAccessToken('setAccessToken','')
        this.storeRefreshToken('setRefreshToken','')
        this.storeConnectionState(false)
        this.$router.push({ name: "connectionRoute" });
    }
}
</script>