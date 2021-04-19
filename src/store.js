import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputText: '',
    nextId: 5,
    typeValue: 'all'
  },
  mutations: {
    // 获取数据
    setState(state, data) {
      state.list = data
    },
    // 同步输入框的内容
    modelInputText(state, val) {
      state.inputText = val.trim()
    },
    // 添加事项
    addItem(state) {
      let options = {
        id: state.nextId,
        info: state.inputText,
        done: false
      }
      state.list.push(options)
      state.nextId++
      state.inputText = ''
    },
    // 变更复选框的状态
    changeType(state, param) {
      const i = state.list.findIndex(x => x.id === param.id)
      if (i !== -1) {
        state.list[i].done = !state.list[i].done
      }
    },
    // 删除指定项
    removeItem(state, id) {
      const i = state.list.findIndex(x => x.id === id)
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    // 切换状态
    switchTypeMutation(state, type) {
      console.log(type)
      state.typeValue = type
    },
    // 清除未完成事件
    clean(state) {
      state.list = state.list.filter(x => !x.done)
    }
  },
  actions: {
    /* 异步请求数据 */
    getItems (context) {
      axios.get('/list.json').then(({data}) => {
        context.commit('setState', data);
      })
    }
  },
  getters: {
    getUndoneList(state) {
      return state.list.filter(x => x.done === false).length
    },
    // 筛选的数据
    typeList (state) {
      if (state.typeValue === 'all') {
        return state.list
      }
      if (state.typeValue === 'undone') {
        return state.list.filter(x => !x.done)
      }
      if (state.typeValue === 'done') {
        return state.list.filter(x => x.done)
      }
      return state.list
    }
  }
})