<template>
  <!-- 由于它的根元素是el-form-item，则在使用这个组件时，要用el-form包起来 -->
  <el-form-item prop="channel_id" label="频道">
    <!-- clearable：表示可清空的单选 -->
    <!-- change 事件是由el-select组件提供的，当用户的选择发生变化时，它会触发，并传入当前用户选中的值 -->
    <el-select :clearable='isClearable' @change="hSlectChange" v-model="channel_id" placeholder="请选择频道">
      <el-option v-for="item in channels"
      :key="item.id"
      :label="item.name"
      :value="item.id"></el-option>
    </el-select>
  </el-form-item>
</template>

<script>
import { getChannels } from '@/api/article'
export default {
  name: 'MyChannels',
  props: ['isClearable'],
  data () {
    return {
      channel_id: '', // 频道id
      channels: [] // 频道列表
    }
  },
  methods: {
    hSlectChange () {
      this.$emit('changeChannel', this.channel_id)
    }
  },
  async created () {
    try {
      const res = await getChannels()
      this.channels = res.data.data.channels
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style scoped lang='less'></style>
