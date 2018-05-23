<style lang="stylus" scoped>
.musiclist
  width: 100%;
  .btn
    font-size: 20px
    color: #333
  ul
    list-style: none;
    li
      display: block; 
  #music
    width: 100%
    display: block
</style>

<template>
  <div class="musiclist">
    <banner></banner>
    <span class="btn" @click="fetch">click me</span>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <!-- <li style="background-image: url('https://p1.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg')">5</li> -->
    </ul>
    <audio id="music" src="#" controls autoplay></audio>
  </div>
</template>

<script>
  import { getToplistDetail, getMusicUrl } from '../dataStore/music'
  import banner from '../components/banner'

  export default {
    name: 'Toplist',
    mounted() {},
    data() {
      return {
        show: true,
        musicList: null,
        currentMusic: {},
        i: 0,
      }
    },
    components: {
      banner
    },
    created() {
      
        
      //  getMusicUrl(this.musicList.list[0].id)
      //   .then((res) => {
      //     if(res.data.code === 200 ) {
            
      //     }
        // }) 
    },
    methods: {
      fetch() {
        this.i++
        let current = this.currentMusic[this.i]
        let id = current.id
        // let id = 25638273
        console.log('id', id);
        
        getMusicUrl(id)
          .then((res) => {
            if(res.data.code === 200 ) {
              res = res.data
              console.info(res.data[0].url);
              this.$store.state.curMusic.src = res.data[0].url
              
              let eleTarget = document.getElementById('music')
              eleTarget.src = `http://music.163.com/song/media/outer/url?id=${id}.mp3`
              console.log('eleTarget', eleTarget.src);
              if(eleTarget.paused) {
                eleTarget.play()
              }else {
                eleTarget.pause()
              }
            }
          }) 
      },
      play() {
         
      }
    },
    beforeMount() {
      getToplistDetail()
      	.then((res) => {
          if (res.data.code === 200) {
            this.musicList = res.data
            this.currentMusic = [...res.data.list].filter( (it) => it.url !== null)
            // this.currentMusic = res.data.list.filters( it => it.url !== null )

      			// console.log('currentMusic', this.currentMusic)
      		}
        })
    },
    mounted() {
      
      // this.fetch()
      // this.$nextTick(() => {
           
      // })
  
    }
  };
</script>
