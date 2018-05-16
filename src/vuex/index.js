import Vue from 'vue'
import Vuex from 'vuex'
const state = {
    // currentTabIndex,
    curMusic: {
        id: null,
        url: '',
        title: '',
        artist: '',
        musicImgSrc: '',
        artistId: null,
    },
    
}
const getter = {
    id: state => state.id,
    url: state => state.url,
    title: state => state.title,
    artist: state => state.artist,
    musicImgSrc: state => state.musicImgSrc,
    artistId: state => state.artistId,

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
    getter,
    mutations,
    actions,
})
