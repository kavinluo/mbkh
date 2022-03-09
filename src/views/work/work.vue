<template>
  <div>
    {{ token }} <br>
    counter：{{ counter }}
    <button @click="add">+1</button>
    <button @click="updown">-1</button>
    <br>
    {{ userInfo }}
    {{ useInfo }}<br>
    模块中中的数据: {{ userInfo }}
  </div>
</template>

<script>
import { useState, useGetters } from '@/hooks/index'
import { useStore } from 'vuex'
import { computed } from 'vue'
  export default {
    setup () {
      const store = useStore()
      const getters = useGetters(['useInfo'])
      const storeStateFns = useState(['counter', 'name'])
      const modulesInfo = useState(['userInfo'], 'user')
      const token = computed(() => store.state.token)
      const updown = function () {
        store.commit('updown')
      }
      const add = function () {
        store.commit('add')
      }
      return {
        add,
        updown,
        token,
        ...modulesInfo,
        // ...storeState,
        ...getters,
        ...storeStateFns
      }
    }

  }
</script>

<style scoped>

</style>
