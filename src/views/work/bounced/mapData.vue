<template>
  <div>
    <p style="margin-top:1.25rem">
      总&nbsp;考&nbsp;区&nbsp;:&nbsp;<span
        style="color: #008000; font-weight: 400;"
      >{{ showDatas.sumTestArea }}</span
      >
    </p>
    <p v-for="(item,index) in scoreLevelDtoList" :key="index">{{ item.scoreLevelName }}:
      &nbsp;
      <span
        style="color: #008000; font-weight: 400"
      >{{ item.amount }}</span
      >
    </p>
    <p>
      最&nbsp;高&nbsp;分:&nbsp;<span
        style="color: #008000; font-weight: 400"
      >{{ showDatas.highScore }}</span
      >
    </p>
    <p>
      最&nbsp;低&nbsp;分:&nbsp;<span
        style="color: #008000; font-weight: 400"
      >{{ showDatas.lowScore }}</span
      >
    </p>
    <p>
      平&nbsp;均&nbsp;分:&nbsp;<span
        style="color: #008000; font-weight: 400"
      >{{ showDatas.average }}</span
      >
    </p>
  </div>
</template>

<script setup>
import { getArea } from '@/api/statistical.js'
import { ref } from 'vue'
    const showDatas = ref({})
    const scoreLevelDtoList = ref([])
    const getData = async () => {
    const { data } = await getArea()
     showDatas.value = data
     scoreLevelDtoList.value = data.scoreLevelDtoList
     console.log(scoreLevelDtoList)
  }

   getData()

</script>

<style scoped>
  p {
    margin-left: 25%;
    font-weight: 700;
  }
</style>
