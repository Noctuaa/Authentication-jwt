<template>
    <div class="formBox">
        <div class="user">
            <font-awesome-icon :icon="['fa', 'user-plus']" />
        </div>
        <h1>Sign up</h1>
        <form @submit.prevent="register">
            <div class="inputBox">
                <input type="text" v-model="username" :class="{'is-invalid': errors.username}" name="name" id="name"
                    placeholder="Username">
                <span>
                    <font-awesome-icon :icon="['fa', 'user']" />
                </span>
                <div class="invalid-feedback">{{errors.username ? errors.username.msg : ''}}</div>
            </div>
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
            <input type="submit" value="Sign up">
        </form>
        <p>
            Already a member ? <router-link to="/login">Login</router-link>
        </p>
    </div>
</template>

<script>
    export default {
        name: 'Signup',
        data() {
            return {
                username: "",
                email: "",
                password: "",
                errors: [],
                showPassword: false
            }
        },
        methods: {
            /**
             * Save a user
             */
            async register() {
                try {
                    const response = await this.axios.post('http://localhost:3000/auth/signup', {
                        username: this.username,
                        email: this.email,
                        password: this.password
                    })
                    this.$store.dispatch('toast/success', response.data.message);
                    this.$router.push('login');
                } catch (error) {
                    this.errors = [];
                    this.errors = error.response.data.errors || error.response.data;
                    this.$store.dispatch('toast/error')
                }
            },
        },

        computed: {
            inputType() {
                return this.showPassword ? 'text' : 'password';
            }
        }
    }
</script>

<style lang="scss">
    @import '../../sass/form.scss';
</style>