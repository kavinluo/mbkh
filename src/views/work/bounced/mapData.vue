<template>
  <div>
    <p style="margin-top:1.25rem">
      总&nbsp;考&nbsp;区&nbsp;:&nbsp;<span
        style="color: #008000; font-weight: 400;"
      >{{ showDatas.sumTestArea }}</span
      >
    </p>
    <p>
      优&nbsp;&nbsp;&nbsp;&nbsp;秀&nbsp;:&nbsp;<span style="color: #008000; font-weight: 400">{{ showDatas.fine }}</span >
    </p>
    <p>
      合&nbsp;&nbsp;&nbsp;&nbsp;格&nbsp;:&nbsp;<span
        style="color: #008000; font-weight: 400"
      >{{ showDatas.eligible }}</span
      >
    </p>
    <p>
      限 期 整 改:&nbsp;<span style="color: #008000; font-weight: 400">
        {{ showDatas.change }}
      </span>
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
    const getData = async () => {
    const { data } = await getArea()
     showDatas.value = data
  }
   getData()

</script>

<style>

</style>
