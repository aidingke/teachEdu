import Vue from 'vue'
import Vuex from 'vuex'
import apis from './axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        qx: [],
    },
    mutations: {
        qx(state, status) {
            state.qx = status;
            // const res = status;
            // status.map(item => {
            //     item.split(':').reduce((a, b) => {
            //        res.push(a);
            //        return a + ':' + b;
            //    })
            // })
            // state.qx = Array.from(new Set(res));
        },
    },
    actions: {
        getQx({ commit }) {
            return new Promise(async (resolve, reject) => {
                const res = await apis.getPersonPermiss();
                if (res.code === 1000) {
                    commit('qx', res.data)
                }
                resolve(res.code)
            });
        }
        // getQx({ commit }, data) { 
        //     commit('qx', data);
        // }
    },
    getters: {
        qx (state) {
            return state.qx;
        }
    }
});

