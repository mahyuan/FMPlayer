import Vue from 'vue'
import Vuex from 'vuex'
const state = {
    // currentTabIndex,
    curMusic: {
        name: '',
        src: '',
        musicImgSrc: '',
        index: 0
    },
    
}
const mutations = {
    // getDate({commit, state}) {
        
    // }
} 
const actions = {
    // getDate({commit, state}) {
        
    // }
}

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    actions,
})
