import router from "../../router";
import jwt_decode from 'jwt-decode';

const token = localStorage.getItem('token') ? true : false;


function getUser() {
    const jwt = localStorage.getItem('token');
    if(jwt){
        const user = jwt_decode(jwt);
        return user;
    }
    return {};
}

const auth = {
    namespaced: true,
    state: {
        logged: token,
        user: getUser()
    },
    getters:{
        isLogged: (state) => state.logged,
        user: (state) => state.user
    },
    mutations: {
        LOGIN(state) {
            state.logged = true;
            state.user = getUser();
        },

        LOGOUT(state) {
            state.logged = false;
            state.user = {};
        }
    },
    actions: {
        login: ({ commit }, payload) => {
            if(payload) {
                localStorage.setItem('token', payload);
                commit('LOGIN');
                router.push({name: 'Dashboard'})
            }
        },

        logout: ({commit}) => {
            localStorage.removeItem('token');
            commit('LOGOUT');
            router.push({name: 'Login'});
        }
    }
}

export default auth;