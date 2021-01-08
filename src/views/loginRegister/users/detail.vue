<template>
  <div
  >
    <Infos
      :info-list="infoList"
    />
  </div>
</template>

<script>
  import Infos from '@/components/common/Infos.vue'
  export default {
    components: {
      Infos
    },
    props: {
      infoList: {
        type: Array,
        default: null
      }
    },
    data () {
      return {
      }
    },
    created () {
    },
    methods: {
    }
  }
</script>

<style scoped>
</style>