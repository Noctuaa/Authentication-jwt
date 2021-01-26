import { createStore } from 'vuex';

import toast from './modules/toast';
import auth from './modules/auth';

export default createStore({
    modules: {
        toast,
        auth
    }
})
