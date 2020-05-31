<template>
  <div class=''>
    <!-- 由于它的根元素是el-form-item，则在使用这个组件时，要用el-form包起来 -->
    <el-form>
      <my-channels @changeChannel="hChangeChannel" :isClearable="true"></my-channels>
      <!-- 1、使用。在子组件使用v-model。与在普通表单元素上使用是一样的。 -->
      <my-channels-vmodel v-model="channel_id_vmodel" :isClearable="true"></my-channels-vmodel>
    </el-form>
    <div class="my-cover">
      <my-cover v-model="imgSrc"></my-cover>
    </div>
  </div>
</template>

<script>
import MyCover from '@/components/MyCover'
import MyChannels from '@/components/MyChannels'
import MyChannelsVmodel from '@/components/MyChannelsVmodel'
export default {
  name: 'Home',
  components: { MyChannels, MyChannelsVmodel, MyCover },
  data () {
    return {
      imgSrc: 'http://toutiao.meiduo.site/Fr5_LUcBzK1DUm_qn-6JFIg12c1a',
      channel_id: '',
      channel_id_vmodel: 10
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
