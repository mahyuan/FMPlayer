<style lang="stylus" scoped>
  .banner
    position: relative;
    height: 200px;
    width: 100%;
    border: 1px solid #ddd;
    overflow: hidden;
    #content
      position: absolute;
      display: block;
      left: 0;
      top: 0;
      bottom: 0px;
      height: 100%;
      font-size: 0;
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      transition: all 0.5s;
      li.item
        display: inline-block;
        font-size: 20px;
        width: 100vw;
        height: 200px;
        box-sizing: border-box;
        list-style: none;
        padding: 0;
        margin: 0;
        // border: 1px solid red;
      li:nth-child(odd)
        // background: rgba(255, 255, 255, 0.8);
      li:nth-child(even)
          // background: rgba(255, 255, 0, 0.6);
</style>

<template>
  <div class="banner">
    <ul id="content">
      <li class="item" v-for="(item,index) in list">{{list[index]}}</li>
    </ul>
  </div>
</template>


<script>
  export default {
    name: 'banner',
    data() {
      return {
        list: [
          1, 2, 3, 4, 5, 6, 7, 8
        ],
  
      }
    },
    mounted() {
      this.$nextTick(() => {
        let cont = document.getElementById("content")
        let children = document.querySelectorAll("#content>li")
        let len = cont.childNodes.length
        let totleWidth = cont.offsetWidth
        let itemWidth = children[0].offsetWidth
        let key = 0
        cont.style.width = `${itemWidth*len}px`
        let timer = setInterval(() => {
          key++
          if (key >= len) key = 0
          cont.style.transform = `translateX(-${itemWidth*key}px)`
          /* 
          let animation = cont.animate([
            {transform: `translateX(-${itemWidth*key}px)`},
            {transform: `translateX(-${itemWidth*(key+1)}px)`},
          ], 200)
          key++
          if (key+1 >= len) key = 0
          animation.addEventListener('finish', () => {
            cont.style.transform = `translateX(-${itemWidth*(key+1)}px)`
          }) */
          
        }, 2000)
  
      })
    },
    methods: {
    },
  };
</script>
