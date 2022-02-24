<template>
  <div>
    <h2 style="text-align: center;">NotFound</h2>
    <div style="text-align: center;"> 你输入的 <span style="color: red">{{ route.params.pathMatch }} </span>不存在</div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
export default {
  setup () {
    const route = useRoute()
    console.log(route)

    return {
      route
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
