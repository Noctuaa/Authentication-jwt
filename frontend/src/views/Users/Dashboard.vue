<template>
	<div>
		<h1>Welcome on your dashboard {{user.name}} !</h1>
		{{email}}
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	export default {
		name: 'Dashboard',
		data() {
			return {
				email: ''
			}
		},
		methods: {
			/**
			 * Get User Information from the server.
			 */
			async getIndex() {
				try {
					const response = await this.axios.get('http://localhost:3000/user/dashboard');
					this.email = response.data.email;
				} catch (error) {
					console.log(error);
				}
			}
		},
		computed: {
			/**
			 *  Get user information from the module auth (Vuex Store)
			 */
			...mapGetters('auth/', [
				'user'
			]),
		},

		mounted() {
			this.getIndex();
		}
	}
</script>