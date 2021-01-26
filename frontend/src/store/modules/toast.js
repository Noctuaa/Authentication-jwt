const toast = {
    namespaced: true,
    state: {
        response: '',
        type: '',
        hidden: '',
    },
    getters: {
        type: (state) => state.type,
        hidden: (state) => state.hidden,
        response: (state) => state.response
    },
    mutations: {
        RESET(state) {
            state.hidden = false;
        },

        ADD_ERROR(state, payload) {
            state.response = payload;
            state.type = 'Error';
            state.hidden = true;
        },

        ADD_SUCCESS(state, payload) {
            state.response = payload;
            state.type = 'Success';
            state.hidden = true;
        }
    },
    actions: {
        error: ({ commit }, payload) => {
            if (!payload) {
                payload = 'An error has occurred !'
            }
            commit('ADD_ERROR', payload)
        },

        success: ({ commit }, payload) => {
            commit('ADD_SUCCESS', payload);
        },

        reset: ({ commit }) => {
            commit('RESEt');
        }
    },
}

export default toast;