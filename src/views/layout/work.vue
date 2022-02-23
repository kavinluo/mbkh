<template>
  <div>
    {{ sCounter }}
    {{ counter }}
    {{ name }}
  </div>
</template>

<script>
import { useMapState } from '@/hooks/index'

import { mapState, useStore } from 'vuex'
import { computed } from 'vue'

  export default {
    name: 'Work',
    setup () {
      const store = useStore()
      const storeStateFns = useMapState(['counter', 'name'], mapState)
      const storeState = {}
      const sCounter = computed(() => store.state.token)
      return {
        sCounter,
        ...storeState,
        ...storeStateFns
      }
    }

  }
</script>

<style scoped>

</style>
