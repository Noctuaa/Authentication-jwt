<template>
	<div id="nav">
		<ul class="link_holder">
			<li>
				<router-link to="/">Home</router-link> |
			</li>
			<li>
				<router-link to="/about">About</router-link> |
			</li>
			<li v-if="isLogged">
				<router-link to="/dashboard">{{user.name}}</router-link> |
			</li>
			<li v-if="isLogged">
				<router-link to="/Logout">Logout</router-link>
			</li>
			<li v-if="!isLogged">
				<router-link to="/signup">Signup</router-link> |
			</li>
			<li v-if="!isLogged">
				<router-link to="/login">Login</router-link>
			</li>
		</ul>
	</div>
	<Notification></Notification>
	<component :is="layout">
		<router-view></router-view>
	</component>
</template>

<script>
	import Notification from './components/Notiications/Notification';
	import {mapGetters} from 'vuex';
	export default {
		components: {
			Notification
		},
		computed: {
			...mapGetters('auth/', [
				'isLogged',
				'user'
			]),
			/**
			 * Return the corresponding layout.
			 * @returns {string} - Name of layout.
			 */
			layout() {
				const default_layout = 'default';
				return (this.$route.meta.layout || default_layout) + '-layout';
			}
		},
	}
</script>

<style lang="scss">
	body {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		overflow-x: hidden;
	}

	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		text-align: center;
	}

	#nav {
		position: fixed;
		width: 100%;
		background-color:#2c3e50;
		text-align: right;
		z-index: 10;
		min-height: 50px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		top: 0;
		margin-bottom: 50px;

		ul {
			display: flex;
			list-style-type: none;
			margin: 0;
			padding: 0 20px;
		}

		li{
			color: #fff;
		}

		a {
			font-weight: bold;
			color: #fff;
			padding: 10px;
			text-decoration: none;

			&.router-link-exact-active {
				color: rgb(115, 192, 255)
			}
		}
	}
</style>