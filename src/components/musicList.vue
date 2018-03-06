<template>
    <div class="content">
        <span>click me</span>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
        </ul>
    </div>
</template>

<script>
import {getToplistDetail} from 'dataStore/music'

export default {
    name: 'musicList',
    created() {
        getToplistDetail()
            .then((res)=>{
                if(res.data.code===200) {
                    console.log('res', res)
                    this.musicList = res.data
                }
            })
    },
    methods: {

    }
}    
</script>
<style>

</style>
