<template>
  <div>
    <div
      v-for="(e, index) in infoList"
      :key="index"
      class="info-item"
    >
      <label
        class="label"
        :style="styleLabel"
      >
        {{ e.n }}
      </label>
      <span
        class="span"
        :style="styleSpan"
      >
        {{ e.v }}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      infoList: {
        type: Array,
        default: new Array()
      },
      labelWidth: {
        type: Number,
        default: 120
      }
    },
    data () {
      return {
        styleLabel: {
        },
        styleSpan: {
        }
      }
    },
    created () {
      this.styleLabel.width = this.labelWidth + 'px'
      this.styleSpan.width = 'calc((100% - ' + (this.labelWidth + 10) + 'px))'
    }
  }
</script>

<style scoped>
  .label {
    display: inline-block;
    color: cadetblue;
  }
  .span {
    display: inline-block;
    vertical-align: bottom;
  }
  .info-item {
    margin: 10px 0px;
    padding: 8px;
    border-bottom-style: solid;
    border-color: lightgrey;
    border-width: 1px;
  }
</style>