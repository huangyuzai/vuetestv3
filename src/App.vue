<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" @change="handleInputChange" :value="inputText"></a-input>
    <a-button type="primary" @click="handleAddItem">添加事项</a-button>
    <a-list bordered :dataSource="typeList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!--复选框-->
        <a-checkbox :checked="item.done" @change="(e) => {
          handleCheckboxChange(e, item.id)
        }">{{ item.info }}</a-checkbox>
        <!--复制链接-->
        <a slot="actions" @click="handleRemoveItem(item.id)">删除</a>
      </a-list-item>

      <!--footer区域-->
      <div slot="footer" class="footer">
        <!--未完成的任务个数-->
        <span>{{getUndoneList}}条剩余</span>
        <!--操作按钮-->
        <a-button-group>
          <a-button :type="typeValue === 'all' ? 'primary' : 'default'" @click="switchType('all')">全部</a-button>
          <a-button :type="typeValue === 'undone' ? 'primary' : 'default'" @click="switchType('undone')">未完成</a-button>
          <a-button :type="typeValue === 'done' ? 'primary' : 'default'" @click="switchType('done')">已完成</a-button>
        </a-button-group>

        <!--把已经完成的任务清空-->
        <a @click="handleClean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>

import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'App',
  data () {
    return {

    }
  },
  mounted() {
    // 请求数据
    this.getItems();
  },
  computed: {
    ...mapState(['inputText', 'typeValue']),
    ...mapGetters(['getUndoneList', 'typeList'])
  },
  methods: {
    ...mapActions(['getItems']),
    ...mapMutations(['modelInputText', 'addItem', 'changeType', 'removeItem', 'switchTypeMutation', 'clean']),
    // input的change事件
    handleInputChange (e) {
      this.modelInputText(e.target.value)
    },
    // 新增数据
    handleAddItem () {
      if (this.inputText.length <= 0) {
        return this.$message.warning('提交事项不允许为空');
      }
      this.addItem();
    },
    // 复选框的change事件
    handleCheckboxChange (e, id) {
      const param = {
        id,
        status: e.target.checked
      }
      this.changeType(param)
    },
    // 删除项
    handleRemoveItem(id) {
      this.removeItem(id)
    },
    // 改变操作状态
    switchType(type) {
      this.switchTypeMutation(type)
    },
    // 清除未完成
    handleClean () {
      this.clean()
    }
  }
}
</script>
<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
