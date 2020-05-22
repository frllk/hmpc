<template>
  <el-container class="layout-container">
    <el-aside class="aside" :width="isCollapse ? '64px': '200px'">
      <div :class='{minLogo:isCollapse}' class="logo"></div>
      <el-menu
        default-active="2"
        class="nav-menu"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        :collapse-transition="false"
        >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/articles">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/addArticle">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-setting"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/settings">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
          <div>
            <i @click='isCollapse=!isCollapse' :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold' "></i>
            <span>江苏传智播客科技教育有限公司</span>
          </div>
          <el-dropdown>
            <!-- 默认插槽：用来显示触发开关 -->
            <div class="avatar-wrap">
              <img class="avatar" src="http://toutiao.meiduo.site/FrvifflobfNNRM9V_ZBTI2ZaTH4n" alt="">
              <span>用户昵称</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <!--具名插槽：用来显示下拉内容 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item divided>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </el-header>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'MyComponent',
  props: { },
  data () {
    return {
      isCollapse: false // 默认展开状态（不折叠）
    }
  },
  methods: { },
  computed: { },
  created () { },
  mounted () { }
}
</script>

<style scoped lang='less'>
 /* 外层的容器
    占满整个页面
  */
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.aside {
  background-color: #002033;
  .el-menu {
    border-right: none;
  }
  .logo{
      width: 100%;
      height: 60px;
      background: #002244 url(../../assets/logo_admin.png) no-repeat center / 140px auto;
    }
    // 覆盖background 的图片和大小，类书写在logo的下方。
    .minLogo{
      background-image: url(../../assets/logo_admin_01.png);
      background-size: 36px auto;
    }
}
.nav-menu {
  .iconfont {
    margin-right: 10px;
    padding-left: 5px;
  }
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}

.main {
  background-color: #e9eef3;
}
</style>
