<template>
  
</template>

<script>
export default {
    name: 'Logout',
    methods: {
        /**
         * Logout the user.
         */
        async logout() {
            try {
                this.$store.dispatch('auth/logout');
                this.$store.dispatch('toast/success', 'You are disconnected');
            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        this.logout();
    }
}
</script>

<style>

</style>