<template>
  <div class=''>
    <el-form>
      <my-channels @changeChannel="hChangeChannel" :isClearable="true"></my-channels>
    </el-form>
  </div>
</template>

<script>
import MyChannels from '@/components/MyChannels'
export default {
  name: 'Home',
  components: { MyChannels },
  data () {
    return {
      channel_id: ''
    }
  },
  methods: {
    hChangeChannel (obj) {
      this.channel_id = obj
    }
  }
}
</script>

<style scoped lang='less'></style>
