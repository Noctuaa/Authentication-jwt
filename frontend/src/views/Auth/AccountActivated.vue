<template>

</template>

<script>
    export default {
        methods: {
            /**
             * Send the token to check if it is good.
             */
           async checkToken() {
               try {
                   const token = this.$route.params.token;
                   const id = this.$route.params.id;
                   const response = await this.axios.post('http://localhost:3000/auth/confirmation/' + token, {
                       id: id,
                       token: token
                   });
                   this.$router.push('/login');
                   this.$store.dispatch('toast/success', response.data.message);
                } catch (error) {
                    this.$router.push('/login');
                   this.$store.dispatch('toast/error', error.response.data.message);
               }
           }
       },
       created() {
           this.checkToken();
       }
    }
</script>