<template>
  <div>
    {{ sCounter }}
    {{ counter }}
    {{ name }}
  </div>
</template>

<script>
import { useState } from '@/hooks/index'

import { useStore } from 'vuex'
import { computed } from 'vue'

  export default {
    name: 'Work',
    setup () {
      const store = useStore()
      const storeStateFns = useState(['counter', 'name'])
      // const storeState = {}
      const sCounter = computed(() => store.state.token)
      return {
        sCounter,
        // ...storeState,
        ...storeStateFns
      }
    }

  }
</script>

<style scoped>

</style>
