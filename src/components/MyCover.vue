<template>
  <div class="my-cover">
    <!-- 图片按钮 -->
    <div class="btn_img" @click="openDialog()">
      <img :src="value || coverImageUrl" />
    </div>
    <!-- 对话框 -->
    <el-dialog
      :append-to-body="true"
      :visible.sync="dialogVisible"
      width="720px">
      <!-- tab组件 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 全部 收藏 -->
          <div>
            <el-radio-group @change="hCollectChange" v-model="collect"  size="mini" style="padding-bottom: 20px">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 素材列表 -->
          <el-row :gutter="10" class="img_list">
              <!-- 只有当前的image的url与selectedImageUrl相等时，才补充一个selected类
                :class="{类名：值}"
                当值为true就有这个类名，否则就没有
              -->
            <el-col v-for="item in images" :class="{selected: selectImageUrl === item.url}"
            :key="item.id" class="img_item" :xs="12" :sm="6" :md="6" :lg="4">
              <!-- style="height: 100px;"  -->
              <el-image
                @click.native="selectImageUrl = item.url"
                :src="item.url"
                fit="cover"
              ></el-image>
            </el-col>
          </el-row>
          <!-- /素材列表 -->
          <!-- 分页 -->
          <my-pagination
          @current-change="hPageChange"
          :per_page="per_page"
          :total_count='total_count'></my-pagination>
          <!-- 分页 -->
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <!--
          上传图片
          action：上传地址
          headers：请求头
          show-file-list：false 不需要显示已上传的文件列表
          on-success：上传成功之后的回调函数
          before-upload 上传之前对文件进行检查
          name：设置上传的文件参数名，要与后端接口的要求一致
          -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            name="image"
            :show-file-list="false"
            :on-success="hUploadSuccess"
            :before-upload="beforeAvatarUpload">
            <!-- 如果当前有预览地址就说么图片上传成功了
            目标：当我上传成功之后，后端会返回这张图在服务器上的地址；给用户展示这张
            图，当用户成功地看到这张图时，关闭整个上传对话框。

            给用户展示这张图，用户成功看到这张图时，关闭整个上传对话框。
            图片的load事件：
              - 当你设置图片的src时，浏览器会去请求图片的资源，当图片请求回来之后，
                会有一个事件触发，这个事件就是load
            -->
            <el-image v-if="imageUrl" :src="imageUrl" class="avatar"></el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="hConfirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUser } from '@/utils/storage.js'
import defaultImg from '@/assets/default.png'
import MyPagination from '@/components/MyPagination'
import { getImages } from '@/api/image.js'
export default {
  name: 'MyCover',
  data () {
    return {
      // 由于这里的上传不是走的axios，而处理上传的接口又需要token
      // 所以这里只能手动添加token
      headers: {
        Authorization: `Bearer ${getUser().token}`
      },
      imageUrl: '',
      // 封面图
      coverImageUrl: defaultImg,
      // 控制对话框显示隐藏
      dialogVisible: false,
      // 当前tabs组件激活的选项卡的name属性的值
      activeName: 'image',
      // 用它来记录当前用户选中的图片
      // 当用户点击某张图片，则把被点击的图片地址保存在这里
      selectImageUrl: '',
      images: [], // 当前显示的图片列表
      per_page: 12, // 每页显示条数
      curr_page: 1, // 当前页码
      total_count: 0, // 本次查询结果总数
      collect: false // 是否收藏  true：已收藏  false：全部
    }
  },
  // value用来接收从父组件中传入的值
  props: ['value'],
  components: { MyPagination },
  methods: {
    // 加载素材
    async loadImages () {
      try {
        const res = await getImages({
          per_page: this.per_page,
          page: this.curr_page,
          collect: this.collect
        })
        this.images = res.data.data.results
        this.total_count = res.data.data.total_count
      } catch (err) {
        console.log(err)
        this.$message.error('获取素材失败')
      }
    },
    // 切换全部&收藏
    hCollectChange () {
      // 设置当前页从第一页开始
      this.curr_page = 1
      // 切换状态，再次发送请求去获取数据
      this.loadImages()
    },
    // 分页
    hPageChange (currPage) {
      // console.log(currPage)
      // 更新当前页面，然后发送请求
      this.curr_page = currPage
      this.loadImages()
    },
    // 选择素材库的图片
    hSelectImage (image) {
      console.log(image.url)
      this.selectImageUrl = image.url
    },
    // 打开弹框
    openDialog () {
      // 重置
      this.activeName = 'image'
      this.imageUrl = ''
      this.selectImageUrl = this.value || this.coverImageUrl
      // 打开对话框
      this.dialogVisible = true
      // 发送请求，加载素材
      this.loadImages()
    },
    // 如果上传成功，则会把响应结果至今传给这个res
    hUploadSuccess (res) {
      // console.log(res)
      this.imageUrl = res.data.url
      this.$message.success('上传素材成功')
      this.loadImages()
    },
    // 上传之前对文件进行检查
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 确定
    hConfirmImage () {
      if (this.activeName === 'image') {
        if (!this.selectImageUrl) {
          this.$message.warning('请先选中一张图片')
          return
        } else {
          this.coverImageUrl = this.selectImageUrl
          this.$emit('input', this.coverImageUrl)
        }
      } else if (this.activeName === 'upload') {
        if (!this.imageUrl) {
          this.$message.warning('请先选中一张图片')
          return
        } else {
          this.coverImageUrl = this.imageUrl
          this.$emit('input', this.coverImageUrl)
        }
      }

      this.dialogVisible = false
    }
  }
}
</script>

<style scoped lang='less'>
// 对话框 上下的空去掉
/deep/ .el-dialog__body {
  padding-bottom: 0px;
  padding-top: 0;
}
// 图片按钮
.btn_img {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.selected::after{
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3) url(../assets/selected.png) no-repeat center / 50px 50px;
}
.el-image{
  height: 120px;
}
// 素材列表
.img_list{
  .img_item{
    // 鼠标的形状
    cursor: pointer;
    position: relative;
    // width: 150px;
    // height: 120px;
    // border: 1px dashed #ddd;
    // display: inline-block;
    // margin-right: 15px;
    // img {
    //   width: 100%;
    //   height: 100%;
    //   display: block;
    // }
  }
}
.avatar {
  width: 178px;
  height: 178px;
  line-height: 178px;
}
.avatar-uploader {
    text-align: center;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

// /deep/：称为它具有穿透功能：把选择器的能力从父组件中穿透到子组件中
.avatar-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
</style>
