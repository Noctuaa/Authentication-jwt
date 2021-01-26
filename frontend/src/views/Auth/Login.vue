<template>
    <div class="formBox">
        <div class="user">
            <font-awesome-icon :icon="['fa', 'users']" />
        </div>
        <h1>Login</h1>
        <form @submit.prevent="login">
            <div class="inputBox">
                <input type="email" v-model="email" :class="{'is-invalid': errors.email}" name="email" id="email" placeholder="Email">
                <span>
                    <font-awesome-icon :icon="['fa', 'envelope']" />
                </span>
                <div class="invalid-feedback">{{errors.email ? errors.email.msg : ''}}</div>
            </div>
            <div class="inputBox">
                <input :type="inputType" v-model="password" :class="{'is-invalid': errors.password}" name="password" id="password" placeholder="Password">
                <span>
                    <font-awesome-icon :icon="['fa', 'lock']" />
                </span>
                <div class="btn-show" @click.prevent="this.showPassword = !showPassword">
                    <font-awesome-icon v-if="showPassword" class="fa" :icon="['fa', 'eye']" />
                    <font-awesome-icon v-else class="fa" :icon="['fa', 'eye-slash']" />
                </div>
                <div class="invalid-feedback">{{errors.password ? errors.password.msg : ''}}</div>
            </div>
            <input type="submit" value="Login">
        </form>
        <p>
            New to here ? <br>
        </p>
        <hr>
        <router-link to="/signup">Create your account</router-link>
    </div>
</template>

<script>
    
    export default {
        name: 'Login',
        data() {
            return {
                email: "",
                password: "",
                errors: [],
                showPassword: false
            }
        },
        methods: {
            /**
             * Connect the user.
             */
            async login() {
                try {
                    const response = await this.axios.post('http://localhost:3000/auth/login', {
                        email: this.email,
                        password: this.password
                    })
                    this.$store.dispatch('auth/login', response.data.token);
                    this.$store.dispatch('toast/success', response.data.message);
                } catch (error) {
                    this.errors = error.response.data.errors || error.response.data;
                    console.log(error.response.data);
                    if(error.response.data.message){
                        this.errors = [];
                        this.$store.dispatch('toast/error', error.response.data.message);
                    }else{
                        this.$store.dispatch('toast/error');
                    }   
                }
            },
        },

        computed: {
            /**
             * Change the type input to display the password or to hide it.
             */
            inputType() {
                return this.showPassword ? 'text' : 'password';
            }
        }
    }
</script>

<style lang="scss">
    @import '../../sass/form.scss';
</style>