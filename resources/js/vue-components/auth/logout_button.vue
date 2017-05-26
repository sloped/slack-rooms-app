<template>
<span class="nav-item component logout-button-component" v-if="user">
    {{user.name}}&nbsp;<a class="button is-small is-info" href="/logout">Logout</a>
</span>
</template>

<script>
    export default {
        props: ['user']
    };

</script>

<style lang="scss" scoped>

</style>
